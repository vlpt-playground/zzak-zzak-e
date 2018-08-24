import React from 'react';
import Button from 'components/common/Button';
import { Link } from 'react-router-dom';

import './UserStatus.scss';

const UserStatus = ({ username, onLogout }) => {
  return (
    <div className="UserStatus">
      <Link className="username" to={`/users/${username}`}>
        {username}
      </Link>
      <Button onClick={onLogout} outline>
        로그아웃
      </Button>
    </div>
  );
};

export default UserStatus;
