import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'

const Card = ({ data, runQuiz }) => {
  const { image, overline, title, description } = data;

  const cardStyle = {
    backgroundImage: `url(${image})`
  }
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 px-2">
      <div className="ui-card my-2">
        <div className="ui-card-image" style={cardStyle}>
        </div>
        <div className="ui-card-body">
          <div className="ui-content">
            <p className="ui-card-overline overline">{overline}</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="ui-card-title header-6">{title}</h5>
              <i className="icon icon-add" tabIndex="0" />
            </div>

            {/* <p className="ui-card-text body-1">{description}</p> */}
          </div>
          <div className="divider-dark" />
          <div className="ui-card-action">
            <i className="icon icon-headset" />
            <button
              type="button"
              className="ui-button ui-button-outline"
              onClick={runQuiz}>Go Solve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  openModel: PropTypes.func,
};

export default Card;
