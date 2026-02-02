// 외부 패키지
const jwt = require("jsonwebtoken");

// 프로젝트 내부
const { sendError } = require('../utils/errorResponse.js');

const tokenCheck = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return sendError(res, 401, '로그인이 필요합니다.');
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_KEY);
    req.currentUserEmail = decoded.email;
    req.currentUserProvider = decoded.provider;
    return next();
  } catch (e) {
    console.log('accessToken 검증 실패:', e.name);
    return sendError(res, 401, '로그인이 필요합니다.');
  }
};

module.exports = tokenCheck;