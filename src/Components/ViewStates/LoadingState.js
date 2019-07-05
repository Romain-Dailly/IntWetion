import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingState = () => (
  <div className="w-100 h-100 d-flex justify-content-center align-items-center">
    <Loader type="Oval" color="#3498db" height="80" width="80" />
  </div>
);

export default LoadingState;
