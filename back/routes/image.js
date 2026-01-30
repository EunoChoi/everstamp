// Node 내장
const path = require('path');

// 외부 패키지
const { S3Client } = require('@aws-sdk/client-s3');
const express = require("express");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

// 프로젝트 내부
const tokenCheck = require('../middleware/tokenCheck.js');

const router = express.Router();

//oci object storage multer
const s3 = new S3Client({
  region: process.env.OCI_REGION,
  endpoint: process.env.OCI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.OCI_ACCESS_KEY,
    secretAccessKey: process.env.OCI_SECRET_KEY,
  },
  forcePathStyle: true, // 주소 형식 맞추기
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.OCI_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, `img/${Date.now()}_${uuidv4()}${extension}`);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
});

/**
 * 용도: 이미지 업로드. OCI Object Storage에 저장 후 URL 목록 반환.
 * 요청: multipart/form-data 'image' 파일 배열, tokenCheck
 * 반환: 200 업로드된 이미지 URL 문자열 배열
 */
router.post('/', tokenCheck, upload.array('image'), async (req, res, next) => {
  // [비동기 처리] multer-s3가 파일 업로드 후 req.files에 location 채움
  // [데이터 가공] location URL 디코딩 후 배열로 응답
  res.status(200).json(req.files?.map((v) => decodeURIComponent(v.location)) ?? []);
});



module.exports = router;