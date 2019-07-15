import {
  DELETE_CARD,
  REQUEST_DATA,
  RECEIVE_DATA,
  START_QUIZ,
  QUIT_QUIZ,
  START_VIDEO,
  LAUNCH_TEST,
  LAUNCH_COMMENT,
  SAVE_RESULTS
} from '../actions/types';

const initState = {
  data: [],
  isLoading: true,
  video: {
    videoStarted: false
  },
  quiz: {
    quizLaunched: false,
    cardId: undefined,
    state: {
      videoStarted: false,
      canComment: false,
      quizStarted: false
    },
    videoType: '',
    videoKey: ''
  }
};

/**
 * @param {object} state
 * @param {object} action
 */
const CardReducer = (state = initState, action) => {
  switch (action.type) {
    case START_VIDEO:
      return Object.assign({}, state, {
        quiz: {
          ...state.quiz,
          state: {
            videoStarted: true,
            canComment: false,
            quizStarted: false
          },
          videoType: action.payload.videoType,
          videoKey: action.payload.videoKey
        }
      });

    case LAUNCH_COMMENT:
      return Object.assign({}, state, {
        quiz: {
          ...state.quiz,
          state: {
            videoStarted: false,
            canComment: true,
            quizStarted: false
          }
        }
      });

    case START_QUIZ:
      return Object.assign({}, state, {
        quiz: {
          ...state.quiz,
          state: {
            videoStarted: false,
            canComment: false,
            quizStarted: true
          }
        }
      });

    // Enable loading state
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isLoading: true
      });

    // Stores data from the web service and disable loading state
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.payload
      });

    case DELETE_CARD:
      return state;

    // A simple state machine to regulate the state of the quiz.
    case LAUNCH_TEST:
      return Object.assign({}, state, {
        quiz: {
          quizLaunched: true,
          cardId: action.payload
        }
      });

    case QUIT_QUIZ:
      return Object.assign({}, state, {
        quiz: {
          ...state.quiz,
          state: {
            videoStarted: false,
            canComment: false,
            quizStarted: false
          }
        }
      });

    case SAVE_RESULTS:
      return Object.assign({}, state, {
        quiz: {
          ...state.quiz,
          state: {
            videoStarted: false,
            canComment: false,
            quizStarted: false
          }
        },
        results: action.payload
      });

    default:
      return state;
  }
};

export default CardReducer;
