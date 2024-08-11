

const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');

const path = require('path'); //path는 노드에서 기능하는 기능
const fs = require('fs');//파일 시스템 조작 가능한 모듈

const express = require("express");
const router = express.Router();

const db = require("../models/index.js");
const tokenCheck = require('../middleware/tokenCheck.js');
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
    bucket: 'everstamp',
    key(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, 'ascii').toString('utf8');
      cb(null, `img/${Date.now()}_${path.basename(file.originalname).toString('utf8').split(' ').join('')}`)
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
});


//image upload
router.post('/', tokenCheck, upload.array('image'), async (req, res, next) => {
  // s3 multer
  res.json(req.files?.map((v) => decodeURIComponent(v.location)));
});



module.exports = router;