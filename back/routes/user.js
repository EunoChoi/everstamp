const express = require("express");
const bcrypt = require("bcrypt")
const db = require("../models/index.js");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const tokenCheck = require("../middleware/tokenCheck.js");


const User = db.User;
const Diary = db.Diary;
const Habit = db.Habit;
const router = express.Router();



//회원 가입 확인 및 가입 + 로그인
router.post("/register", async (req, res) => {
  console.log('----- method : post, url :  /user/register -----');

  try {
    const email = req.body.email;
    const provider = req.body.provider;
    const themeColor = req.body.themeColor;
    const profilePic = req.body.profilePic;

    const foundUser = await User.findOne({
      where: { email }
    });

    //Token 발급
    const accessToken = jwt.sign({
      email,
      provider,
    }, process.env.ACCESS_KEY, {
      expiresIn: '5m',
      issuer: 'everstamp',
    });
    const refreshToken = jwt.sign({
      type: "refreshToken",
      expiresIn: "720m"
    }, process.env.REFRECH_KEY, {
      expiresIn: '720m',
      issuer: 'everstamp',
    })


    if (foundUser) {
      console.log('가입 되어있는 회원 확인');

      //copare provider
      if (foundUser.provider === provider) {
        console.log('provider 일치, 로그인 진행');
        return res.status(200).json({ result: true, message: 'provider 일치, 로그인 진행', accessToken, refreshToken });
      }
      else {
        console.log('provider 불일치, 로그인 중단');
        return res.status(200).json({ result: false, message: '이미 등록된 이메일입니다. 가입된 SNS 계정으로 로그인해 주세요.' });
      }
    }
    else {
      console.log('신규 유저, 회원 가입 진행');
      const newUser = await User.create(
        {
          email,
          provider,
          themeColor: '#9797CB',
          profilePic
        }
      );
      if (newUser) {
        console.log('회원가입 승인')
        return res.status(200).json({ result: true, message: '회원 가입 후 로그인 진행', accessToken, refreshToken });
      }
      else return res.status(400).json({ result: false, message: '회원가입 과정 중 에러 발생' });
    }
  }
  catch (error) {
    console.error(error);
  };
})
//유저 정보 불러오기
router.get("/current", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /user/current -----');

  const email = req.currentUserEmail;
  try {
    const currentUser = await User.findOne({
      where: { email: email },
    });
    if (currentUser) return res.status(200).json(currentUser);
    else return res.status(400).json('유저 정보를 불러오지 못하였습니다.');
  }
  catch (error) {
    console.log(error);
  }
})

//유저 테마 색상 변경
router.patch("/theme", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url :  /user/theme -----');
  const email = req.currentUserEmail;
  const { themeColor } = req.body;

  try {
    let user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) return res.status(404).json('유저 정보가 없습니다.');

    user = await User.update({
      themeColor,
    }, {
      where: { email }
    });
    if (user) return res.status(200).json('theme color changed')
    else return res.status(400).json('theme color update error');
  } catch (err) {
    console.error(err);
  }
})
//로그아웃
router.get("/logout", (req, res) => {
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
    const isUserExist = await User.findOne({
      where: { email }
    });
    if (isUserExist) {
      //유저 일기 삭제
      await Diary.destroy({
        where: { email }
      });
      console.log("탈퇴 유저 일기 모두 삭제 완료");
      //유저 습관 삭제
      await Habit.destroy({
        where: { email }
      });
      console.log("탈퇴 유저 습관 모두 삭제 완료");

      //유저 삭제 처리
      await User.destroy({
        where: { email }
      });
      console.log("탈퇴 처리 완료");

      return res.status(200).json("탈퇴가 완료되었습니다.");
    }
    else return res.status(401).json("존재하지 않은 유저입니다.");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;