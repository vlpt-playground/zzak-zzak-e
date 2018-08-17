import React from 'react';
import './TweetWrite.scss';

const TweetWrite = () => {
  return (
    <div className="TweetWrite">
      <textarea placeholder="무슨 생각을 하고 계신가요?" />
      <div className="wrapper">
        <div className="inputs">
          <input placeholder="이름" />
          <input type="password" placeholder="비밀번호" />
        </div>
        <button>작성</button>
      </div>
    </div>
  );
};

export default TweetWrite;  