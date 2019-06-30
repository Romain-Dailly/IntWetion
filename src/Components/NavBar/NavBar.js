import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NavBar.css";

const NavBar = () => {
  const [isDrawerOpen, openDrawer] = useState(false);
  return (
    <header className="main-header">
      <div className="nav-bar">
        <a className="logo mr-3">
          <i className="icon-alt icon-lotus mr-2" />
          <p className="m-0">Intwetion</p>
        </a>
        <i
          onClick={() => openDrawer(!isDrawerOpen)}
          className={`icon icon-${isDrawerOpen ? "close" : "menu"} d-lg-none`}
          role="button"
          tabIndex="-1"
        />
        <nav className={`main-nav ${isDrawerOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="/">Présentation</a>
            </li>
            <li>
              <a href="/">Libérer l'intuition</a>
            </li>
            <li className="carte-de-vie d-flex justify-content-center">
              <a href="/">Cartes de vie</a>
              <i className="icon-alt icon-chevron-down" />
              <ul className="carte-de-vie-child">
                <li>
                  <a href="/">Flash</a>
                </li>
                <li>
                  <a href="/">Temporelles</a>
                </li>
                <li>
                  <a href="/">A la "Carte"</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/">Bien-être et musique</a>
            </li>
            <li>
              <i className="icon-alt icon-more-horiz" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

NavBar.propTypes = {
  title: PropTypes.string
};

export default NavBar;
