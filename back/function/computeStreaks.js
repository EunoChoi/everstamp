// 프로젝트 내부
const db = require("../models/index.js");
const { dateToYMD } = require("./parseDate.js");

// 연속 기록(현재/최장) 일 단위로 계산. 테스트 시 mock db 쓰려면 인자로 db 받도록 바꿔야 함
async function computeStreaks(email) {
  const Diary = db.Diary;

  const allDiaries = await Diary.findAll({
    where: { email, visible: true },
    attributes: ['date'],
    raw: true
  });

  const allDatesSet = new Set();
  allDiaries.forEach(diary => {
    allDatesSet.add(dateToYMD(diary.date));
  });
  const allDates = Array.from(allDatesSet).sort();

  const today = new Date();
  const todayStr = dateToYMD(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = dateToYMD(yesterday);

  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 1;

  const datesExcludingToday = allDates.filter(date => date !== todayStr);
  if (datesExcludingToday.length > 0) {
    tempStreak = 1;
    for (let i = 1; i < datesExcludingToday.length; i++) {
      const prevDateStr = datesExcludingToday[i - 1];
      const currDateStr = datesExcludingToday[i];
      const prevDate = new Date(prevDateStr + 'T00:00:00');
      const currDate = new Date(currDateStr + 'T00:00:00');
      const diffDays = (currDate.getTime() - prevDate.getTime()) / 86400000;
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  const hasYesterday = allDates.includes(yesterdayStr);
  if (hasYesterday) {
    const yesterdayIndex = allDates.indexOf(yesterdayStr);
    if (yesterdayIndex !== -1) {
      currentStreak = 1;
      for (let i = yesterdayIndex - 1; i >= 0; i--) {
        const currentDateStr = allDates[i + 1];
        const prevDateStr = allDates[i];
        const currentDate = new Date(currentDateStr + 'T00:00:00');
        const prevDate = new Date(prevDateStr + 'T00:00:00');
        const diffDays = (currentDate.getTime() - prevDate.getTime()) / 86400000;
        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  return { currentStreak, longestStreak };
}

// 캐시 쓰거나 계산해서 User에 저장 후 반환. forceRecompute true면 무조건 재계산. 반환: { currentStreak, longestStreak } 또는 null
async function getOrComputeStreak(email, options = {}) {
  const User = db.User;
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const forceRecompute = options.forceRecompute === true;
  const needBackfill = forceRecompute || user.currentStreakDays == null || user.longestStreakDays == null;
  let currentStreak = user.currentStreakDays ?? 0;
  let longestStreak = user.longestStreakDays ?? 0;

  if (needBackfill) {
    const computed = await computeStreaks(email);
    currentStreak = computed.currentStreak;
    longestStreak = computed.longestStreak;
    await user.update({ currentStreakDays: currentStreak, longestStreakDays: longestStreak });
  }
  return { currentStreak, longestStreak };
}

module.exports = { getOrComputeStreak };
