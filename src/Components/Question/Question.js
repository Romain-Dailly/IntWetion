import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const Question = ({ question, onAnswerSelected }) => {
  const { text, image } = question;

  const RadioButton = ({ number }) => (
    <div className="radio-button">
      <input className="choice-radio" type="radio" name="answer-radio" onChange={() => onAnswerSelected(number, question.number)} />
      <label className="check-mark m-0" />
      <span>{number}</span>
    </div>
  );

  const answerRange = [...Array(11).keys()];

  return (
    <div className="question my-5">
      <div className="container">
        <img src={image} alt="" width="100%" />
        <p className="body-1 my-3">{text}</p>
        <div role="radiogroup" className="radio-button-wrapper">
          {answerRange.map(number => <RadioButton key={number} number={number} />)}
        </div>
      </div>
    </div>
  );
};

Question.prototype = {
  question: PropTypes.string,
};

export default Question;
