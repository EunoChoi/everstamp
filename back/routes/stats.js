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
    // 날짜를 로컬 시간 기준 yyyy-MM-dd 형식으로 변환 (UTC 변환 방지)
    const formatDateToLocal = (date) => {
      const d = date instanceof Date ? date : new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const dates = diaries.map(d => formatDateToLocal(d.date));
    const uniqueDates = [...new Set(dates)].sort();
    
    let longestStreak = 0;
    let currentStreak = 0;
    let tempStreak = 1;
    
    // 오늘 날짜를 로컬 시간 기준으로 계산
    const today = new Date();
    const todayStr = formatDateToLocal(today);
    
    // 어제 날짜 계산
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDateToLocal(yesterday);

    // 최장 연속 기록 및 현재 연속 기록 계산 (전체 기간 조회 필요)
    // 모든 일기 조회 (연도 제한 없음)
    const allDiaries = await Diary.findAll({
      where: {
        email,
        visible: true
      },
      attributes: ['date'],
      raw: true
    });

    // 날짜를 로컬 시간 기준 YYYY-MM-DD 형식으로 변환하고 중복 제거
    const allDatesSet = new Set();
    allDiaries.forEach(diary => {
      const dateStr = formatDateToLocal(diary.date);
      allDatesSet.add(dateStr);
    });
    const allDates = Array.from(allDatesSet).sort();
    
    // 최장 연속 기록 계산 (전체 기간, 오늘 제외)
    // 오늘을 제외한 날짜들로만 계산
    const datesExcludingToday = allDates.filter(date => date !== todayStr);
    
    if (datesExcludingToday.length > 0) {
      tempStreak = 1;
      for (let i = 1; i < datesExcludingToday.length; i++) {
        const prevDateStr = datesExcludingToday[i - 1];
        const currDateStr = datesExcludingToday[i];
        
        const prevDate = new Date(prevDateStr + 'T00:00:00');
        const currDate = new Date(currDateStr + 'T00:00:00');
        const diffMs = currDate.getTime() - prevDate.getTime();
        const diffDays = diffMs / 86400000;

        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }
    
    // 현재 연속 기록 계산 (어제 기준)
    // 어제 일기가 있는지 확인
    const hasYesterday = allDates.includes(yesterdayStr);
    
    if (hasYesterday) {
      // 어제부터 역산하여 연속 기록 계산
      const yesterdayIndex = allDates.indexOf(yesterdayStr);
      
      if (yesterdayIndex !== -1) {
        currentStreak = 1;
        // 역순으로 연속된 날짜 확인 (어제부터 과거로)
        for (let i = yesterdayIndex - 1; i >= 0; i--) {
          const currentDateStr = allDates[i + 1]; // 더 최근 날짜
          const prevDateStr = allDates[i];        // 더 과거 날짜
          
          // 날짜 문자열을 Date 객체로 변환하여 차이 계산
          const currentDate = new Date(currentDateStr + 'T00:00:00');
          const prevDate = new Date(prevDateStr + 'T00:00:00');
          
          // 하루 차이인지 확인 (86400000ms = 1일)
          const diffMs = currentDate.getTime() - prevDate.getTime();
          const diffDays = diffMs / 86400000;
          
          if (diffDays === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }
    // 어제 일기가 없으면 currentStreak는 0으로 유지됨

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

    // 사용자의 모든 습관 조회 (count가 0인 습관도 포함하기 위해)
    const allHabits = await Habit.findAll({
      where: { email },
      attributes: ['id', 'name', 'priority']
    });

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

    // 모든 습관을 count: 0으로 초기화
    const habitCounts = {};
    allHabits.forEach(habit => {
      habitCounts[habit.id] = { id: habit.id, name: habit.name, priority: habit.priority, count: 0 };
    });

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
          if (habitCounts[habit.id]) {
            habitCounts[habit.id].count++;
          }
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
