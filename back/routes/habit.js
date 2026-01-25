
const express = require("express");
const { subDays, startOfMonth, endOfMonth } = require("date-fns");
const db = require("../models/index.js");
const tokenCheck = require("../middleware/tokenCheck.js");
const { parseDate, parseMonth, parseYear } = require('../function/parseDate.js');

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const router = express.Router();

//model load
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;
const Habit = db.Habit;

//today habit status
router.get("/today", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/today -----');
  const email = req.currentUserEmail;

  try {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // 병렬로 두 쿼리 실행
    const [habitCount, todayDiary] = await Promise.all([
      Habit.count({ where: { email } }),
      Diary.findOne({
        where: { email, date: todayDate },
        include: [{ model: Habit, attributes: ['id'] }]
      })
    ]);

    return res.status(200).json({
      createdHabits: habitCount,
      todayDoneHabits: todayDiary?.Habits?.length || 0
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})

//load habit info by id
router.get("/", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit?id -----');
  const { id } = req.query;
  const email = req.currentUserEmail;

  try {
    const habit = await Habit.findOne({
      where: { id, email }
    });

    if (!habit) {
      return res.status(404).json('습관을 찾을 수 없습니다.');
    }
    return res.status(200).json(habit);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})
//load habit list
router.get("/list", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/list -----');
  try {
    const { sort } = req.query;
    let { customOrder } = req.query;
    const email = req.currentUserEmail;

    //customOrder 처리
    if (typeof customOrder === 'string' && customOrder) {
      customOrder = customOrder.split(',').map(e => Number(e.trim()));
    } else if (!Array.isArray(customOrder)) {
      customOrder = [];
    }

    const findOptions = {
      where: { email }
    };

    //조건문 거치면서 findOptions 변경
    if (sort === 'ASC' || sort === 'DESC') {
      findOptions.order = [['createdAt', sort]];
    } else if (sort === 'CUSTOM') {
      if (customOrder && customOrder.length > 0) {
        findOptions.order = [
          //customOrder에 포함되면 0 아니면 1로 값 변경 후 ASC로 정렬 이러면 두타입이 구분되서 정렬됨
          [sequelize.literal(`CASE WHEN id IN (${customOrder.join(',')}) THEN 0 ELSE 1 END`), 'ASC'],
          //customOrder 즉 0을 값으로 가진 값들을 field가 1,2,3... 등으로 순차적인 숫자를 부여 이값으로 asc 정렬
          [sequelize.literal(`FIELD(id, ${customOrder.join(',')})`), 'ASC'],
          //전체적으로 createdAt', 'ASC'로 정렬해서 나머지 customOrder가 asc로 정렬
          ['createdAt', 'ASC']
        ];
      } else {
        findOptions.order = [['createdAt', 'ASC']];
      }
    } else if (sort === 'PRIORITY') {
      findOptions.order = [
        ['priority', 'DESC'],
        ['createdAt', 'ASC'],
      ]
    }

    const habits = await Habit.findAll(findOptions);

    if (habits) {
      return res.status(200).json(habits);
    } else {
      return res.status(404).json('습관 목록을 찾을 수 없습니다.');
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
});
//load recent habit status
router.get("/recent", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/recent -----');
  const { id, date } = req.query;
  const email = req.currentUserEmail;

  try {
    const d = parseDate(date);
    const recentDates = [d, subDays(d, 1), subDays(d, 2), subDays(d, 3)];

    // 단일 쿼리로 4일치 데이터 한번에 조회
    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.in]: recentDates }
      },
      attributes: ['date'],
      include: [{
        model: Habit,
        where: { id },
        attributes: [],
        required: true
      }]
    });

    // 날짜별 존재 여부 매핑
    const foundDates = new Set(diaries.map(d => d.date.toISOString().split('T')[0]));
    const result = recentDates.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return foundDates.has(dateStr);
    });

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})
//load month habit status
router.get("/month", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/month -----');
  const { month } = req.query;
  const email = req.currentUserEmail;

  try {
    const current = parseMonth(month);
    const monthStart = startOfMonth(current);
    const monthEnd = endOfMonth(current);

    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [monthStart, monthEnd] }
      },
      attributes: ['date', 'visible', 'emotion'],
      include: [{
        model: Habit,
        attributes: ['name']
      }]
    });

    return res.status(200).json(diaries);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})

//load month single habit status
router.get("/month/single", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/month/single -----');
  const { id, month } = req.query;
  const email = req.currentUserEmail;

  try {
    const current = parseMonth(month);
    const monthStart = startOfMonth(current);
    const monthEnd = endOfMonth(current);

    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [monthStart, monthEnd] }
      },
      attributes: ['date'],
      include: [{
        model: Habit,
        where: { id },
        attributes: ['name'],
        required: true
      }]
    });

    return res.status(200).json(diaries);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})
//load year single habit status
router.get("/year/single", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/year/single -----');
  const { id, year: yearParam } = req.query;
  const email = req.currentUserEmail;

  try {
    const year = parseYear(yearParam);
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31, 23, 59, 59);

    // 단일 쿼리로 1년치 데이터 조회 후 월별 그룹화
    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [yearStart, yearEnd] }
      },
      attributes: ['date'],
      include: [{
        model: Habit,
        where: { id },
        attributes: [],
        required: true
      }]
    });

    // 월별 카운트 집계
    const result = Array(12).fill(0);
    diaries.forEach(diary => {
      const month = new Date(diary.date).getMonth();
      result[month]++;
    });

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})


//add habit
router.post("/", tokenCheck, async (req, res) => {
  console.log('----- method : post, url :  /habit -----');
  const { habitName, priority } = req.body;
  const email = req.currentUserEmail;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json('유저가 존재하지 않습니다.');
    }

    // 중복 이름 확인
    const existingHabit = await Habit.findOne({
      where: { email, name: habitName }
    });
    if (existingHabit) {
      return res.status(400).json('같은 이름을 가진 습관이 이미 존재합니다.');
    }

    // 최대 개수 확인 (count 사용으로 최적화)
    const habitCount = await Habit.count({ where: { email } });
    if (habitCount >= 18) {
      return res.status(400).json('습관은 최대 18개까지 생성 가능합니다.');
    }

    const habit = await Habit.create({
      UserId: user.id,
      email,
      name: habitName,
      priority
    });

    return res.status(201).json(habit);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})

//edit habit
router.patch("/", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url :  /habit -----');
  const email = req.currentUserEmail;
  const { habitId, habitName, priority } = req.body;

  try {
    // 습관 존재 확인
    const habit = await Habit.findOne({
      where: { id: habitId, email }
    });
    if (!habit) {
      return res.status(404).json('습관이 존재하지 않습니다.');
    }

    // 중복 이름 확인 (자기 자신 제외)
    const duplicateName = await Habit.findOne({
      where: {
        email,
        name: habitName,
        id: { [Op.ne]: habitId }
      }
    });
    if (duplicateName) {
      return res.status(400).json('동일한 이름의 습관이 존재합니다.');
    }

    await habit.update({ name: habitName, priority });
    return res.status(200).json(habit);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})

//delete habit
router.delete("/", tokenCheck, async (req, res) => {
  console.log('----- method : delete, url :  /habit?id -----');
  const email = req.currentUserEmail;
  const { habitId } = req.query;

  try {
    const habit = await Habit.findOne({
      where: { id: habitId, email }
    });
    if (!habit) {
      return res.status(404).json('습관이 존재하지 않습니다.');
    }

    await habit.destroy();
    return res.status(200).json('습관이 삭제되었습니다.');
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})





//check, uncheck habit
//post - habit/check
router.post("/check", tokenCheck, async (req, res) => {
  const { habitId, date } = req.body;
  const email = req.currentUserEmail;

  try {
    const result = await sequelize.transaction(async (t) => {
      const dateObj = parseDate(date);

      const user = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!user) throw new Error('유저 정보가 존재하지 않습니다.');

      const habit = await Habit.findOne({
        where: { email, id: habitId },
        transaction: t
      });
      if (!habit) throw new Error('습관이 존재하지 않습니다.');

      const [diary] = await Diary.findOrCreate({
        where: { email, date: dateObj },
        defaults: {
          visible: false,
          UserId: user.id,
          email,
          emotion: 0,
          date: dateObj,
          text: '-',
        },
        transaction: t
      });

      await diary.addHabit(habit, { transaction: t });
      return 'checked';
    });

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message || '습관 체크 중 오류가 발생했습니다.');
  }
})

//delete - habit/check
router.delete("/check", tokenCheck, async (req, res) => {
  const { habitId, date } = req.body;
  const email = req.currentUserEmail;

  try {
    const result = await sequelize.transaction(async (t) => {
      const dateObj = parseDate(date);

      const user = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!user) throw new Error('유저 정보가 존재하지 않습니다.');

      const habit = await Habit.findOne({
        where: { email, id: habitId },
        transaction: t
      });
      if (!habit) throw new Error('습관이 존재하지 않습니다.');

      const diary = await Diary.findOne({
        where: { email, date: dateObj },
        transaction: t
      });
      if (!diary) throw new Error('다이어리가 존재하지 않습니다.');

      await diary.removeHabit(habit, { transaction: t });
      return 'unchecked';
    });

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message || '습관 체크 해제 중 오류가 발생했습니다.');
  }
})


module.exports = router;