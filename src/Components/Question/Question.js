/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const RadioButton = ({ number, handleChange }) => (
  <div className="col-4 d-flex justify-content-center p-0">
    <div className="radio-button mb-4">
      <label htmlFor="choiceRadio" className="check-mark m-0">
        <input className="choice-radio" id="choiceRadio" type="radio" name="answer-radio" onChange={handleChange} />
      </label>
      <span>{number}</span>
    </div>
  </div>
);

const Question = ({ question, onAnswerSelected }) => {
  const { text_question, image_question } = question;
  const answerRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    // TODO: Re-implement this using react `ref` attr.
    // Un-check all radio buttons with the name attr; `answer-radio`.
    document.getElementsByName('answer-radio').forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.checked = false;
    });
  }, [question]);

  return (
    <div className="question">
      <div className="container">
        <img src={image_question} alt="" width="100%" />
        <p className="body-1 my-3">{text_question}</p>
        <div className="row justify-content-center">
          {answerRange.map(number => (
            <RadioButton
              key={number}
              number={number}
              handleChange={() => onAnswerSelected(number, question.number)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Question.prototype = {
  question: PropTypes.string,
};

export default Question;
