// 외부 패키지
const { endOfYear, startOfYear } = require("date-fns");

// year 숫자 -> 해당 연도 시작/끝 Date. 반환: { yearStart, yearEnd }
function getYearRange(year) {
  const d = new Date(year, 0, 1);
  return {
    yearStart: startOfYear(d),
    yearEnd: endOfYear(d)
  };
}

// dateString 'yyyy-MM-dd' -> Date. 반환: Date
function parseDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    throw new Error('Invalid date string');
  }

  const [year, month, day] = dateString.split('-').map(Number);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date format. Expected yyyy-MM-dd');
  }

  return new Date(year, month - 1, day);
}

// monthString 'yyyy-MM' -> 해당 월 1일 Date. 반환: Date
function parseMonth(monthString) {
  if (!monthString || typeof monthString !== 'string') {
    throw new Error('Invalid month string');
  }

  const [year, month] = monthString.split('-').map(Number);

  if (isNaN(year) || isNaN(month)) {
    throw new Error('Invalid month format. Expected yyyy-MM');
  }

  return new Date(year, month - 1, 1);
}

// yearString 'yyyy' -> 연도 숫자. 반환: number
function parseYear(yearString) {
  if (!yearString || typeof yearString !== 'string') {
    throw new Error('Invalid year string');
  }

  const year = Number(yearString);

  if (isNaN(year)) {
    throw new Error('Invalid year format. Expected yyyy');
  }

  return year;
}

// date (Date 또는 파싱 가능한 값) -> 'yyyy-MM-dd' 문자열. 서버 타임존 기준
function dateToYMD(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

module.exports = { getYearRange, parseDate, parseMonth, parseYear, dateToYMD };
