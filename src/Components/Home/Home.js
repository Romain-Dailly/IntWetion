import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Quiz from "../Quiz/Quiz";
import Video from "../Video/Video";
import Card from "../Card/Card";
import "./Home.css";
import { Row, Col } from "react-flexbox-grid";
import LoadingState from "../ViewStates/LoadingState";

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
  const { data, isLoading } = useSelector(store => store.card);
  const [cardId, setCardId] = useState(0);
  const [canComment, setCanComment] = useState(false);
  const [videoStarted, startVideo] = useState(false);
  const [quizStarted, startQuiz] = useState(false);

  const videoType = {
    intro: "INTRO",
    outtro: "OUTRO"
  }

  // Indicate loading process.
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="home background-white">
      {videoStarted && <Video
        videoKey="gN7U0ycbWCM"
        onClose={() => { startVideo(false) }}
        onContinue={() => {
          setCanComment(true)
          startVideo(false)
        }}
        onEnded={() => {
          startVideo(false);
          setCanComment(true)
        }}
        onPlaying={() => { setCanComment(false) }}
      />}

      {canComment && <Comment onComment={() => {
        console.log("Start quiz");

        startVideo(false);
        setCanComment(false)
        startQuiz(true);
      }

      } />}

      {quizStarted && <Quiz />}

      <div className="container px-2">
        <Row gutter={16}>
          {data.map((card, index) => (
            <Card
              key={card.id}
              data={card}
              index={index}
              onStartQuiz={() => {
                setCardId(index);
                startVideo(true);
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
