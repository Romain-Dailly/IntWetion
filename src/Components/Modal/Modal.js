import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../NavBar/NavBar.css';
import './Modal.css';

const ContextToolBar = ({ title }) => (
  <div className="nav-bar context-tool-bar">
    <p className="title m-0">{title}</p>
  </div>
);

const ActionBar = ({ closeModal, onNextButtonClick }) => (
  <div className="nav-bar action-bar">
    <button type="button" className="button" onClick={closeModal}>Close</button>
    <button type="button" className="button" onClick={onNextButtonClick}>Next</button>
  </div>
);

const Modal = ({ title, children, color = 'white' }) => {
  const [isVisible, setVisibility] = useState(false);

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ background: `${color}` }}>
        <ContextToolBar title="Administrator" />
        <div className="content">{children}</div>
        <ActionBar
          title={title}
          onNextButtonClick={() => setVisibility(isVisible)}
          closeModal={setVisibility(true)}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  color: PropTypes.string,
};

export default Modal;
