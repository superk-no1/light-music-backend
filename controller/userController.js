const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

//tag 用户注册
exports.userRegister = async (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//tag 用户登录，成功后给用户返回token
exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json('User not found.');
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json('Password incorrect.');
    }
    const token = jwt.sign({ id: user._id }, 'my_secret_key', { expiresIn: '12h' });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json('server error.');
  }
};

//tag 查询用户信息
exports.getMeInfo = async (req, res) => {
  let decodedToken = jwt.decode(req.headers['token'], {complete: true});
  let userId = decodedToken.payload.id;
  const user = await User.findById(userId);
  res.json(user);
}

//tag user增删改查...
exports.getAllUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'User created!' });
};

exports.updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'User updated!' });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted!' });
};