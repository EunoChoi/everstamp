
const express = require("express");


const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

const router = express.Router();
const tokenCheck = require("../middleware/tokenCheck.js");

const encrypt = require('../function/encrypt.js');
const decrypt = require('../function/decrypt.js');

//model load
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;
const Habit = db.Habit;


//add, update, delete diary
router.post("/", tokenCheck, async (req, res) => {
  console.log('----- method : post, url : /diary -----');
  let { date, text, images, emotion } = req.body;
  const email = req.currentUserEmail;

  //encrypto text
  text = encrypt(text, process.env.DATA_SECRET_KEY);

  try {
    const result = await sequelize.transaction(async (t) => {
      // 유저 확인
      const user = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!user) throw new Error("유저가 존재하지 않습니다.");

      // 기존 일기 존재 확인
      const existingDiary = await Diary.findOne({
        where: { email, date },
        transaction: t
      });

      let diary;
      if (existingDiary) {
        if (existingDiary.visible) {
          throw new Error('해당 날짜에 일기가 이미 존재합니다.');
        }
        // 기존 비가시성 일기 업데이트
        await existingDiary.update({
          visible: true,
          text,
          emotion
        }, { transaction: t });
        diary = existingDiary;
      } else {
        // 새 일기 생성
        diary = await Diary.create({
          visible: true,
          UserId: user.id,
          email,
          emotion,
          date,
          text,
        }, { transaction: t });
      }

      // 이미지 처리
      if (images.length > 0) {
        const imagePromises = images.map((src, index) => ({
          src, order: index, diaryId: diary.id
        }));
        await Image.bulkCreate(imagePromises, { transaction: t });
      }

      return diary;
    });

    return res.status(200).json(result);

  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
});
router.patch("/", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url : /diary -----');
  const diaryId = req.query.diaryId;
  let { text, images, emotion } = req.body;
  const email = req.currentUserEmail;

  // Encrypt text
  text = encrypt(text, process.env.DATA_SECRET_KEY);

  try {
    // 트랜잭션 시작
    const result = await sequelize.transaction(async (t) => {
      // 유저 확인
      const currentUser = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!currentUser) throw new Error('유저가 존재하지 않습니다.');

      // 다이어리 확인 및 업데이트
      const diary = await Diary.findOne({
        where: { id: diaryId, UserId: currentUser.id },
        transaction: t
      });
      if (!diary) throw new Error("게시글이 올바르지 않습니다.");

      await diary.update({
        text,
        emotion
      }, { transaction: t });

      // 기존 이미지 삭제 및 새로운 이미지 추가
      await Image.destroy({
        where: { diaryId },
        transaction: t
      });

      if (images.length > 0) {
        const imagePromises = images.map((src, index) => ({
          src, order: index, diaryId
        }));
        await Image.bulkCreate(imagePromises, { transaction: t });
      }

      return diary;
    });

    return res.status(200).json(result);

  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
});
router.delete("/", tokenCheck, async (req, res) => {
  console.log('----- method : delete, url :  /diary -----');
  const diaryId = req.query.id;
  const email = req.currentUserEmail;

  try {
    //유저 확인
    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) return res.status(400).json('유저가 존재하지 않습니다.');

    // //일기 확인
    // const isDiaryExist = await Diary.findOne({
    //   where: { id }
    // });
    // if (!isDiaryExist) return res.status(400).json('일기가 존재하지 않습니다.');

    // await Diary.destroy({
    //   where: { id }
    // });

    const diary = await Diary.findOne({
      where: { id: diaryId },
    });
    if (!diary) return res.status(400).json("게시글이 올바르지 않습니다.");

    //체크된 습관 유지하기 위해 삭제 대신 visible false 처리
    await Diary.update({
      text: '',
      visible: false,
      emotion: 2,
    }, {
      where: { id: diaryId }
    });
    await Image.destroy({
      where: { diaryId }
    })

  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("일기 삭제 완료");
})



//load diary
//load diary from diary id
router.get("/id/:diaryId", tokenCheck, async (req, res) => {

  console.log('----- method : get, url : /diary/:id -----');
  const diaryId = req.params.diaryId;

  try {
    const diary = await Diary.findOne({
      where: [{
        id: diaryId,
      }],
      include: [{
        model: Image//이미지
      }, {
        model: Habit
      }],
      order: [
        [Image, 'order', 'ASC'],
      ],
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
  const { sort, search, pageParam, limit, selectedYear, selectedMonth } = req.query;
  const email = req.currentUserEmail;
  const offset = Number(pageParam * limit);


  const nYear = Number(selectedYear);
  const nMonth = Number(selectedMonth);

  console.log(nYear, nMonth);

  let rangeStart = new Date(0, 0, 0);
  let rangeEnd = new Date(3000, 0, 0);

  if (nYear && nMonth && nMonth !== 0) {
    rangeStart = new Date(nYear, nMonth - 1);
    rangeEnd = new Date(nYear, nMonth);
  }

  console.log(rangeStart, rangeEnd);


  //초기 pageParam =0 이므로 limit 5 가정하여
  //pageParam 0일때 offset은 0
  //pageParam 1일때 offset은 5
  //pageParam 2일때 offset은 10


  try {
    let where = {};
    if (Number(search) === 5) {
      where = {
        email,
        visible: true,
        [Op.and]: [
          { date: { [Op.gte]: rangeStart } },
          { date: { [Op.lt]: rangeEnd } }
        ],
      }
    } else {
      where = {
        email,
        visible: true,
        emotion: search,
        [Op.and]: [
          { date: { [Op.gte]: rangeStart } },
          { date: { [Op.lte]: rangeEnd } }
        ],
      }
    }


    const diaries = await Diary.findAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      include: [{
        model: Image,//이미지
      }, {
        model: Habit,//습관
      }],
      order: [
        ['date', sort], //ASC DESC
        [Image, 'order', 'ASC'],
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
//load diary - from calendar date
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
        [Image, 'order', 'ASC'],
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