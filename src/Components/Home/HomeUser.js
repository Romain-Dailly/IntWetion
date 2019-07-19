import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { Button } from 'antd';
import Quiz from '../Quiz/Quiz';
import Video from '../Video/Video';
import Card from '../Card/Card';
import './Home.css';
import LoadingState from '../ViewStates/LoadingState';
import {
  startVideo, launchComment, startQuiz, quitQuiz,
} from '../../actions';
import { videoTypes } from '../../values/strings';

const Comment = ({ onComment }) => (
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */

  <div className="overlay">
    <div className="w-75 d-flex justify-content-center flex-column mt-5">
      <label htmlFor="textarea-comment">
        <p>Exprimez-vous au sujet de cette vidéo</p>
        <textarea className="w-100 my-3" name="" id="textarea-comment" cols="20" rows="10" />
      </label>
      <div>
        <button type="button" onClick={onComment} className="button button-primary">
          continue
        </button>
      </div>
    </div>
  </div>
);
const Home = () => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(store => store.card);
  const {
    cardId, state, videoType, videoKey,
  } = useSelector(store => store.card.quiz);

  const [canShowResults, showResults] = useState(false);
  const [newCard, setNewCard] = useState(false);

  const { videoStarted, canComment, quizStarted } = state;

  const manageLogic = () => {
    switch (videoType) {
      case videoTypes.INTRO:
        dispatch(launchComment);
        break;

      case videoTypes.OUTRO:
        showResults(true);
        break;

      default:
        break;
    }
  };

  const parseVideoKey = (params) => {
    const INTRO_VIDEO_KEY = 1;
    if (params) {
      const videoIntro = params.filter(param => param.type_video === INTRO_VIDEO_KEY).pop();
      return videoIntro.url_video.split('=')[1];
    }
  };

  // Indicate loading process.
  if (isLoading) {
    return <LoadingState />;
  }

  if (canShowResults) {
    return (
      <Redirect push to={{ pathname: `${process.env.PUBLIC_URL}/results`, state: 'answers' }} />
    );
  }

  if (newCard) {
    return <Redirect push to={{ pathname: `${process.env.PUBLIC_URL}/form` }} />;
  }

  return (
    <div className="home background-white">
      {videoStarted && (
        <Video
          videoKey={videoKey}
          onClose={() => {
            dispatch(quitQuiz);
          }}
          onContinue={() => {
            manageLogic();
          }}
          onEnded={() => {
            dispatch(launchComment);
          }}
        />
      )}

      {canComment && (
        <Comment
          onComment={() => {
            dispatch(startQuiz);
          }}
        />
      )}

      {quizStarted && <Quiz canShowResults={canShowResults} />}

      <div className="container px-2">
        <Row gutter={16}>
          {data.map((value, index) => {
            if (value.card.online === 1) {
              return (
                <Card
                  key={value.card.id}
                  demo={-5}
                  data={value}
                  index={index}
                  onStartQuiz={() => {
                    dispatch(startVideo(videoTypes.INTRO, parseVideoKey(data[index].videos)));
                  }}
                />
              );
            }
          })}
          {/* <Col xs={12} md={6} lg={4} span={8}>
            <div
              role="button"
              tabIndex="-1"
              onClick={() => setNewCard(true)}
              className="ui-card addCard mb-3 h-100 d-flex justify-content-center align-items-center"
              title="Ajouter une nouvelle carte"
              style={{
                border: '2px dashed var(--color-primary)',
                maxHeight: '368px',
                minHeight: '368px',
                cursor: 'pointer',
              }}
            >
              <Button
                className="background-primary"
                // type="primary"
                style={{ width: '100px', height: '100px', border: 'none' }}
                shape="circle"
                icon="plus"
              />
            </div>
          </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default Home;
