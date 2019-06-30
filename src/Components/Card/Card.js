import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ data, runQuiz }) => {
  const { image, overline, title, description } = data;

  const [isVisible, toggleVisibility] = useState(false);

  const cardStyle = {
    backgroundImage: `url(${image})`,
  };
  return (
    <div className="col-sm-4 mb-3">
      <div className="ui-card background-white">
        <div className="action-tab">
          <i className="icon-edit" />
          <i className="icon-trash" />
        </div>
        <div className="ui-card-image" style={cardStyle} />
        <div className="ui-card-body px-3">
          <div className="ui-content">
            <p className="ui-card-overline overline mb-0 ">{overline}</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="ui-card-title header-6">{title}</h5>
              <i onClick={() => toggleVisibility(!isVisible)} className={" icon icon-chevron-down " + (isVisible ? "flip-vertically" : "")} tabIndex="-1" />
            </div>

            <p className={"ui-card-text body-1 noselect " + (isVisible ? "" : "d-none")}>{description}</p>
          </div>
          <div className="divider-dark" />
          <div className="ui-card-action">
            <i className="icon-alt icon-headset" />
            <button
              type="button"
              className="ui-button ui-button-outline"
              onClick={runQuiz}
            >
              COMMENCER
              </button>
          </div>
        </div>
      </div>
    </div >
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string
  }),
  openModel: PropTypes.func
};

export default Card;
