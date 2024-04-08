const jwt = require('jsonwebtoken');

//todo 放进配置文件
const secret = 'my_secret_key';

//tag 调用接口前先验证http request header中的token，确保用户目前是登录状态
const verifyToken = function(token) {
    return new Promise((resolve, reject) => {
      if (!token) {
        reject('Token not provided');
      } else {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            reject('Unable to decode token');
          } else {
            resolve(decoded);
          }
        });
      }
    });
  };
  
  const verify = async (req, res, next) => {
      const token = req.headers['token'];
      try {
        await verifyToken(token);
        next();
      } catch(err) {
        console.log(err);
        res.status(403).json({ error: 'Token validation failed', details: err });
      }
  };
  
  module.exports = verify;