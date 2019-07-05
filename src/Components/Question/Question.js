import React from "react";
import PropTypes from "prop-types";
import "./Question.css";

const Question = ({ question, onAnswerSelected }) => {
  const { text, image } = question;

  const RadioButton = ({ number }) => {
    return (
      <div className="col-4 d-flex justify-content-center p-0">
        <div className="radio-button mb-4">
          <input
            className="choice-radio"
            type="radio"
            name="answer-radio"
            onChange={() => onAnswerSelected(number, question.number)}
          />
          <label className="check-mark m-0" />
          <span>{number}</span>
        </div>
      </div>
    );
  };

  const answerRange = [0,1, 2, 3, 4,5 ,6, 7, 8, 9];

  return (
    <div className="question">
      <div className="container">
        <img src={image} alt="" width="100%" />
        <p className="body-1 my-3">{text}</p>
        <div className="row justify-content-center">
          {answerRange.map(number => (
            <RadioButton key={number} number={number} />
          ))}
        </div>
      </div>
    </div>
  );
};

Question.prototype = {
  question: PropTypes.string
};

export default Question;
