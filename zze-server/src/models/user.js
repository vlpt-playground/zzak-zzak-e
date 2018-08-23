const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const User = new Schema({
  username: String,
  passwordHash: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// static 함수
// https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// this = User 모델
User.statics.register = async function register({ username, password }) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new this({
      username,
      passwordHash: hash,
    });
    await user.save();
    return user;
  } catch (e) {
    throw e;
  }
};

// methods 함수
// https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// this = user 인스턴스
User.methods.checkPassword = async function checkPassword(password) {
  const { passwordHash } = this;
  try {
    const match = await bcrypt.compare(password, passwordHash);
    return match;
  } catch (e) {
    throw e;
  }
};

User.methods.serialize = function serialize() {
  const data = this.toJSON();
  delete data.passwordHash;
  return data;
};

User.methods.generateToken = function generateToken() {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) throw new Error('JWT_SECRET is empty');
  const p = new Promise((resolve, reject) => {
    const { _id, username } = this;
    jwt.sign(
      {
        user: {
          _id,
          username,
        },
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
  return p;
};

module.exports = mongoose.model('User', User);
