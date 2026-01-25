const express = require("express");
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
const tokenCheck = require("../middleware/tokenCheck.js");

const sequelize = db.sequelize;
const User = db.User;
const Diary = db.Diary;
const Habit = db.Habit;
const Image = db.Image;
const router = express.Router();



//회원 가입 확인 및 가입 + 로그인
router.post("/register", async (req, res) => {
  console.log('----- method : post, url :  /user/register -----');
  const { email, provider, profilePic } = req.body;

  try {
    const foundUser = await User.findOne({ where: { email } });

    // 토큰 발급
    const accessToken = jwt.sign(
      { email, provider },
      process.env.ACCESS_KEY,
      { expiresIn: '5m', issuer: 'everstamp' }
    );
    const refreshToken = jwt.sign(
      { email, provider }, // email, provider 포함 (보안 개선)
      process.env.REFRECH_KEY,
      { expiresIn: '7d', issuer: 'everstamp' }
    );

    if (foundUser) {
      // provider 일치 확인
      if (foundUser.provider === provider) {
        return res.status(200).json({
          result: true,
          message: '로그인 성공',
          accessToken,
          refreshToken
        });
      }
      return res.status(200).json({
        result: false,
        message: '이미 다른 SNS로 가입된 이메일입니다.'
      });
    }

    // 신규 유저 생성
    await User.create({
      email,
      provider,
      themeColor: '#83c6b6', // 기본 테마색 (녹색)
      profilePic
    });

    return res.status(201).json({
      result: true,
      message: '회원가입 완료',
      accessToken,
      refreshToken
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ result: false, message: '서버 에러가 발생했습니다.' });
  }
})
//유저 정보 불러오기
router.get("/current", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /user/current -----');
  const email = req.currentUserEmail;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json('유저를 찾을 수 없습니다.');
    }
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})

//유저 테마 색상 변경
router.patch("/theme", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url :  /user/theme -----');
  const email = req.currentUserEmail;
  const { themeColor } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json('유저를 찾을 수 없습니다.');
    }

    await user.update({ themeColor });
    return res.status(200).json('테마 색상이 변경되었습니다.');
  } catch (e) {
    console.error(e);
    return res.status(500).json('서버 에러가 발생했습니다.');
  }
})
//로그아웃
router.get("/logout", (req, res) => {
  console.log('----- method : get, url :  /user/logout -----');
  res.cookie("accessToken", "", {
    secure: false,
    httpOnly: true,
    domain: `${process.env.DOMAIN}`,
  })
  res.cookie("refreshToken", "", {
    secure: false,
    httpOnly: true,
    domain: `${process.env.DOMAIN}`,
  })
  res.status(200).json("로그아웃 완료");
})

//회원탈퇴
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

      // 유저의 다이어리 ID 목록 조회
      const diaries = await Diary.findAll({
        where: { email },
        attributes: ['id'],
        transaction: t
      });
      const diaryIds = diaries.map(d => d.id);

      // 이미지 삭제 (다이어리에 연결된)
      if (diaryIds.length > 0) {
        await Image.destroy({
          where: { diaryId: diaryIds },
          transaction: t
        });
      }

      // 다이어리 삭제
      await Diary.destroy({
        where: { email },
        transaction: t
      });

      // 습관 삭제
      await Habit.destroy({
        where: { email },
        transaction: t
      });

      // 유저 삭제
      await User.destroy({
        where: { email },
        transaction: t
      });
    });

    console.log('탈퇴 처리 완료');
    return res.status(200).json('탈퇴가 완료되었습니다.');
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message || '탈퇴 처리 중 오류가 발생했습니다.');
  }
});

module.exports = router;