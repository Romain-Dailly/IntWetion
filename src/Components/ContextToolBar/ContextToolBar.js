import React from 'react';

export const ContextToolBar = ({ title, handleClick }) => (
  <div className="context-tool-bar background-white">
    <i className="logo icon-alt icon-lotus" />
    <p className="header-5 m-0">{title}</p>
    <i role="button" onClick={handleClick} className="icon icon-close" />
  </div>
);
