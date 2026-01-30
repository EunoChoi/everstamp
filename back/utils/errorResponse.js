/**
 * API 에러 응답 형식 통일. 클라이언트는 항상 { error: string } 으로 파싱 가능.
 * @param {object} res - Express res
 * @param {number} status - HTTP status
 * @param {string} message - 에러 메시지
 */
function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

module.exports = { sendError };
