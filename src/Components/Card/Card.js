import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ data, openModel }) => {
  const { title, description, imageUrl } = data;
  return (
    <div className="card" style={{ width: '400px' }}>
      <img src={imageUrl} className="card-img-top" alt="" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={openModel}
        >
          Start
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string,
      description: PropTypes.string,
      imageUrl: PropTypes.string,
    },
  )),
  openModel: PropTypes.func,
};

export default Card;