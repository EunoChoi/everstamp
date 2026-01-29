
const express = require("express");


const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

const router = express.Router();
const tokenCheck = require("../middleware/tokenCheck.js");

const encrypt = require('../function/encrypt.js');
const decrypt = require('../function/decrypt.js');
const { parseDate } = require('../function/parseDate.js');

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

  // 감정 값 검증 (0-9: 10개 감정)
  if (emotion === undefined || emotion === null || emotion < 0 || emotion > 9) {
    return res.status(400).json({ error: '감정 값이 올바르지 않습니다. (0-9)' });
  }

  // date: 'yyyy-MM-dd' string → Date 객체로 변환
  const dateObj = parseDate(date);

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
        where: { email, date: dateObj },
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
          date: dateObj,
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

  // 감정 값 검증 (0-9: 10개 감정)
  if (emotion === undefined || emotion === null || emotion < 0 || emotion > 9) {
    return res.status(400).json({ error: '감정 값이 올바르지 않습니다. (0-9)' });
  }

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
    await sequelize.transaction(async (t) => {
      // 유저 확인
      const currentUser = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!currentUser) throw new Error('유저가 존재하지 않습니다.');

      // 다이어리 확인
      const diary = await Diary.findOne({
        where: { id: diaryId, UserId: currentUser.id },
        transaction: t
      });
      if (!diary) throw new Error('게시글이 올바르지 않습니다.');

      // 습관 기록 유지를 위해 삭제 대신 visible false 처리
      await diary.update({
        text: '',
        visible: false,
        emotion: 2,
      }, { transaction: t });

      // 이미지 삭제
      await Image.destroy({
        where: { diaryId },
        transaction: t
      });
    });

    return res.status(200).json('일기 삭제 완료');
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message || '삭제 중 오류가 발생했습니다.');
  }
})



//load diary
//load diary from diary id
router.get("/id/:diaryId", tokenCheck, async (req, res) => {
  console.log('----- method : get, url : /diary/:id -----');
  const email = req.currentUserEmail;
  const diaryId = req.params.diaryId;

  try {
    const diary = await Diary.findOne({
      where: { email, id: diaryId, visible: true },
      include: [
        { model: Image },
        { model: Habit }
      ],
      order: [[Image, 'order', 'ASC']],
    });

    if (!diary) {
      return res.status(404).json('다이어리를 찾을 수 없습니다.');
    }

    diary.text = decrypt(diary.text, process.env.DATA_SECRET_KEY);
    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})
//list
router.get("/list", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /diary/list -----');
  const { sort, search, pageParam, limit, selectedYear, selectedMonth } = req.query;
  const email = req.currentUserEmail;
  const offset = Number(pageParam) * Number(limit);

  try {
    const nYear = Number(selectedYear);
    const nMonth = Number(selectedMonth);

    // 날짜 범위 설정
    let rangeStart = new Date(0, 0, 1);
    let rangeEnd = new Date(3000, 11, 31);

    if (nYear && nMonth && nMonth !== 0) {
      rangeStart = new Date(nYear, nMonth - 1, 1);
      rangeEnd = new Date(nYear, nMonth, 0, 23, 59, 59); // 해당 월의 마지막 날
    }

    // 조건 설정
    const where = {
      email,
      visible: true,
      date: { [Op.between]: [rangeStart, rangeEnd] }
    };

    // 감정 필터 (10은 전체, 0-9는 해당 감정)
    const emotionFilter = Number(search);
    if (emotionFilter !== 10 && emotionFilter >= 0 && emotionFilter <= 9) {
      where.emotion = emotionFilter;
    }

    const diaries = await Diary.findAll({
      where,
      offset,
      limit: Number(limit),
      include: [
        { model: Image },
        { model: Habit }
      ],
      order: [
        ['date', sort],
        [Image, 'order', 'ASC'],
        [Habit, 'priority', 'DESC']
      ],
    });

    // 텍스트 복호화
    diaries.forEach(diary => {
      diary.text = decrypt(diary.text, process.env.DATA_SECRET_KEY);
    });

    return res.status(200).json(diaries);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})
//load diary - from calendar date
router.get("/calendar", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /diary/calendar -----');
  const { date } = req.query;
  const email = req.currentUserEmail;

  try {
    const dateObj = parseDate(date);
    const diary = await Diary.findOne({
      where: { email, date: dateObj },
      include: [
        { model: Image },
        { model: Habit }
      ],
      order: [
        [Image, 'order', 'ASC'],
        [Habit, 'priority', 'DESC']
      ],
    });

    if (!diary) {
      return res.status(404).json('다이어리가 존재하지 않습니다.');
    }

    diary.text = decrypt(diary.text, process.env.DATA_SECRET_KEY);
    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})

module.exports = router;