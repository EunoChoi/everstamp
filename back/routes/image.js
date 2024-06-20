

const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');

const path = require('path'); //path는 노드에서 기능하는 기능
const fs = require('fs');//파일 시스템 조작 가능한 모듈

const express = require("express");
const router = express.Router();

const db = require("../models/index.js");
const Op = db.Sequelize.Op;

const Image = db.Image;
const Diary = db.Diary;


//AWS 권한 획득
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
})

//AWS S3 multer
let s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'moseoree-s3',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname).split(' ').join('')}`)
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
});


// for local multer storage
// try {
//   //upload폴더가 존재하는지 확인
//   fs.accessSync('uploads');
// } catch (err) {
//   console.log('upload folder do not exist')
//   fs.mkdirSync('uploads');
// }

//image upload
router.post('/', upload.array('image'), async (req, res, next) => {
  // s3 multer
  res.json(req.files?.map((v) => decodeURIComponent(v.location)));

  // s3 storage multer, thumb replace
  // res.json(req.files.map((v) => decodeURIComponent(v.location).replace(/\/original\//, '/thumb/')));
  // local storage multer
  // res.json(req.files.map((v) => v.filename));  
});


//images load all
// router.get("/", async (req, res) => {
//   const { type, pageParam, tempDataNum } = req.query;

//   try {
//     const Images = await Image.findAll({
//       order: [
//         ['createdAt', 'DESC'],
//       ],
//       include: [{
//         model: Post,
//         attributes: ['type', 'UserId'],
//         where: [{
//           type,
//           UserId: { [Op.is]: !null },
//         }]
//       }],
//     });
//     if (!Images) {
//       return res.status(401).json("이미지가 존재하지 않습니다. ");
//     }
//     return res.status(201).json(Images.slice(tempDataNum * (pageParam - 1), tempDataNum * pageParam));
//   } catch (e) {
//     console.error(e);
//   }
// })


module.exports = router;