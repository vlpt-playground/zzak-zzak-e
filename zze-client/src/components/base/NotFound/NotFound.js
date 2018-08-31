import React from 'react';
import './NotFound.scss';
import Button from '../../common/Button';

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>요청한 페이지를 찾을 수 없습니다.</h1>
      <Button to="/" active>
        홈으로
      </Button>
    </div>
  );
};

export default NotFound;
