import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Menu, Drawer, Avatar } from 'antd';
import profile from '../../assets/images/profile.png';

const { Item } = Menu;

const AccountHeader = () => (
  <div className="account-header">
    <div className="d-flex mb-4">
      <Avatar size={60} src={profile} className="mr-3" />
      <div className="">
        <p className="body-1 m-0">Anna Black</p>
        <p className="caption m-0">you@example.com</p>
      </div>
    </div>
    <div className="d-flex">
      <button type="button" className="button button-primary mr-3 flex-grow-1">
        View profile
      </button>
      <button type="button" className="button button-secondary flex-grow-1">
        <Link to="/login">Log out</Link>
      </button>
    </div>
  </div>
);

const NavBar = () => {
  const navigationValues = [
    'Présentation',
    "Libérer l'intuition",
    'Cartes de vie',
    'Bien-être et musique',
    'Boite à outils',
    'Conférences',
    'Contacts',
  ];
  const [isDrawerOpen, openDrawer] = useState(false);
  const [current, setCurrent] = useState('mail');

  return (
    <header className="main-header background-white">
      <div className="nav-bar">
        <Link to="/" className="logo mr-3">
          <i className="icon-alt icon-spa p-2" />
          <p style={{ color: 'var(--dark)' }} className="m-0 ">
            Intwetion
          </p>
        </Link>
        <i
          onClick={() => openDrawer(!isDrawerOpen)}
          className={`icon icon-${isDrawerOpen ? 'close' : 'menu'} d-lg-none`}
          role="button"
          tabIndex="-1"
        />

        <Menu
          className="main-nav"
          onClick={(event) => {
            setCurrent(event.key);
          }}
          selectedKeys={[current]}
          mode="horizontal"
        >
          {navigationValues.map((value, index) => (
            <Item key={index}>
              <Link to="/">{value}</Link>
            </Item>
          ))}
        </Menu>

        <Avatar
          className="d-none d-lg-block flex-shrink-0"
          size={48}
          src={profile}
        />
        <Drawer
          width={300}
          onClose={() => openDrawer(false)}
          visible={isDrawerOpen}
          closable={false}
        >
          <div className="d-flex flex-column h-100">
            <AccountHeader />
            <Menu
              onClick={(event) => {
                setCurrent(event.key);
              }}
              selectedKeys={[current]}
              mode="inline"
            >
              {navigationValues.map((value, index) => (
                <Item key={index}>
                  <Link to="/">{value}</Link>
                </Item>
              ))}
            </Menu>
          </div>
        </Drawer>
      </div>
    </header>
  );
};

export default NavBar;
