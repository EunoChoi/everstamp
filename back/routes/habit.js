
const express = require("express");
const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

const router = express.Router();

//model load
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;

//생성이랑 체크, 언체크 완전히 다른 요청임!!!
//add, edit, delete habit
//add habit
router.post("/", async (req, res) => {
  try {
    //1. 해당 날짜의 다이어리를 포함하는 해빗 검색
    //2. 없으면 다이어리 생성 visible false
    //3. 검색 or 생성한 다이어리에 습관 관계 부여
    //습관 생성
    //습관이 없는 경우에 생성하고 관계 설정
    //이미 존재한다면 그냥 관계 설정 여부만 관여

  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("");
})
//edit diary
router.patch("/", async (req, res) => {
  try {

  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("");
})
router.delete("/", async (req, res) => {
  try {

  } catch (e) {
    console.error(e);
  }
  return res.status(200).json("");
})



module.exports = router;