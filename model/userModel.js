const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//tag 用户Model结构
const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  desc: String,
  email: String,
  favoriteSongs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
});

//tag 注册成功对用户密码进行加密（数据库存的用户密码是加密后的，这样即使数据库被黑客攻破了也无法获取密码）
userSchema.pre('save', function (next) {
  const user = this;
  user.id = user._id;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

//tag 验证密码（将用户输入的密码进行hash后与数据库中的hash进行比对）
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