import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

const NavBar = ({ title }) => {
  const [isDrawerOpen, openDrawer] = useState(false);

  return (
    <header className="main-header">
      <div className="nav-bar">
        <i className="icon icon-arrow-back" />
        <p className="title m-0">{title}</p>
        <i
          onClick={() => openDrawer(!isDrawerOpen)}
          className={`icon icon-${isDrawerOpen ? 'close' : 'menu'}`}
          role="button"
          tabIndex="-1"
        />
      </div>
      <nav className={`main-nav ${isDrawerOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/">Team</a></li>
          <li><a href="/">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  title: PropTypes.string,
};

export default NavBar;
