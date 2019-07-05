import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { removeCard, startVideo, startQuiz } from '../../actions';
import './Card.css';

const Card = (props) => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */
  const dispatch = useDispatch();
  const { data, index } = props;
  const {
    image, overline, title, description,
  } = data;

  const [isVisible, toggleVisibility] = useState(false);

  const cardStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className="col-sm-4 mb-3">
      <div className="ui-card background-white">
        <div className="action-tab">
          <i role="button" className="icon-edit" />
          <i
            role="button"
            onClick={() => dispatch(removeCard(data.id))}
            className="icon-trash"
          />
        </div>
        <div className="ui-card-image" style={cardStyle} />
        <div className="ui-card-body px-3">
          <div className="ui-content">
            <p className="ui-card-overline overline mb-0 ">{overline}</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="ui-card-title header-6">{title}</h5>
              <i
                onClick={() => toggleVisibility(!isVisible)}
                className={
                  ` icon icon-chevron-down ${
                    isVisible ? 'flip-vertically' : ''}`
                }
                tabIndex="-1"
              />
            </div>
            <p
              className={
                `ui-card-text body-1 noselect ${isVisible ? '' : 'd-none'}`
              }
            >
              {description}
            </p>
          </div>
          <div className="card-action mt-3 mb-4">
            <i className="icon-alt icon-headset" />
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                dispatch(startQuiz(index));
              }}
            >
              COMMENCER
            </button>
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
