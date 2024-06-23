const express = require("express");
const bcrypt = require("bcrypt")
const db = require("../models/index.js");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const tokenCheck = require("../middleware/tokenCheck.js");


const User = db.User;
const Post = db.Post;
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
      expiresIn: '1m',
      issuer: 'everstamp',
    });
    const refreshToken = jwt.sign({
      type: "refreshToken",
      expiresIn: "60m"
    }, process.env.REFRECH_KEY, {
      expiresIn: '60m',
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
          themeColor,
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
//회원탈퇴
router.delete("/", async (req, res) => {
  console.log('----- method : delete, url :  /user -----');
  const email = req.currentUserEmail;
  try {
    const isUserExist = await User.findOne({
      where: { email }
    });
    if (isUserExist) {
      //유저가 작성한 게시글도 모두 삭제
      await Post.destroy({
        where: { email }
      });
      console.log("탈퇴 유저가 작성한 게시글 모두 삭제 완료");

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