// 외부 패키지
const express = require("express");
const jwt = require("jsonwebtoken");

// 프로젝트 내부
const db = require("../models/index.js");
const tokenCheck = require("../middleware/tokenCheck.js");
const { sendError } = require("../utils/errorResponse.js");

const sequelize = db.sequelize;
const router = express.Router();
const User = db.User;
const Diary = db.Diary;
const Habit = db.Habit;
const Image = db.Image;

/**
 * 용도: SNS 로그인/회원가입. 같은 provider면 로그인, 없으면 회원가입 후 토큰 발급.
 * 요청: body { email, provider }
 * 반환: 200/201 { result, message, accessToken, refreshToken } 또는 409 { result: false, message } (다른 SNS 가입)
 */
router.post("/auth", async (req, res) => {
  console.log('----- method : post, url :  /user/auth -----');
  const { email, provider } = req.body;

  if (!email || typeof email !== 'string' || !provider || typeof provider !== 'string') {
    return sendError(res, 400, 'email과 provider는 필수입니다.');
  }

  try {
    const foundUser = await User.findOne({ where: { email } });
    const accessToken = jwt.sign(
      { email, provider },
      process.env.ACCESS_KEY,
      { expiresIn: '5m', issuer: 'took' }
    );
    const refreshToken = jwt.sign(
      { email, provider },
      process.env.REFRECH_KEY,
      { expiresIn: '7d', issuer: 'took' }
    );

    if (foundUser) {
      if (foundUser.provider === provider) {
        return res.status(200).json({
          result: true,
          message: '로그인 성공',
          accessToken,
          refreshToken
        });
      }
      return res.status(409).json({
        result: false,
        message: '이미 다른 SNS로 가입된 이메일입니다.'
      });
    }

    await User.create({
      email,
      provider
    });

    return res.status(201).json({
      result: true,
      message: '회원가입 완료',
      accessToken,
      refreshToken
    });
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
});

/**
 * 용도: refresh 토큰으로 새 access 토큰 발급.
 * 요청: Cookie refreshToken 또는 body { refreshToken }
 * 반환: 200 { accessToken } / 401
 */
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies?.refreshToken ?? req.body?.refreshToken;
  if (!refreshToken) {
    return sendError(res, 401, '로그인이 필요합니다.');
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRECH_KEY);
    const { email, provider } = decoded;
    if (!email || !provider) {
      return sendError(res, 401, '유효하지 않은 토큰입니다.');
    }
    const accessToken = jwt.sign(
      { email, provider },
      process.env.ACCESS_KEY,
      { expiresIn: '5m', issuer: 'took' }
    );
    return res.status(200).json({ accessToken });
  } catch (e) {
    console.log('refreshToken 검증 실패:', e.name);
    return sendError(res, 401, '로그인이 필요합니다.');
  }
});

/**
 * 용도: 로그인한 유저 정보 조회.
 * 요청: 쿠키 accessToken (tokenCheck)
 * 반환: 200 User 객체 / 404 유저 없음
 */
router.get("/current", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /user/current -----');
  const email = req.currentUserEmail;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendError(res, 404, '유저를 찾을 수 없습니다.');
    }
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 로그아웃. 쿠키의 accessToken, refreshToken 비움.
 * 요청: 없음
 * 반환: 200 "로그아웃 완료"
 */
router.get("/logout", (req, res) => {
  console.log('----- method : get, url :  /user/logout -----');
  const baseDomain = `.${process.env.DOMAIN}`;
  res.cookie("accessToken", "", {
    httpOnly: true,
    domain: baseDomain,
    maxAge: 0,
    path: '/',
    secure: false
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    domain: baseDomain,
    maxAge: 0,
    path: '/api/auth/refresh',
    secure: false
  });
  res.status(200).json("로그아웃 완료");
})

/**
 * 용도: 회원 탈퇴. 해당 유저의 이미지·일기·습관·유저 레코드 전부 삭제.
 * 요청: 쿠키 accessToken (tokenCheck)
 * 반환: 200 "탈퇴가 완료되었습니다." / 404 유저 없음 / 400 에러 메시지
 */
router.delete("/", tokenCheck, async (req, res) => {
  console.log('----- method : delete, url :  /user -----');
  const email = req.currentUserEmail;

  try {
    await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!user) throw new Error('존재하지 않는 유저입니다.');

      const diaries = await Diary.findAll({
        where: { email },
        attributes: ['id'],
        transaction: t
      });
      const diaryIds = diaries.map(d => d.id);

      if (diaryIds.length > 0) {
        await Image.destroy({
          where: { diaryId: diaryIds },
          transaction: t
        });
      }

      await Diary.destroy({
        where: { email },
        transaction: t
      });
      await Habit.destroy({
        where: { email },
        transaction: t
      });
      await User.destroy({
        where: { email },
        transaction: t
      });
    });

    console.log('탈퇴 처리 완료');
    return res.status(200).json('탈퇴가 완료되었습니다.');
  } catch (e) {
    console.error(e);
    const isNotFound = e.message === '존재하지 않는 유저입니다.';
    return sendError(res, isNotFound ? 404 : 400, e.message || '탈퇴 처리 중 오류가 발생했습니다.');
  }
});

module.exports = router;