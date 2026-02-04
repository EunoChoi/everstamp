// Node 내장
const path = require('path');

// 외부 패키지
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const express = require("express");
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

// 프로젝트 내부
const tokenCheck = require('../middleware/tokenCheck.js');

const router = express.Router();

// 파일 시그니처(매직 넘버)로 실제 이미지 파일인지 검증
function validateImageBuffer(buffer) {
  if (!buffer || buffer.length < 4) {
    return false;
  }

  // 파일의 첫 4바이트를 16진수 문자열로 변환
  const header = buffer.toString('hex', 0, 4);

  // 이미지 파일 시그니처 체크
  return (
    header.startsWith('ffd8ff') ||    // JPEG
    header.startsWith('89504e47') ||  // PNG
    header.startsWith('47494638') ||  // GIF
    header.startsWith('52494646')     // WEBP (RIFF)
  );
}

// OCI Object Storage S3 Client
const s3 = new S3Client({
  region: process.env.OCI_REGION,
  endpoint: process.env.OCI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.OCI_ACCESS_KEY,
    secretAccessKey: process.env.OCI_SECRET_KEY,
  },
  forcePathStyle: true,
});

// multer 메모리 스토리지 설정 (sharp 처리를 위해)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB (클라이언트에서 체크했지만 서버에서도 체크)
  },
  fileFilter: (req, file, cb) => {
    // 1차 검증: MIME type 체크 (브라우저에서 전송한 정보)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'), false);
    }
  }
});

/**
 * 용도: 이미지 업로드. Sharp로 최적화 후 OCI Object Storage에 저장, URL 목록 반환.
 * 요청: multipart/form-data 'image' 파일 배열, tokenCheck
 * 반환: 200 업로드된 이미지 URL 문자열 배열
 */
router.post('/', tokenCheck, upload.array('image'), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: '이미지 파일이 없습니다.' });
    }

    const uploadPromises = req.files.map(async (file) => {
      try {
        // 2차 검증: 실제 파일 내용 검증 (파일 시그니처/매직 넘버 체크)
        if (!validateImageBuffer(file.buffer)) {
          throw new Error('유효하지 않은 이미지 파일입니다. 실제 이미지 파일만 업로드 가능합니다.');
        }

        // Sharp로 이미지 최적화
        const optimizedImage = await sharp(file.buffer)
          .resize(1920, 1920, {
            fit: 'inside',           // 비율 유지하면서 1920x1920 안에 맞춤
            withoutEnlargement: true // 원본보다 크게 확대하지 않음
          })
          .jpeg({
            quality: 85,             // JPEG 품질 85%
            progressive: true        // 프로그레시브 JPEG (로딩 최적화)
          })
          .toBuffer();

        // S3에 업로드할 파일명 생성
        const filename = `img/${Date.now()}_${uuidv4()}.jpg`;

        // S3에 업로드
        const uploadParams = {
          Bucket: process.env.OCI_BUCKET_NAME,
          Key: filename,
          Body: optimizedImage,
          ContentType: 'image/jpeg',
        };

        await s3.send(new PutObjectCommand(uploadParams));

        // URL 생성 (OCI Object Storage 공개 URL 형식)
        const imageUrl = `${process.env.OCI_ENDPOINT}/${process.env.OCI_BUCKET_NAME}/${filename}`;

        return imageUrl;
      } catch (error) {
        console.error('이미지 처리 중 오류:', error);
        throw error;
      }
    });

    // 모든 이미지 업로드 완료 대기
    const uploadedUrls = await Promise.all(uploadPromises);

    res.status(200).json(uploadedUrls);
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    res.status(500).json({ error: '이미지 업로드 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
