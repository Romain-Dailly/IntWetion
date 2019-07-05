import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import "../NavBar/NavBar.css";
import Question from "../Question/Question";
import "./Quiz.css";
import { quitQuiz, startVideo } from "../../actions";
import Video from "../Video/Video";

/**
 * A component containing widgets to trigger actions.
 * @param {objects} props An object containing required dependencies for this function.
 */
const ActionBar = ({ buttonValue, onNextButtonClick }) => (
  <div className="action-bar">
    <div className=" d-flex align-items-center w-100">
      <i className="icon icon-volume" />
      <input
        type="range"
        min="0"
        max="1"
        step="any"
        onChange={({ target }) => console.log(target.value)}
        className="slider ml-3 mr-4"
      />
    </div>
    <button
      type="button"
      className="button button-text ripple"
      onClick={onNextButtonClick}
      tabIndex="-1"
    >
      {buttonValue}
    </button>
  </div>
);

/**
 * A component displayed above other component.
 * It serves as a wrapper for other sub-components.
 * @param {object} props An object containing required dependencies for this component.
 */
const Quiz = ({ color = "white" }) => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */
  const dispatch = useDispatch();

  /**
   * Get access to the redux store's state.
   */
  const cardId = useSelector(store => store.card.quiz.cardId);
  const { questions } = useSelector(store => store.card.data[cardId]);

  const [videoEnded, endVideo] = useState(false);
  const [quizEnded, endQuiz] = useState(!videoEnded);
  const [outroShowed, showOutro] = useState(false);
  const [introShowed, showIntro] = useState(false);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [buttonValue, setButtonValue] = useState("");

  useEffect(() => {
    if (!videoEnded) {
      setButtonValue("Start");
    } else {
      setButtonValue("Continue");
    }
  }, [videoEnded]);

  const nextQuestion = () => {
    console.log(questionIndex);
    if (!videoEnded && !questionIndex === 4) {
      endVideo(true);
    } else {
      const questionCount = questions.length - 1;
      if (questionIndex < questionCount) {
        setQuestionIndex(questionIndex + 1);
      }
    }

    if (questionIndex === 4) {
      endVideo(false);
      endQuiz(true);
    }
  };

  useEffect(() => {
    if (questionIndex === 4) {
      setButtonValue("Finish");
    }
  }, [questionIndex]);

  const getProgress = () => {
    const numberOfQuestion = questions.length - 1;
    return (questionIndex / numberOfQuestion) * 100;
  };

  const storeAnswer = (answer, number) => {
    const questionKey = `question-${number}`;
    const answersCopy = answers;
    answersCopy[questionKey] = answer;
    setAnswers(answersCopy);
  };

  const ToolBar = ({ title }) => {
    return (
      <div className="context-tool-bar background-white">
        <i className="logo icon-alt icon-lotus" />
        <p className="header-5 m-0">{title}</p>
        <i
          role="button"
          onClick={() => dispatch(quitQuiz)}
          className="icon icon-close"
        />
      </div>
    );
  };

  return (
    <div className="overlay">
      <ToolBar title="Forces" />
      <div className="overlay-content" style={{ background: `${color}` }}>
        <div className="content">
          {!videoEnded && <Video />}

          {!quizEnded && (
            <Question
              question={questions[questionIndex]}
              onAnswerSelected={storeAnswer}
            />
          )}
        </div>
        <div className="ui-progress">
          <div
            className="ui-progress-bar"
            role="progressbar"
            style={{ width: `${getProgress()}%` }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <ActionBar
          buttonValue={buttonValue}
          onNextButtonClick={() => {
            endQuiz();
            startVideo && nextQuestion();
          }}
        />
      </div>
    </div>
  );
};

Quiz.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  color: PropTypes.string
};

export default Quiz;
