// 외부 패키지
const CryptoJS = require('crypto-js');

//암호화 처리
const decrypt = (content, secretKey) => {
  return CryptoJS.AES.decrypt(content, secretKey).toString(CryptoJS.enc.Utf8);
};

module.exports = decrypt;