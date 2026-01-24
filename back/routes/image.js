const express = require("express");
const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path'); //path는 노드에서 기능하는 기능



const tokenCheck = require('../middleware/tokenCheck.js');
const { v4: uuidv4 } = require('uuid');

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


//image upload api
router.post('/', tokenCheck, upload.array('image'), async (req, res, next) => {
  res.json(req.files?.map((v) => decodeURIComponent(v.location)));
});



module.exports = router;