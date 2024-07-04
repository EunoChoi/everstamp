
const express = require("express");
const jwt = require("jsonwebtoken");


const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

const router = express.Router();
const tokenCheck = require("../middleware/tokenCheck.js");

const encrypt = require('../function/encrypt.js');
const decrypt = require('../function/decrypt.js');


// const NextAuth = require('next-auth');

//model load
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;
const Habit = db.Habit;





//add, edit, delete diary
router.post("/", tokenCheck, async (req, res) => {
  console.log('----- method : post, url :  /diary -----');
  let { date, text, images } = req.body;
  const email = req.currentUserEmail;

  //encrypto text
  text = encrypt(text, process.env.DATA_SECRET_KEY);

  try {
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("유저가 존재하지 않습니다.");

    const isVisibleDiaryExistAready = await Diary.findOne({
      where: { email, visible: true, date }
    })
    if (isVisibleDiaryExistAready) return res.status(400).json('해당 날짜에 일기가 이미 존재합니다.');

    const isEmptyDiaryExistAready = await Diary.findOne({
      where: { email, visible: false, date }
    })

    let diary;
    if (isEmptyDiaryExistAready) {
      diary = await Diary.update({
        visible: true,
        text,
      }, {
        where: { email, date }
      });
    }

    else {
      diary = await Diary.create({
        visible: true,
        UserId: user.id,
        email,
        date,
        text,
      });
    }


    //image 모델 요소 생성 후 Post 모델과 연결
    if (images.length >= 1) {
      const ImagesData = [];
      for (i = 0; i < images.length; i++) {
        const img = await Image.create({ src: images[i] });
        ImagesData.push(img);
      }
      diary.addImages(ImagesData);
    }

    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
  }
})
router.patch("/", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url :  /diary -----');
  const diaryId = req.query.diaryId;
  const images = req.body.images;
  let text = req.body.text;
  const email = req.currentUserEmail;

  //encrypto text
  text = encrypt(text, process.env.DATA_SECRET_KEY);

  try {
    //current user
    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) return res.status(400).json('유저가 존재하지 않습니다.');


    const diary = await Diary.findOne({
      where: { id: diaryId },
    });
    if (!diary) return res.status(400).json("게시글이 올바르지 않습니다.");


    await Diary.update({
      text,
    }, {
      where: { id: diaryId }
    });


    //기존에 등록되어 있는 이미지 삭제 및 재 추가
    await Image.destroy({
      where: { diaryId }
    })
    if (images.length >= 1) {
      const ImagesData = [];
      for (i = 0; i < images.length; i++) {
        const img = await Image.create({ src: images[i] });
        ImagesData.push(img);
      }
      diary.addImages(ImagesData);
    }
    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
  }
})
router.delete("/", tokenCheck, async (req, res) => {
  console.log('----- method : delete, url :  /diary -----');
  const id = req.query.id;
  const email = req.currentUserEmail;

  try {
    //유저 확인
    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) return res.status(400).json('유저가 존재하지 않습니다.');

    //일기 확인
    const isDiaryExist = await Diary.findOne({
      where: { id }
    });
    if (!isDiaryExist) return res.status(400).json('일기가 존재하지 않습니다.');

    await Diary.destroy({
      where: { id }
    });
  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("일기 삭제 완료");
})



//load diary
//by diary id, for diary
router.get("/id/:diaryId", tokenCheck, async (req, res) => {

  console.log('----- method : get, url : /diary/:id -----');
  const diaryId = req.params.diaryId;

  try {
    const diary = await Diary.findOne({
      where: [{
        id: diaryId,
      }],
      include: [{
        model: Image,//이미지
      }],
    });


    if (diary) {
      const decryptedText = decrypt(diary.text, process.env.DATA_SECRET_KEY);
      diary.text = decryptedText;
      return res.status(201).json(diary);
    }

    else return res.status(400).json('no diary found by id');
  } catch (e) {
    console.error(e);
  }
})
//list
router.get("/list", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /diary/list -----');
  const { sort, search, pageParam, limit } = req.query;
  const email = req.currentUserEmail;
  const offset = Number(pageParam * limit);

  //초기 pageParam =0 이므로
  //limit 5 가정하여
  //pageParam 0일때 offset은 0
  //pageParam 1일때 offset은 5
  //pageParam 2일때 offset은 10


  try {
    const diaries = await Diary.findAll({
      where: [{
        email,
        visible: true,
        text: {
          [Op.like]: "%" + `${search}` + "%"
        }
      }],
      offset: Number(offset),
      limit: Number(limit),
      include: [{
        model: Image,//이미지
      }, {
        model: Habit,//습관
      }],
      order: [
        ['date', sort], //ASC DESC
        [Habit, 'priority', 'DESC']
      ],
    });

    if (diaries) {
      diaries.map(diary => {
        const decryptedText = decrypt(diary.text, process.env.DATA_SECRET_KEY);
        diary.text = decryptedText;
        return diary;
      });
      return res.status(201).json(diaries);
    }
    else return res.status(400).json('no diary list');
  } catch (e) {
    console.error(e);
  }
})
//load diary - calendar date
router.get("/calendar", tokenCheck, async (req, res) => {

  console.log('----- method : get, url :  /diary/calendar -----');
  const { date } = req.query;
  const email = req.currentUserEmail;

  try {
    const diary = await Diary.findOne({
      where: [{
        email,
        // visible: true,
        date: new Date(Number(date))
      }],
      include: [{
        model: Image,//이미지
      }, {
        model: Habit,//습관
      }],
      order: [
        [Habit, 'priority', 'DESC']
      ],
    });

    if (diary) {
      const decryptedText = decrypt(diary.text, process.env.DATA_SECRET_KEY);
      diary.text = decryptedText;
      return res.status(201).json(diary);
    }

    else return res.status(200).json('다이어리가 존재하지 않습니다.');
  } catch (e) {
    console.error(e);
  }
})

module.exports = router;