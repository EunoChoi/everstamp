
const express = require("express");
const { subDays, startOfMonth, endOfMonth } = require("date-fns");
const db = require("../models/index.js");
const { promise } = require("bcrypt/promises.js");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const router = express.Router();

//model load
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;
const Habit = db.Habit;

//1. 해당 날짜의 다이어리를 포함하는 해빗 검색
//2. 없으면 다이어리 생성 visible false
//3. 검색 or 생성한 다이어리에 습관 관계 부여
//습관 생성
//습관이 없는 경우에 생성하고 관계 설정
//이미 존재한다면 그냥 관계 설정 여부만 관여

//load, add, edit, delete habit
//add habit


router.get("/", async (req, res) => {
  try {
    const { email, sort } = req.query;

    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("로그인 상태가 아닙니다.");

    const habits = await Habit.findAll({
      where: [{
        email,
      }],
      order: [
        ['name', sort], //ASC DESC
      ],
    });

    return res.status(200).json(habits);
  } catch (e) {
    console.error(e);
  }
})
router.get("/recent", async (req, res) => {
  try {
    const { email, id, date } = req.query;
    const result = [];
    const d = new Date(Number(date))
    recentDate = [d,
      subDays(d, 1),
      subDays(d, 2),
      subDays(d, 3)];



    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("로그인 상태가 아닙니다.");

    for (let i = 0; i < 4; i++) {
      let diary = await Diary.findOne({
        where: { email },
        attributes: ['date'],
        where: { date: recentDate[i] },
        include: [{
          model: Habit,
          where: { id },
          attributes: ['name'],
        },],
      });
      if (diary) result.push(true);
      else result.push(false);
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
  }
})
router.get("/month", async (req, res) => {
  try {
    const { email, date } = req.query;

    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("로그인 상태가 아닙니다.");

    const current = new Date(Number(date));
    const monthStart = startOfMonth(current);
    const monthEnd = endOfMonth(current);
    // console.log(monthStart, monthEnd);

    let diary = await Diary.findAll({
      where: {
        email,
        [Op.and]: [
          { date: { [Op.gte]: monthStart } },
          { date: { [Op.lte]: monthEnd } }
        ],
      },
      attributes: ['date', 'visible'],
      include: [{
        model: Habit,
        attributes: ['name'],
      },],
    });

    console.log(diary.dadataValues);


    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
  }
})

//add habit
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const habitName = req.body.habitName;
    const themeColor = req.body.themeColor;

    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("로그인 상태가 아닙니다.");

    //동일한 이름의 습관이 이미 존재하는지 확인
    const isHabitExistAready = await Habit.findOne({
      where: {
        email,
        name: habitName,
      }
    })
    if (isHabitExistAready) return res.status(400).json('동일한 이름의 습관이 이미 존재합니다.');

    const habit = await Habit.create({
      UserId: user.id,
      email,
      name: habitName,
      themeColor,
    });
    return res.status(200).json(habit);
  } catch (e) {
    console.error(e);
  }
})
//edit habit
router.patch("/", async (req, res) => {
  try {

  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("");
})
//delete habit
router.delete("/", async (req, res) => {
  try {

  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("");
})


//check, uncheck habit
//post - habit/check
router.post("/check", async (req, res) => {
  try {
    const { email, id, date } = req.body;

    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("로그인 상태가 아닙니다.");

    const habit = await Habit.findOne({
      where: {
        email,
        id,
      }
    })
    if (!habit) return res.status(400).json("습관이 존재하지 않습니다.");

    let [diary, created] = await Diary.findOrCreate({
      where: {
        email,
        date: new Date(Number(date))
      },
      defaults: {
        visible: false,
        UserId: user.id,
        email,
        date,
        text: '',
      }
    });

    diary.addHabit(habit);
    return res.status(200).json('checked');
  } catch (e) {
    console.error(e);
  }
})
//delete - babit/check
router.delete("/check", async (req, res) => {
  try {
    const { email, id, date } = req.body;

    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("로그인 상태가 아닙니다.");

    const habit = await Habit.findOne({
      where: {
        email,
        id,
      }
    })
    if (!habit) return res.status(400).json("습관이 존재하지 않습니다.");

    const diary = await Diary.findOne({
      where: [{
        email,
        date: new Date(Number(date))
      }],
    });
    diary.removeHabit(habit);
    return res.status(200).json('checked');
  } catch (e) {
    console.error(e);
  }
})


module.exports = router;