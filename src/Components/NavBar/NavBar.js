import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

const NavBar = () => {
  const [isDrawerOpen, openDrawer] = useState(false);
  return (
    <header className="main-header">
      <div className="nav-bar">
        <div className="logo mr-3">
          <i className="icon-alt icon-lotus mr-2" />
          <p className="m-0">Intwetion</p>
        </div>
        <i
          onClick={() => openDrawer(!isDrawerOpen)}
          className={`icon icon-${isDrawerOpen ? 'close' : 'menu'} d-lg-none`}
          role="button"
          tabIndex="-1"
        />
        <nav className={`main-nav ${isDrawerOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <a href="/">Présentation</a>
            </li>
            <li>
              <a href="/">Libérer l'intuition</a>
            </li>
            <li>
              <a href="/">Cartes de vie</a>
            </li>
            <li>
              <a href="/">Bien-être et musique</a>
            </li>
            <li>
              <i className="icon-alt icon-more-horiz" />
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <span className="avatar" />
            <i className="icon-unfold-more" />
          </div>
        </nav>
      </div>
    </header>
  );
};

NavBar.propTypes = {
  title: PropTypes.string,
};

export default NavBar;
