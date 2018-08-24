import React from 'react';
import { Link } from 'react-router-dom';

import './AuthTemplate.scss';

const AuthTemplate = ({ children, type }) => {
  return (
    <div className="AuthTemplate">
      <div className="title">{type === 'login' ? '로그인' : '회원가입'}</div>
      <div className="content">
        {children}
        {type === 'login' ? (
          <div className="info">
            계정이 없으신가요?
            <Link to="/register">회원가입</Link>
          </div>
        ) : (
          <div className="info">
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTemplate;
