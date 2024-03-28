const jwt = require('jsonwebtoken');

//todo 放进配置文件
const secret = 'my_secret_key';

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