import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Question from '../Question/Question';
import { quitQuiz, startVideo, saveResults } from '../../actions';
import './Quiz.css';
import { videoTypes } from '../../values/strings';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
/**
 * A component containing widgets to trigger actions.
 * @param {objects} props An object containing required dependencies for this function.
 */
const ActionBar = ({ onNextButtonClick }) => (
  <div className="action-bar">
    <div className=" d-flex align-items-center w-100">
      <i className="icon icon-volume" />
      <input
        type="range"
        min="0"
        max="1"
        step="any"
        onChange={() => {}}
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
  const { questions, videos } = useSelector(store => store.card.data[cardId]);

  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    // store the number of questions into a variable
    const questionCount = questions.length - 1;

    // Check if we are at the last question index
    if (questionIndex === questionCount) {
      // TODO retrieve the video key from redux store.
      // Launch the outro.
      dispatch(saveResults(answers));
      dispatch(startVideo(videoTypes.OUTRO, ''));
      localStorage.setItem('results', JSON.stringify(answers));
    }
    // Navigate to the next question
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
    const answersCopy = { ...answers };
    answersCopy[questionKey] = answer;

    const newObject = Object.assign({}, answersCopy, {
      [questionKey]: {
        answer,
        question: questions[questionIndex],
      },
    });

    // answersCopy[questionKey].question = questions[questionIndex];

    setAnswers(newObject);
  };

  const ToolBar = ({ title }) => (
    <div className="context-tool-bar background-white">
      <i className="logo icon-alt icon-lotus" />
      <p className="header-5 m-0">{title}</p>
      <i
        tabIndex="-1"
        role="button"
        onClick={() => dispatch(quitQuiz)}
        className="icon icon-close"
      />
    </div>
  );

  return (
    <div className="overlay">
      <ToolBar title="Forces" />
      <SoundPlayer url={videos[0].url_video} />
      <div className="overlay-content" style={{ background: `${color}` }}>
        <div className="content">
          {<Question question={questions[questionIndex]} onAnswerSelected={storeAnswer} />}
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
        />
      </div>
    </div>
  );
};

export default Quiz;
