
const express = require("express");
const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

const router = express.Router();

//model load
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;
const Habit = db.Habit;





//add, edit, delete diary
//add diary
router.post("/", async (req, res) => {
  try {
    const { email, date, text, images } = req.body;

    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("로그인 상태가 아닙니다.");


    //혹시 모르니 backend에서도 차단
    const isDiaryExistAready = await Diary.findOne({
      where: {
        email,
        date
      }
    })
    if (isDiaryExistAready) return res.status(400).json('해당 날짜에 일기가 이미 존재합니다.');

    const diary = await Diary.create({
      visible: true,
      UserId: user.id,
      email,
      date,
      text,
    });


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
//edit diary
router.patch("/", async (req, res) => {
  try {
    //query strig userId, diaryId
    const email = req.query.userEmail;
    const diaryId = req.query.diaryId;
    const images = req.body.images;

    //body text, 
    const text = req.body.text;

    //current user
    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) return res.status(400).json('유저가 존재하지 않습니다.');


    const diary = await Diary.findOne({
      where: { id: diaryId },
    });
    if (!diary) return res.status(403).json("게시글이 올바르지 않습니다.");


    await Diary.update({
      text,
    }, {
      where: { id: diaryId }
    });



    //기존에 등록되어 있는 이미지 모델 삭제
    await Image.destroy({
      where: { diaryId }
    })

    //수정된 이미지들을 image 모델 요소 생성 후 Diary 모델과 연결
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
router.delete("/", async (req, res) => {
  try {
    const email = req.query.email;
    const diaryId = req.query.diaryId;
    console.log(email, diaryId);

    //유저 확인
    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) return res.status(400).json('유저가 존재하지 않습니다.');

    //일기 확인
    const isDiaryExist = await Diary.findOne({
      where: { id: diaryId }
    });
    if (!isDiaryExist) return res.status(400).json('일기가 존재하지 않습니다.');

    await Diary.destroy({
      where: { id: diaryId }
    });
  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("일기 삭제 완료");
})




//load diary 
//load diary - by diary id, for diary
router.get("/id/:diaryId", async (req, res) => {
  const diaryId = req.params.diaryId;

  try {
    const diary = await Diary.findOne({
      where: [{
        id: diaryId,
      }],
      include: [{
        model: Image,//이미지
      },
        // {
        //   model: Habit,//습관
        // }
      ],
    });
    if (diary) return res.status(201).json(diary);
    return res.status(400).json('no diary by id');
  } catch (e) {
    console.error(e);
  }
})
//load diary - list
router.get("/list", async (req, res) => {
  const { email, sort } = req.query;
  try {
    const diaries = await Diary.findAll({
      where: [{
        email,
      }],
      include: [{
        model: Image,//이미지
      }, {
        model: Habit,//습관
      }],
      order: [
        ['date', sort], //ASC DESC
        [Habit, 'name', 'ASC']
      ],
    });

    if (diaries) return res.status(201).json(diaries);
    return res.status(400).json('no diary list');
  } catch (e) {
    console.error(e);
  }
})
//load diary - calendar date
router.get("/calendar", async (req, res) => {
  const { email, date } = req.query;

  try {
    const diary = await Diary.findOne({
      where: [{
        email,
        date: new Date(Number(date))
      }],
      include: [{
        model: Image,//이미지
      }, {
        model: Habit,//습관
      }],
      order: [
        [Habit, 'name', 'ASC']
      ],
    });
    console.log(diary);
    if (diary) return res.status(201).json(diary);
    return res.status(200).json(null);
  } catch (e) {
    console.error(e);
  }
})

module.exports = router;