import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row } from 'react-flexbox-grid';
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
    <div className="w-100 d-flex flex-column mt-5 px-3" style={{ maxWidth: '800px' }}>
      <label htmlFor="textarea-comment">
        <p>Exprimez-vous au sujet de cette vidéo</p>
        <textarea
          className="w-100 px-2 my-3 ui-input"
          name=""
          id="textarea-comment"
          cols="20"
          rows="10"
          style={{ height: '200px' }}
        />
      </label>
      <div>
        <button type="button" onClick={onComment} className="button button-primary">
          suivant
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
    state, videoType, videoKey,
  } = useSelector(store => store.card.quiz);

  const [canShowResults, showResults] = useState(false);
  const { videoStarted, canComment, quizStarted } = state;

  const manageLogic = () => {
    switch (videoType) {
      case videoTypes.INTRO:
        dispatch(launchComment);
        break;

      case videoTypes.OUTRO:
        showResults(true);
        dispatch(quitQuiz);
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
    return '';
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
            } return null;
          })}
        </Row>
      </div>
    </div>
  );
};

export default Home;
