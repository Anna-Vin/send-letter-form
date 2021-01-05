import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span className="circle"></span>
        <span className="rectangle"></span>
        <span className="circle"></span>
        <span className="rectangle rectangle_angle"></span>
      </div>
    </div>
  )
}

export default Header;
