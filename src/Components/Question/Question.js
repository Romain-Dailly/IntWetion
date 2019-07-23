/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const RadioButton = ({ number, handleChange }) => (
  <div className="col-4 d-flex justify-content-center p-0">
    <div className="radio-button mb-4">
      <input
        className="choice-radio"
        type="radio"
        name="answer-radio"
        onChange={handleChange}
        id="input-radio"
      />

      <label htmlFor="input-radio" className="check-mark m-0" />
      <span>{number}</span>
    </div>
  </div>
);

const Question = ({
  question, onAnswerSelected, radioWrapperRef, textareaWrapperRef,
}) => {
  const {
    number_question, text_question, image_question, type_response,
  } = question;

  const answerRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    // TODO: Re-implement this using react `ref` attr.
    // Un-check all radio buttons with the name attr; `answer-radio`.
    document.getElementsByName('answer-radio').forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.checked = false;
    });

    // TODO: Re-implement this using react `ref` attr.
    const textArea = document.getElementById('input-answer');
    if (textArea) {
      textArea.value = '';
    }
  }, [question]);

  return (
    <div className="question">
      <div className="container">
        <div className="quiz-image-wrapper aspect-ratio-box">
          <img
            className="aspect-ratio-box-inside"
            src={image_question}
            alt=""
            width="100%"
            height="100%"
          />
        </div>

        <p className="body-1 mt-3 mb-5">{text_question}</p>
        {question.type_response === 1 ? (
          <div ref={radioWrapperRef} className="row justify-content-center">
            {answerRange.map(number => (
              <RadioButton
                key={number}
                number={number}
                handleChange={event => onAnswerSelected(
                  event, number, number_question, type_response,
                )
                }
              />
            ))}
          </div>
        ) : (
          <label htmlFor="input-answer" className="w-100">
            <textarea
              className="ui-input ant-input body-1"
              ref={textareaWrapperRef}
              id="input-answer"
              type="text"
              rows="5"
              onChange={event => onAnswerSelected(
                event, 0, number_question, type_response,
              )}
            />
          </label>
        )}
      </div>
    </div>
  );
};

Question.prototype = {
  question: PropTypes.string,
};

export default Question;
