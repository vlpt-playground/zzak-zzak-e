import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ({ right }) => {
  return (
    <header className="Header">
      <Link to="/" className="title">
        짹짹이
      </Link>
      <div className="right">{right}</div>
    </header>
  );
};

export default Header;
