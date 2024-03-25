const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  desc: String,
  email: String,
});

// 密码哈希化中间件
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// 验证密码方法
userSchema.methods.checkPassword = function (attempt) {
  let user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(attempt, user.password, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model('User', userSchema);