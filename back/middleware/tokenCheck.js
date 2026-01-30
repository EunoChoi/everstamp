// 외부 패키지
const jwt = require("jsonwebtoken");

// 프로젝트 내부
const { sendError } = require('../utils/errorResponse.js');

const tokenCheck = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // accessToken 있으면 검증 시도
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_KEY);
      req.currentUserEmail = decoded.email;
      req.currentUserProvider = decoded.provider;
      return next();
    } catch (accessError) {
      console.log('accessToken 검증 실패:', accessError.name);
    }
  }

  // accessToken 없거나 만료 → refreshToken으로 재발급 시도
  try {
    if (!refreshToken) {
      return sendError(res, 401, '로그인이 필요합니다.');
    }

    // refreshToken에서 사용자 정보 추출 (보안 개선)
    const decoded = jwt.verify(refreshToken, process.env.REFRECH_KEY);
    const { email, provider } = decoded;

    if (!email || !provider) {
      return sendError(res, 401, '유효하지 않은 토큰입니다.');
    }

    // 새 accessToken 발급
    const newAccessToken = jwt.sign(
      { email, provider },
      process.env.ACCESS_KEY,
      { expiresIn: '5m', issuer: 'everstamp' }
    );

    // 쿠키 설정 (프로덕션에서는 secure: true 권장)
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('accessToken', newAccessToken, {
      secure: isProduction,
      httpOnly: true,
      domain: process.env.DOMAIN,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? 'strict' : 'lax'
    });

    req.currentUserEmail = email;
    req.currentUserProvider = provider;
    return next();
  } catch (refreshError) {
    console.log('refreshToken 검증 실패:', refreshError.name);
    return sendError(res, 401, '로그인이 필요합니다.');
  }
};

module.exports = tokenCheck;