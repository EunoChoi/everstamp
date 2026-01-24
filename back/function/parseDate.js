/**
 * yyyy-MM-dd 형식의 문자열을 Date 객체로 변환
 * @param {string} dateString - 'yyyy-MM-dd' 형식의 날짜 문자열
 * @returns {Date} 로컬 자정 기준 Date 객체
 */
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

/**
 * yyyy-MM 형식의 문자열을 Date 객체로 변환 (해당 월의 1일)
 * @param {string} monthString - 'yyyy-MM' 형식의 월 문자열
 * @returns {Date} 해당 월 1일의 Date 객체
 */
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

/**
 * yyyy 형식의 문자열에서 연도 추출
 * @param {string} yearString - 'yyyy' 형식의 연도 문자열
 * @returns {number} 연도
 */
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

module.exports = { parseDate, parseMonth, parseYear };
