const express = require("express");

// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client } = require('@aws-sdk/client-s3');
// const AWS = require('aws-sdk');

// const path = require('path'); //path는 노드에서 기능하는 기능
// const fs = require('fs');//파일 시스템 조작 가능한 모듈


const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

const router = express.Router();

//model load
const User = db.User;
const Diary = db.Diary;

//image upload
// try {
//   //upload폴더가 존재하는지 확인
//   fs.accessSync('uploads');
// } catch (err) {
//   console.log('upload folder do not exist')
//   fs.mkdirSync('uploads');
// }

// //AWS 권한 획득
// AWS.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2'
// })

// console.log(process.env.S3_ACCESS_KEY_ID);

// //AWS S3 multer
// let s3 = new S3Client({
//   region: 'ap-northeast-2',
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   },
//   sslEnabled: false,
//   s3ForcePathStyle: true,
//   signatureVersion: 'v4',
// });

//add, edit, delete diary
router.post("/", async (req, res) => {
  try {
    const { email, date, text } = req.body;

    const user = await User.findOne({
      where: { email }
    })
    if (!user) {
      return res.status(400).json("로그인 상태가 아닙니다.");
    }


    const diary = await Diary.create({
      visible: true,
      UserId: user.id,
      email,
      date,
      text,
    });

    //image 모델 요소 생성 후 Post 모델과 연결
    // const postImages = req.body.images;

    // if (postImages.length >= 1) {
    //   const images = [];
    //   for (i = 0; i < postImages.length; i++) {
    //     const temp = await Image.create({ src: postImages[i] });
    //     images.push(temp);
    //   }
    //   post.addImages(images);
    //   return setTimeout(() => {
    //     res.status(200).json({ postImages, images, post });
    //   }, 1000);
    // }

    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
  }

})
// router.patch("/:postId", tokenCheck, async (req, res) => {
//   try {
//     const postId = req.params.postId;

//     //current user
//     const currentUser = await User.findOne({
//       where: { id: req.currentUserId },
//     });

//     const post = await Post.findOne({
//       where: { id: postId },
//       include: [
//         {
//           model: Hashtag,
//           attributes: ['id'],
//         }
//       ]
//     });

//     if (!post) return res.status(403).json("게시글이 올바르지 않습니다.");
//     if (post && post.UserId !== req.currentUserId && currentUser.level !== 10) {
//       return res.status(403).json("다른 사람의 게시글 입니다.");
//     }


//     // 현재 로그인된 유저의 id와 포스트 text로 post 모델의 요소 생성
//     await Post.update({
//       content: req.body.content,
//       start: req.body.start,
//       end: req.body.end,
//       link: req.body.link
//     }, {
//       where: { id: postId }
//     }
//     );

//     if (post.type !== 0) {
//       const beforeTags = post.Hashtags.map(v => v.id);
//       post.removeHashtag(beforeTags);

//       const hashtags = req.body.content.match(/#[^\s#]{1,15}/g);
//       if (hashtags) {
//         const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
//           where: { name: tag.slice(1).toLowerCase() }
//         })))
//         await post.addHashtag(result.map(v => v[0]));
//       }
//     }


//     //기존에 등록되어 있는 이미지 모델 삭제
//     await Image.destroy({
//       where: {
//         PostId: postId
//       }
//     })

//     //수정된 이미지들을 image 모델 요소 생성 후 Post 모델과 연결
//     const postImages = req.body.images;
//     if (postImages.length >= 1) {
//       const images = [];
//       for (i = 0; i < postImages.length; i++) {
//         const temp = await Image.create({ src: postImages[i] });
//         images.push(temp);
//       }
//       post.addImages(images);

//       return setTimeout(() => {
//         res.status(200).json({ postImages, images, post });
//       }, 1000);
//     }
//     return setTimeout(() => {
//       res.status(200).json(post);
//     }, 1000);
//   } catch (e) {
//     console.error(e);
//   }
// })
// router.delete("/:postId", tokenCheck, async (req, res) => {
//   try {
//     const postId = req.params.postId;

//     //current user
//     const currentUser = await User.findOne({
//       where: { id: req.currentUserId },
//     });
//     //selected post
//     const post = await Post.findOne({
//       where: { id: postId }
//     });

//     if (!post) return res.status(403).json("게시글이 올바르지 않습니다.");
//     if (post && post.UserId !== req.currentUserId && currentUser.level !== 10) {
//       return res.status(403).json("다른 사람의 게시글 입니다.");
//     }
//     console.log(post);

//     await Post.destroy({
//       where: { id: postId }
//     });
//   } catch (e) {
//     console.error(e);
//   }
//   res.status(200).json("post delete success");
// })


//load diary - in list

router.get("/list", async (req, res) => {
  const { email, sort } = req.query;
  try {
    const where = {};
    const diaries = await Diary.findAll({
      where: [{
        email,
      }],
      // include: [
      //   {
      //     model: User,//게시글 작성자
      //     attributes: ['id', 'nickname', 'profilePic', 'email'],
      //   },
      //   {
      //     model: User, //좋아요 누른 사람
      //     as: 'Likers', //모델에서 가져온대로 설정
      //     attributes: ['id', 'nickname'],
      //   },
      //   {
      //     model: Image, //게시글의 이미지
      //   },
      //   {
      //     model: Comment, //게시글에 달린 댓글
      //     include: [
      //       {
      //         model: User, //댓글의 작성자
      //         attributes: ['id', 'nickname', 'profilePic'],
      //       },
      //       {
      //         model: Comment, //대댓글
      //         as: 'ReplyChild',
      //         include: [
      //           {
      //             model: User, //대댓글의 작성자
      //             attributes: ['id', 'nickname', 'profilePic'],
      //           }
      //         ],
      //       }
      //     ],
      //   }
      // ],
      order: [
        ['date', sort], //ASC DESC
      ],
    });

    if (diaries) return res.status(201).json(diaries);
    return res.status(400).json('no diary list');
  } catch (e) {
    console.error(e);
  }
})
//load diary - in calendar
router.get("/calendar", async (req, res) => {
  const { email, date } = req.query;

  try {
    const diary = await Diary.findOne({
      where: [{
        email,
        date: new Date(Number(date))
      }],
    });
    if (diary) return res.status(201).json(diary);
    return res.status(400).json('no diary calendar');
  } catch (e) {
    console.error(e);
  }
})

module.exports = router;