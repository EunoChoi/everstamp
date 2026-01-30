// 외부 패키지
const CryptoJS = require('crypto-js');

//암호화 처리
const encrypt = (content, secretKey) => {
  return CryptoJS.AES.encrypt(content, secretKey).toString();
};

module.exports = encrypt;