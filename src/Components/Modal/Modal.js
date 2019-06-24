import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../NavBar/NavBar.css';
import Question from '../Question/Question';
import './Modal.css';

const ActionBar = ({ closeModal, onNextButtonClick }) => (
  <div className="nav-bar action-bar">
    <button type="button" className="button" onClick={closeModal}>Close</button>
    <button type="button" className="button" onClick={onNextButtonClick}>Next</button>
  </div>
);

const Modal = ({ questions, color = 'white',quitQuiz }) => {
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    const questionCount = questions.length - 1;
    if (questionIndex < questionCount) {
      setQuestionIndex(questionIndex + 1);
    }
  }

  const getProgress = () => {
    const numberOfQuestion = questions.length - 1;
    return (questionIndex) / numberOfQuestion * 100
  }
  const storeAnswer = (answer, number) => {
    const questionKey = `question-${number}`;
    const answersCopy = answers;
    answersCopy[questionKey] = answer;
    setAnswers(answersCopy);
  }

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ background: `${color}` }}>
        <div className="ui-progress">
          <div className="ui-progress-bar" role="progressbar" style={{ width: `${getProgress()}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className="content">
          <Question
            question={questions[questionIndex]}
            onAnswerSelected={storeAnswer}
          />
        </div>
        <ActionBar
          onNextButtonClick={nextQuestion}
          closeModal={quitQuiz}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  color: PropTypes.string,
};

export default Modal;
