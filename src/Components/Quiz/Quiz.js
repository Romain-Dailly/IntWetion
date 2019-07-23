import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import { Slider, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { videoTypes } from '../../values/strings';
import Question from '../Question/Question';
import { quitQuiz, startVideo, saveResults } from '../../actions';
import './Quiz.css';
import logo from '../../assets/images/logo_intWEtionPNG.png';
/**
 * A component containing widgets.
 * @param {objects} props An object containing required dependencies for this function.
 */

const ActionBar = ({ onNextButtonClick, volume, handleChange }) => (
  <div className="action-bar">
    <div className=" d-flex align-items-center w-100">
      <i className="icon icon-volume" />
      <Slider
        className="w-100"
        max={1}
        step={0.00001}
        tooltipVisible={false}
        onChange={handleChange}
        value={volume}
      />
    </div>
    <button
      type="button"
      className="button button-text ripple"
      onClick={onNextButtonClick}
      tabIndex="-1"
    >
      Suivant
    </button>
  </div>
);

/**
 * A component displayed above other component.
 * It serves as a wrapper for other sub-components.
 * @param {object} props An object containing required dependencies for this component.
 */
const Quiz = ({ color = 'white' }) => {
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
  const { videos } = useSelector(store => store.card.data[cardId]);
  const name = useSelector(store => store.card.data[cardId].card.name);
  const questions = useSelector(store => store.card.data[cardId].questions);
  /**
   * Get mutable reference from the DOM.
   * These refs are `objects` with `current` properties pointing to elements in the DOM.
   */
  const radioWrapperRef = useRef();
  const textareaWrapperRef = useRef();

  /**
   * Store stateful values, and their respective functions to update them.
   */
  const [volume, setVolume] = useState(0.5);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const displayWarning = () => {
    message.config({
      maxCount: 1,
    });
    message.warning('Vous devez répondre à la question !');
  };

  const parseVideoKey = (params) => {
    const OUTRO_VIDEO_KEY = 3;
    if (params) {
      const videoIntro = params.filter(param => param.type_video === OUTRO_VIDEO_KEY).pop();
      return videoIntro.url_video.split('=')[1];
    }
    return '';
  };

  const nextQuestion = () => {
    const radioButtonsParent = radioWrapperRef.current;
    const textArea = textareaWrapperRef.current;

    // anyChecked : boolean; is false when not answer is selected
    let anyChecked;
    // verify if any of the radio group is checked or not
    if (radioButtonsParent) {
      anyChecked = Array.from(radioButtonsParent.getElementsByClassName('choice-radio')).some(
        element => element.checked === true,
      );
    }

    // check if the textarea is empty
    if (textArea && textArea.value && /\S/.test(textArea.value)) {
      anyChecked = true;
    }
    // store the number of questions into a variable
    const questionCount = questions.length - 1;

    // Check if we are at the last question index
    if (questionIndex === questionCount && anyChecked) {
      // TODO: Retrieve the video key from redux store.
      // Launch the outro.
      dispatch(saveResults(answers));
      dispatch(startVideo(videoTypes.OUTRO, parseVideoKey(videos)));
      localStorage.setItem('results', JSON.stringify(answers));
    }
    // Navigate to the next question
    if (questionIndex < questionCount && anyChecked) {
      setQuestionIndex(questionIndex + 1);
    }

    // If no answer is selected, display a message.
    if (!anyChecked) {
      displayWarning();
    }
  };

  /**
   * Returns the percentage of {@link questionIndex } to {@link numberOfQuestion }
   */
  const getProgress = () => {
    const numberOfQuestion = questions.length - 1;

    return (questionIndex / numberOfQuestion) * 100;
  };

  /**
   * Compose ans save users entries
   * @param {object} event a DOM Event
   * @param {number} answer users entries
   * @param {number} number the question number
   * @param {number} answerType valid values, 1 and 2
   */
  const storeAnswer = (event, answer, number, answerType) => {
    const questionKey = `question-${number}`;
    const answersCopy = { ...answers };

    // store the users entry based on the `answerType`.
    if (answerType === 1) {
      answersCopy[questionKey] = answer;
    } else {
      answersCopy[questionKey] = event.target.value;
    }

    const newObject = Object.assign({}, answersCopy, {
      [questionKey]: {
        answer,
        question: questions[questionIndex],
      },
    });

    // answersCopy[questionKey].question = questions[questionIndex];

    setAnswers(newObject);
  };

  const ToolBar = ({ cardName }) => (
    <div className="context-tool-bar background-white">
      <img width={110} src={logo} alt="logo" />
      <p className="header-5 m-0">{cardName}</p>
      <i
        tabIndex="-1"
        role="button"
        onClick={() => dispatch(quitQuiz)}
        className="icon icon-close"
      />
    </div>
  );

  return (
    <div className="overlay slide-fwd-top">
      <ToolBar cardName={name} />
      <div style={{ width: '0', height: '0', opacity: '0' }}>
        <ReactPlayer playing='"true' url={videos[2].url_video} volume={volume} />
      </div>
      <div className="overlay-content" style={{ background: `${color}` }}>
        <div className="content">
          {
            <Question
              question={questions[questionIndex]}
              onAnswerSelected={storeAnswer}
              radioWrapperRef={radioWrapperRef}
              textareaWrapperRef={textareaWrapperRef}
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
          onNextButtonClick={() => {
            nextQuestion();
          }}
          handleChange={(value) => {
            setVolume(value);
          }}
          volume={volume}
        />
      </div>
    </div>
  );
};

Quiz.prototype = {
  color: PropTypes.string,
};

export default Quiz;
