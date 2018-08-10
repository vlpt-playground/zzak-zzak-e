const mongoose = require('mongoose');

const { Schema } = mongoose;

// Tweet 라는 스키마 생성
const Tweet = new Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  writer: {
    name: String,
    anonymous: Boolean,
    ipHash: String,
    passwordHash: String,
  },
  tags: [String], // 문자열 배열
});

// 비밀번호 숨겨줌
Tweet.methods.serialize = function serialize() {
  const data = this.toJSON();
  delete data.writer.passwordHash;
  return data;
};

// 모델로 만들기
module.exports = mongoose.model('Tweet', Tweet);
