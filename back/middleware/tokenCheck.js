const jwt = require("jsonwebtoken");

const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const tokenCheck = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    console.log('accessToken : ', accessToken);


    const user = jwt.verify(accessToken, process.env.ACCESS_KEY);

    req.currentUserEmail = user.email;
    req.currentUserProvider = user.provider;


    console.log('accessToken 검증 완료')

    return next();
  } catch (error) {


    console.log(error.name); //accessToken 검증 실패
    console.log('accessToken 검증 실패')
    try {


      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      jwt.verify(refreshToken, process.env.REFRECH_KEY); //refreshToken 검증 진행
      console.log('refreshToken 재검증 완료')


      const email = parseJwt(accessToken)?.email;
      const provider = parseJwt(accessToken)?.provider;
      console.log(email, provider);

      const newAccessToken = jwt.sign({ //accessToken 재밝브
        email,
        provider,
      }, process.env.ACCESS_KEY, {
        expiresIn: '1m',
        issuer: 'everstamp',
      });
      res.cookie("accessToken", newAccessToken, {
        secure: false,
        httpOnly: true,
      });

      req.currentUserEmail = email;
      req.currentUserProvider = provider;

      return next();
    } catch (error) {
      console.log(req);
      console.log(req.cookies);
      console.log(error.name);
      res.status(400).send('로그인이 필요합니다.'); //refresh token 검증도 실패한 경우
    }
  }
};

module.exports = tokenCheck;