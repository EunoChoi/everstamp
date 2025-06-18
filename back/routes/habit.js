
const express = require("express");
const { subDays, startOfMonth, endOfMonth, getYear } = require("date-fns");
const db = require("../models/index.js");
const { promise } = require("bcrypt/promises.js");
const tokenCheck = require("../middleware/tokenCheck.js");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
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
  const todayDate = new Date().setHours(0, 0, 0, 0); // 오늘 날짜의 시작 시간으로 설정;

  console.log('email : ', email);
  console.log('todayDate : ', todayDate);
  try {
    const createdHabits = await Habit.findAll({
      where: [{
        email,
      }],
    });
    // console.log('-----------------createdHabits---------------- : ', createdHabits.length);
    const todayDiary = await Diary.findOne({
      where: [{
        email,
        date: todayDate
      }],
      include: [{
        model: Habit,//습관
      }]
    });
    // console.log('-----------------todayDiary---------------- : ', todayDiary);

    // return res.status(200).json({ createdHabits, todayDiary });
    if (createdHabits && todayDiary) {
      const result = {
        createdHabits: createdHabits.length,
        todayDoneHabits: todayDiary.Habits.length,
      }
      return res.status(200).json(result);
    }
    else return res.status(400).json('오늘의 습관 정보를 불러오지 못하였습니다.');
  } catch (e) {
    console.error(e);
  }
})

//load habit info by id
router.get("/", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit?id -----');
  const id = req.query.id;
  const email = req.currentUserEmail;
  try {
    const habits = await Habit.findOne({
      where: [{
        id,
        email,
      }],
    });
    if (habits) return res.status(200).json(habits);
    else return res.status(400).json('습관 정보를 불러오지 못하였습니다.');
  } catch (e) {
    console.error(e);
  }
})
//load habit list
router.get("/list", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/list -----');
  const { sort } = req.query;
  let { customOrder } = req.query;
  const email = req.currentUserEmail;
  const result = [];
  customOrder = customOrder?.map(e => Number(e));

  let habits;

  try {
    if (sort === 'CUSTOM' && customOrder) {
      let otherHabits = await Habit.findAll({
        where: [{
          email,
          id: {
            [Op.notIn]: customOrder // excludedIds에 포함되지 않는 ID로 필터링
          }
        }]
      });
      otherHabits = otherHabits.map(e => e.id);
      customOrder = [...customOrder, ...otherHabits];
      habits = await Habit.findAll({
        where: [{
          id: customOrder
        }],
        order: [
          [sequelize.literal(`FIELD(id, ${customOrder.join(',')})`), 'ASC']
        ]
      });
    }
    else if (sort === 'ASC' || sort === 'DESC') {
      habits = await Habit.findAll({
        where: [{
          email,
        }],
        order: [
          ['priority', 'DESC'],
          ['createdAt', sort], //ASC DESC
        ],
      });
    }
    else {
      habits = await Habit.findAll({
        where: [{
          email,
        }],
        order: [
          ['priority', 'DESC'],
          ['createdAt', 'ASC'], //ASC DESC
        ],
      });
    }
    if (habits) {
      // while (habits.length > 0) {
      //   result.push(habits.splice(0, 6));
      // }
      // return res.status(200).json(result);
      return res.status(200).json(habits);
    }
    else return res.status(400).json('습관 목록을 불러오지 못하였습니다.');
  } catch (e) {
    console.error(e);
  }
})
//load recent habit status
router.get("/recent", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/recent -----');
  const { id, date } = req.query;
  const email = req.currentUserEmail;
  try {

    const result = [];
    const d = new Date(Number(date))
    const recentDate = [d,
      subDays(d, 1),
      subDays(d, 2),
      subDays(d, 3)];


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
//load month habit status
router.get("/month", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/month -----');
  const { date } = req.query;
  const email = req.currentUserEmail;
  try {
    const current = new Date(Number(date));
    const monthStart = startOfMonth(current);
    const monthEnd = endOfMonth(current);

    let diary = await Diary.findAll({
      where: {
        email,
        [Op.and]: [
          { date: { [Op.gte]: monthStart } },
          { date: { [Op.lte]: monthEnd } }
        ],
      },
      attributes: ['date', 'visible', 'emotion'],
      include: [{
        model: Habit,
        attributes: ['name'],
      },],
    });

    if (diary) return res.status(200).json(diary);
    else return res.status(400).json('한달 습관 정보를 불러오지 못하였습니다.');
  } catch (e) {
    console.error(e);
  }
})
//load month single habit status
router.get("/month/single", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/month/single -----');
  const { id, date } = req.query;
  const email = req.currentUserEmail;
  try {
    const current = new Date(Number(date));
    const monthStart = startOfMonth(current);
    const monthEnd = endOfMonth(current);

    let diary = await Diary.findAll({
      where: {
        email,
        [Op.and]: [
          { date: { [Op.gte]: monthStart } },
          { date: { [Op.lte]: monthEnd } }
        ],
      },
      attributes: ['date'],
      include: [{
        model: Habit,
        where: { id },
        attributes: ['name'],
      },],
    });

    if (diary) return res.status(200).json(diary);
    else return res.status(400).json(`한달 습관(${id}) 정보를 불러오지 못하였습니다.`);
  } catch (e) {
    console.error(e);
  }
})
//load year single habit status
router.get("/year/single", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/year/single -----');
  const { id, date } = req.query;
  const email = req.currentUserEmail;

  // console.log(id, date, email);

  try {
    const result = [];
    const year = getYear(Number(date));
    // console.log('year : ', year);
    const months = [];
    for (let i = 0; i < 12; i++) months.push(new Date(year, i + 1, 0));
    // console.log('months : ', months);

    for (let i = 0; i < 12; i++) {
      let monthStart = startOfMonth(months[i]);
      let monthEnd = endOfMonth(months[i]);
      // console.log(monthStart, monthEnd);
      let diary = await Diary.findAll({
        where: {
          email,
          [Op.and]: [
            { date: { [Op.gte]: monthStart } },
            { date: { [Op.lte]: monthEnd } }
          ],
        },
        attributes: ['date'],
        include: [{
          model: Habit,
          where: { id },
          attributes: ['name'],
        },],
      });
      if (diary) result.push(diary.length);
    }

    if (result) return res.status(200).json(result);
    else return res.status(400).json(`1년 습관(${id}) 정보를 불러오지 못하였습니다.`);
  } catch (e) {
    console.error(e);
  }
})


//add habit
router.post("/", tokenCheck, async (req, res) => {
  console.log('----- method : post, url :  /habit -----');

  const habitName = req.body.habitName;
  // const themeColor = req.body.themeColor;
  const priority = req.body.priority;
  const email = req.currentUserEmail;
  try {
    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("유저가 존재하지 않습니다.");

    //동일한 이름의 습관이 이미 존재하는지 확인
    const isHabitExistAready = await Habit.findOne({
      where: {
        email,
        name: habitName,
      }
    })
    if (isHabitExistAready) return res.status(400).json('같은 이름을 가진 습관이 이미 존재합니다.');

    let habit = await Habit.findAll({
      where: {
        email
      }
    })
    if (habit.length >= 18) return res.status(400).json("습관은 최대 18개까지 생성 가능합니다.");

    habit = await Habit.create({
      UserId: user.id,
      email,
      name: habitName,
      priority,
    });
    if (habit) return res.status(200).json(habit);
    else return res.status(400).json('습관 생성 중 오류가 발생하였습니다.');
  } catch (e) {
    console.error(e);
  }
})

//edit habit
router.patch("/", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url :  /habit -----');
  const email = req.currentUserEmail;
  const { habitId, habitName, priority } = req.body;
  try {
    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) return res.status(400).json('유저가 존재하지 않습니다.');


    const isHabitExist = await Habit.findOne({
      where: { id: habitId, email },
    });
    if (!isHabitExist) return res.status(400).json("습관이 존재하지 않습니다.");

    const isHabitNameNotOk = await Habit.findOne({
      where: {
        name: habitName,
        email,
        id: { [Op.ne]: habitId }
      },
    });
    console.log(isHabitNameNotOk);
    if (isHabitNameNotOk) return res.status(400).json("동일한 이름의 습관이 존재합니다.");

    //같은 이름 있는지 확인 후 같은 이름이 있으면 수정 중단
    const updatedHabit = await Habit.update({
      name: habitName,
      priority
    }, {
      where: { id: habitId }
    });

    if (updatedHabit) return res.status(200).json(updatedHabit);
    else return res.status(400).json('수정 중 오류가 발생하였습니다.');
  } catch (e) {
    console.error(e);
  }
})

//delete habit
router.delete("/", tokenCheck, async (req, res) => {
  console.log('----- method : delete, url :  /habit?id -----');
  const email = req.currentUserEmail;
  const { habitId } = req.query;

  try {
    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) return res.status(400).json('유저가 존재하지 않습니다.');


    let habit = await Habit.findOne({
      where: { id: habitId },
    });
    if (!habit) return res.status(400).json("습관이 존재하지 않습니다.");


    await Habit.destroy({
      where: { id: habitId }
    });

    return res.status(200).json('habit deleted');
  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("");
})





//check, uncheck habit
//post - habit/check
router.post("/check", tokenCheck, async (req, res) => {
  try {
    const { habitId, date } = req.body;
    const email = req.currentUserEmail;

    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("유저 정보가 존재하지 않습니다.");

    const habit = await Habit.findOne({
      where: {
        email,
        id: habitId,
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
        emotion: 0,
        date,
        text: '-',
      }
    });

    diary.addHabit(habit);
    return res.status(200).json('checked');
  } catch (e) {
    console.error(e);
  }
})
//delete - babit/check
router.delete("/check", tokenCheck, async (req, res) => {
  try {
    const { habitId, date } = req.body;
    const email = req.currentUserEmail;

    //유저 존재 확인
    const user = await User.findOne({
      where: { email }
    })
    if (!user) return res.status(400).json("유저 정보가 존재하지 않습니다.");

    const habit = await Habit.findOne({
      where: {
        email,
        id: habitId,
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
    return res.status(200).json('unchecked');
  } catch (e) {
    console.error(e);
  }
})


module.exports = router;