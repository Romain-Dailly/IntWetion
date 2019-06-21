import React from 'react';
import PropTypes from 'prop-types';
import '../NavBar/NavBar.css';
import './Modal.css';

const ContextToolBar = ({ title }) => (
  <div className="nav-bar context-tool-bar">
    <p className="title m-0">{title}</p>
  </div>
);

const closeModal = () => {
  console.log('closed');
};

const ActionBar = ({ title, onNextButtonClick }) => (
  <div className="nav-bar action-bar">
    <button className="button" onClick={closeModal}>Close</button>
    <button className="button" onClick={onNextButtonClick}>Next</button>
  </div>
);

const Modal = ({ children, color = 'white' }) => (
  <div className="overlay">
    <div className="overlay-content" style={{ background: `${color}` }}>
      <ContextToolBar title="Administrator" />
      <div className="content">{children}</div>
      <ActionBar />
    </div>
  </div>
);

Modal.propTypes = {
  data: PropTypes.array,
};

export default Modal;
