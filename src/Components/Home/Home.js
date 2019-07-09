import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Popconfirm, message } from "antd";
import Quiz from "../Quiz/Quiz";
import Video from "../Video/Video";
import Card from "../Card/Card";
import "./Home.css";
import { Row } from "react-flexbox-grid";
import LoadingState from "../ViewStates/LoadingState";
import { startVideo, launchComment, startQuiz, quitQuiz } from "../../actions";
import { videoTypes } from "../../values/strings";

const Comment = ({ onComment }) => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */

  return (
    <div className="overlay flex-column justify-content-start">
      <label htmlFor="textarea-comment">
        Write your comments based on the video you just watched
      </label>
      <div>
        <textarea
          className="w-100 my-3"
          name=""
          id="textarea-comment"
          cols="20"
          rows="10"
        />
      </div>
      <div>
        <button onClick={onComment}>continue</button>
      </div>
    </div>
  );
};

const Home = () => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(store => store.card);
  const { state, videoType, videoKey } = useSelector(store => store.card.quiz);

  console.log(videoKey);
  
  const [cardId, setCardId] = useState(0);
  const [canShowResults, showResults] = useState(false);

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

  // Indicate loading process.
  if (isLoading) {
    return <LoadingState />;
  }

  if (canShowResults) {
    return (
      <Redirect
        push
        to={{ pathname: `${process.env.PUBLIC_URL}/results`, state: "answers" }}
      />
    );
  }

  return (
    <div className="home background-white">
      {videoStarted && (
        <Video
          videoKey="gN7U0ycbWCM"
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

      {quizStarted && <Quiz canShowResults = {canShowResults}/>}

      <div className="container px-2">
        <Row gutter={16}>
          {data.map((card, index) => (
            <Card
              key={card.id}
              data={card}
              index={index}
              onStartQuiz={() => {
                setCardId(index);
                dispatch(startVideo(videoTypes.INTRO, ""));
              }}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};

// Add more fields.
Home.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      descriptions: PropTypes.string,
      imageUrl: PropTypes.string
    })
  )
};

export default Home;
