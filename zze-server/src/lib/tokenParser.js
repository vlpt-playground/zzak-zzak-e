const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async (ctx, next) => {
  // 쿠키 혹은 헤더에서 토큰 파싱
  let token = ctx.cookies.get('token');
  if (!token) {
    const { authorization } = ctx.headers;
    if (!authorization) {
      return next();
    }
    const sp = authorization.split(' ');
    const authToken = sp[1];
    if (!authToken) {
      return next();
    }
    token = authToken;
  }

  const verification = new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  try {
    const decoded = await verification;
    ctx.state.user = decoded.user;
    ctx.state.tokenExp = decoded.exp;
  } catch (e) {
    return next();
  }

  return next();
};
