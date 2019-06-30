import React, { useState } from "react";
import PropTypes from "prop-types";
import "../NavBar/NavBar.css";
import Question from "../Question/Question";
import "./Modal.css";

/**
 * A component containing important view action triggers such as text
 * and icon buttons.
 * @param {objects} props An object containing required dependencies for this function.
 */
const ActionBar = ({ closeModal, onNextButtonClick }) => (
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
      Continue
    </button>
  </div>
);

/**
 * A component displayed above other component.
 * It serves as a wrapper for other sub-components.
 * @param {object} props An object containing required dependencies for this component.
 */
const Modal = ({ questions, color = "white", quitQuiz }) => {
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    const questionCount = questions.length - 1;
    if (questionIndex < questionCount) {
      setQuestionIndex(questionIndex + 1);
    }
  };

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
        <i className="icon icon-close" />
      </div>
    );
  };

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ background: `${color}` }}>
        <ToolBar title="Forces" />
        <div className="content">
          <Question
            question={questions[questionIndex]}
            onAnswerSelected={storeAnswer}
          />
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
        <ActionBar onNextButtonClick={nextQuestion} closeModal={quitQuiz} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  color: PropTypes.string
};

export default Modal;
