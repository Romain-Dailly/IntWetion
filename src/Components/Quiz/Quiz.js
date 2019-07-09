import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import "../NavBar/NavBar.css";
import Question from "../Question/Question";
import "./Quiz.css";
import { quitQuiz, startVideo } from "../../actions";
import { Redirect } from "react-router-dom";

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
  console.log(cardId, questions);


  const [videoEnded, endVideo] = useState(false);
  const [quizEnded, endQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [buttonValue, setButtonValue] = useState("");

  useEffect(() => {
    if (!videoEnded) {
      setButtonValue("Start");
    } else {
      setButtonValue("Continue");
    }
  }, []);

  const nextQuestion = () => {
    const questionCount = questions.length - 1;
    if (questionIndex < questionCount) {
      setQuestionIndex(questionIndex + 1);
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
    const answersCopy = { ...answers };

    answersCopy[questionKey] = answer;

    // const newObject = Object.assign({}, answersCopy, {
    //   [questionKey]: {
    //     answer: answer,
    //     question: questions[questionIndex]
    //   }
    // });

    // answersCopy[questionKey].question = questions[questionIndex];
    setAnswers("answersCopy");
  };

  const ToolBar = ({ title }) => (
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

  console.log(answers);

  if (questionIndex === 4) {
    return (
      <Redirect
        push
        to={{ pathname: `${process.env.PUBLIC_URL}/results`, state: answers }}
      />
    );
  }

  return (
    <div className="overlay">
      <ToolBar title="Forces" />
      <div className="overlay-content" style={{ background: `${color}` }}>
        <div className="content">
          {
            <Question
              question={questions[questionIndex]}
              onAnswerSelected={storeAnswer}
            />
          }
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
