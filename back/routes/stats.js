const express = require("express");
const { startOfYear, endOfYear, differenceInDays, differenceInWeeks } = require("date-fns");
const db = require("../models/index.js");
const tokenCheck = require("../middleware/tokenCheck.js");
const decrypt = require('../function/decrypt.js');

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const router = express.Router();

const Diary = db.Diary;
const Habit = db.Habit;

// 기록이 있는 연도 목록 조회
router.get("/years", tokenCheck, async (req, res) => {
  console.log('----- method : get, url : /stats/years -----');
  const email = req.currentUserEmail;

  try {
    const diaries = await Diary.findAll({
      where: { email, visible: true },
      attributes: [[sequelize.fn('DISTINCT', sequelize.fn('YEAR', sequelize.col('date'))), 'year']],
      order: [[sequelize.fn('YEAR', sequelize.col('date')), 'DESC']],
      raw: true
    });

    const years = diaries.map(d => d.year).filter(y => y !== null);
    return res.status(200).json(years);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
});

// 연도별 일기 통계 조회
router.get("/diary/:year", tokenCheck, async (req, res) => {
  console.log('----- method : get, url : /stats/diary/:year -----');
  const email = req.currentUserEmail;
  const year = parseInt(req.params.year);

  try {
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31, 23, 59, 59);

    // 해당 연도의 모든 일기 조회 (날짜순)
    const diaries = await Diary.findAll({
      where: {
        email,
        visible: true,
        date: { [Op.between]: [yearStart, yearEnd] }
      },
      attributes: ['date', 'emotion', 'text'],
      order: [['date', 'ASC']],
      raw: true
    });

    if (diaries.length === 0) {
      return res.status(200).json({
        totalCount: 0,
        emotionCounts: [0, 0, 0, 0, 0],
        currentStreak: { days: 0, weeks: 0, months: 0 },
        longestStreak: { days: 0, weeks: 0, months: 0 },
        monthlyCount: Array(12).fill(0),
        totalTextLength: 0,
        monthlyEmotionCounts: Array(12).fill(null).map(() => [0, 0, 0, 0, 0])
      });
    }

    // 감정별 카운트
    const emotionCounts = [0, 0, 0, 0, 0];
    diaries.forEach(d => {
      if (d.emotion >= 0 && d.emotion <= 4) {
        emotionCounts[d.emotion]++;
      }
    });

    // 월별 카운트
    const monthlyCount = Array(12).fill(0);
    diaries.forEach(d => {
      const month = new Date(d.date).getMonth();
      monthlyCount[month]++;
    });

    // 연속 기록 계산
    const dates = diaries.map(d => new Date(d.date).toISOString().split('T')[0]);
    const uniqueDates = [...new Set(dates)].sort();
    
    let longestStreak = 0;
    let currentStreak = 0;
    let tempStreak = 1;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split('T')[0];

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currDate = new Date(uniqueDates[i]);
      const diffDays = Math.round((currDate - prevDate) / 86400000);

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // 현재 연속 기록 (오늘 또는 어제부터 역산)
    const lastDate = uniqueDates[uniqueDates.length - 1];
    if (lastDate === todayStr || lastDate === yesterdayStr) {
      currentStreak = 1;
      for (let i = uniqueDates.length - 2; i >= 0; i--) {
        const currDate = new Date(uniqueDates[i + 1]);
        const prevDate = new Date(uniqueDates[i]);
        const diffDays = Math.round((currDate - prevDate) / 86400000);
        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // 일수를 주/월 단위로 변환
    const daysToUnits = (days) => ({
      days,
      weeks: Math.floor(days / 7),
      months: Math.floor(days / 30)
    });

    // 총 텍스트 길이 계산
    let totalTextLength = 0;
    diaries.forEach(diary => {
      try {
        const decryptedText = decrypt(diary.text, process.env.DATA_SECRET_KEY);
        totalTextLength += decryptedText.length;
      } catch (e) {
        console.error('Failed to decrypt text:', e);
      }
    });

    // 월별 감정 통계 (1~12월)
    const monthlyEmotionCounts = Array(12).fill(null).map(() => [0, 0, 0, 0, 0]);
    diaries.forEach(d => {
      const diaryDate = new Date(d.date);
      const month = diaryDate.getMonth();
      if (d.emotion >= 0 && d.emotion <= 4) {
        monthlyEmotionCounts[month][d.emotion]++;
      }
    });

    return res.status(200).json({
      totalCount: diaries.length,
      emotionCounts,
      currentStreak: daysToUnits(currentStreak),
      longestStreak: daysToUnits(longestStreak),
      monthlyCount,
      totalTextLength,
      monthlyEmotionCounts
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
});

// 연도별 습관 통계 조회
router.get("/habit/:year", tokenCheck, async (req, res) => {
  console.log('----- method : get, url : /stats/habit/:year -----');
  const email = req.currentUserEmail;
  const year = parseInt(req.params.year);

  try {
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31, 23, 59, 59);

    // 사용자의 총 습관 개수 조회
    const totalHabits = await Habit.count({ where: { email } });

    // 해당 연도의 모든 일기와 연결된 습관 조회
    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [yearStart, yearEnd] }
      },
      attributes: ['id', 'visible', 'date'],
      include: [{
        model: Habit,
        attributes: ['id', 'name', 'priority'],
        through: { attributes: [] }
      }]
    });

    // 습관별 완료 횟수 집계
    const habitCounts = {};
    let totalHabitCompletions = 0;
    let visibleDiariesWithHabits = 0;
    let totalHabitsInDiariesWithHabits = 0; // 습관이 있는 일기들의 습관 개수 합
    const habitCompletionDates = new Set(); // 습관 완료한 고유 날짜 수

    diaries.forEach(diary => {
      if (diary.Habits && diary.Habits.length > 0) {
        const habitCount = diary.Habits.length; // 이 일기의 습관 개수
        
        if (diary.visible) {
          visibleDiariesWithHabits++;
          totalHabitsInDiariesWithHabits += habitCount; // 습관이 있는 visible 일기들의 습관 개수 합
        }
        const diaryDate = new Date(diary.date).toISOString().split('T')[0];
        habitCompletionDates.add(diaryDate);
        
        diary.Habits.forEach(habit => {
          totalHabitCompletions++;
          if (!habitCounts[habit.id]) {
            habitCounts[habit.id] = { id: habit.id, name: habit.name, priority: habit.priority, count: 0 };
          }
          habitCounts[habit.id].count++;
        });
      }
    });

    // 상위/하위 5개 습관
    const sortedHabits = Object.values(habitCounts).sort((a, b) => b.count - a.count);
    const topHabits = sortedHabits.slice(0, 5);
    const bottomHabits = sortedHabits.length > 5 
      ? sortedHabits.slice(-5).reverse() 
      : sortedHabits.slice().reverse();

    // 통계 계산
    const visibleDiaries = diaries.filter(d => d.visible).length;
    // 습관이 있는 일기들의 습관 개수 합을 습관이 있는 일기 개수로 나눔
    const avgHabitsPerDiaryWithHabits = visibleDiariesWithHabits > 0 
      ? (totalHabitsInDiariesWithHabits / visibleDiariesWithHabits).toFixed(1)
      : 0;
    const avgHabitsPerCompletionDay = habitCompletionDates.size > 0
      ? (totalHabitCompletions / habitCompletionDates.size).toFixed(1)
      : 0;

    return res.status(200).json({
      topHabits,
      bottomHabits,
      totalCompletions: totalHabitCompletions,
      diariesWithHabits: visibleDiariesWithHabits,
      totalDiaries: visibleDiaries,
      habitCompletionDays: habitCompletionDates.size,
      avgHabitsPerDiaryWithHabits: parseFloat(avgHabitsPerDiaryWithHabits),
      avgHabitsPerCompletionDay: parseFloat(avgHabitsPerCompletionDay),
      totalHabits
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
});

module.exports = router;
