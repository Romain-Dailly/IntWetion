import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import { Tooltip, Popconfirm } from 'antd';
import { removeCard, launchTest } from '../../actions';
import './Card.css';

const Card = ({
  data, index, onStartQuiz, demo,
}) => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */

  const [isModifiable, setModifiable] = useState(false);
  const dispatch = useDispatch();
  const {
    id, image, name, description,
  } = data.card;

  const [isVisible, toggleVisibility] = useState(false);

  const cardStyle = {
    backgroundImage: `url(${image})`,
  };

  if (isModifiable) {
    return (
      <Redirect
        push
        to={{
          pathname: `${process.env.PUBLIC_URL}/form`,
          state: index,
        }}
      />
    );
  }

  return (
    <Col xs={12} md={6} lg={4} span={8}>
      <div className="ui-card mb-3 ">
        {demo !== -5 && (
          <div className="action-tab scale-up-center">
            <i
              title="Modifier la carte"
              tabIndex="-1"
              role="button"
              className="icon-edit"
              onClick={() => {
                setModifiable(true);
              }}
            />
            <Popconfirm
              placement="top"
              title="Etes-vous sûr(e) ?"
              onConfirm={() => dispatch(removeCard(id, index))}
              okText="Oui"
              cancelText="Non "
            >
              <i role="button" title="Supprimer la carte" onClick={() => {}} className="icon-trash" tabIndex="-1" />
            </Popconfirm>
          </div>
        )}
        <div className="ui-card-image" style={cardStyle} />
        <div className="ui-card-body px-3">
          <div className="ui-content">
            <p className="ui-card-overline overline mb-0 ">Flash</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="ui-card-title header-6">{name}</h5>
              <i
                tabIndex="-1"
                role="button"
                onClick={() => toggleVisibility(!isVisible)}
                className={` icon icon-chevron-down ${isVisible ? 'flip-vertically' : ''}`}
              />
            </div>
            <p className={`ui-card-text body-1 noselect ${isVisible ? '' : 'd-none'}`}>
              {description}
            </p>
          </div>
          <div className="card-action mt-3 mb-4">
            <Tooltip title="Utilisez un casque audio pour une meilleure expérience.">
              <i className="icon-alt icon-headset" />
            </Tooltip>
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                dispatch(launchTest(index));
                onStartQuiz();
              }}
            >
              Commencer
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};


export default Card;
