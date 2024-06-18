const express = require("express");
const bcrypt = require("bcrypt")
const db = require("../models/index.js");
const nodemailer = require("nodemailer");


const User = db.User;
const Post = db.Post;
const router = express.Router();


//회원 가입 확인 및 가입
router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const provider = req.body.provider;
    const themeColor = req.body.themeColor;
    const profilePic = req.body.profilePic;

    const foundUser = await User.findOne({
      where: { email }
    });


    let result = ''
    if (foundUser) {
      console.log('가입 되어있는 회원 확인');

      //copare provider
      if (foundUser.provider === provider) {
        console.log('provider 일치, 로그인 진행');
        return res.status(200).json({ result: 0 });
      }
      else {
        console.log('provider 불일치, 로그인 중단');
        return res.status(200).json({ result: 1 });
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
        return res.status(200).json({ result: 0 });
      }
      else return res.status(400).json({ result: 2 });
    }
  }
  catch (error) {
    console.error(error);
  };
})
//유저 정보 불러오기
router.get("/current", async (req, res) => {
  try {
    const email = req.query.email;
    const currentUser = await User.findOne({
      where: { email: email },
    });
    if (currentUser) return res.status(200).json(currentUser);
  }
  catch (error) {
    console.log(error);
  }
  return res.status(400).json(false);
})
//회원탈퇴
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const isUserExist = await User.findOne({
      where: { id }
    });
    if (isUserExist) {
      //유저가 작성한 게시글도 모두 삭제
      await Post.destroy({
        where: { UserId: id }
      });
      console.log("탈퇴 유저가 작성한 게시글 모두 삭제 완료");

      //유저 삭제 처리
      await User.destroy({
        where: { id }
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