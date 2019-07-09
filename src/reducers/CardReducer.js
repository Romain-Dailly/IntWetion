import {
  // ADD_CARD,
  // EDIT_CARD,
  DELETE_CARD,
  REQUEST_DATA,
  RECEIVE_DATA,
  START_QUIZ,
  QUIT_QUIZ,
  START_VIDEO,
} from '../actions/types';

// TODO: Delete this
const data = [
  {
    id: 1,
    overline: 'Flash',
    title: 'Force',
    description:
      'The sacral chakra is all about our connection and ability to accept others and new experiences.',
    image: 'https://images.unsplash.com/photo-1516526995003-435ccce2be97?w=800',
    questions: [
      {
        number: 1,
        image:
          'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=1000',
        text: 'Is your voice loud and clear?',
        type: 1,
      },
      {
        number: 2,
        image:
          'https://images.unsplash.com/photo-1525120334885-38cc03a6ec77?w=1000',
        text:
          'Are you withdrawn or lonely, or do you keep people at a distance?',
        type: 2,
      },
      {
        number: 3,
        image:
          'https://images.unsplash.com/photo-1516544820488-4a99efa70a58?w=1000',
        text: 'Do you regularly avoid particular situations?',
        type: 1,
      },
      {
        number: 4,
        image:
          'https://images.unsplash.com/photo-1536602012356-86c345795580?w=1000',
        text: 'Do you have visions or premonitions?',
        type: 2,
      },
      {
        number: 5,
        image:
          'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=1000',
        text: 'Are you good at thinking in words, symbols and concepts?',
        type: 1,
      },
    ],

    videoIntro: { url: 'bTqVqk7FSmY' },
  },
  {
    id: 2,
    overline: 'Flash',
    title: 'Peur',
    description:
      'The sacral chakra is all about our connection and ability to accept others and new experiences.',
    image: 'https://images.unsplash.com/photo-1504021624863-054aa77f753f?w=800',
    questions: [
      {
        number: 1,
        image:
          'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=1000',
        text: 'Is your voice loud and clear?',
        type: 1,
      },
      {
        number: 2,
        image:
          'https://images.unsplash.com/photo-1525120334885-38cc03a6ec77?w=1000',
        text:
          'Are you withdrawn or lonely, or do you keep people at a distance?',
        type: 2,
      },
      {
        number: 3,
        image:
          'https://images.unsplash.com/photo-1516544820488-4a99efa70a58?w=1000',
        text: 'Do you regularly avoid particular situations?',
        type: 1,
      },
      {
        number: 4,
        image:
          'https://images.unsplash.com/photo-1536602012356-86c345795580?w=1000',
        text: 'Do you have visions or premonitions?',
        type: 2,
      },
      {
        number: 5,
        image:
          'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=1000',
        text: 'Are you good at thinking in words, symbols and concepts?',
        type: 1,
      },
    ],
    videoIntro: { url: 'bTqVqk7FSmY' },
  },

  {
    id: 3,
    overline: 'Temporelles',
    title: 'Terrestre',
    description:
      'The sacral chakra is all about our connection and ability to accept others and new experiences.',
    image:
      'https://images.unsplash.com/photo-1539131729610-2b4d9cf62e2c?w=1000',

    questions: [
      {
        number: 1,
        image:
          'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=1000',
        text: 'Is your voice loud and clear?',
        type: 1,
      },
      {
        number: 2,
        image:
          'https://images.unsplash.com/photo-1525120334885-38cc03a6ec77?w=1000',
        text:
          'Are you withdrawn or lonely, or do you keep people at a distance?',
        type: 2,
      },
      {
        number: 3,
        image:
          'https://images.unsplash.com/photo-1516544820488-4a99efa70a58?w=1000',
        text: 'Do you regularly avoid particular situations?',
        type: 1,
      },
      {
        number: 4,
        image:
          'https://images.unsplash.com/photo-1536602012356-86c345795580?w=1000',
        text: 'Do you have visions or premonitions?',
        type: 2,
      },
      {
        number: 5,
        image:
          'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=1000',
        text: 'Are you good at thinking in words, symbols and concepts?',
        type: 1,
      },
    ],
    videoIntro: { url: 'bTqVqk7FSmY' },
  },
];

const initState = {
  data: [],
  isLoading: true,
  video: {
    videoStarted: false,
  },
  quiz: {
    quizStarted: false,
    cardId: undefined,
  },
};

/**
 * @param {object} state
 * @param {object} action
 */
const CardReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        data,
        posts: action.payload,
      });
    case START_QUIZ:
      return Object.assign({}, state, {
        quiz: {
          quizStarted: true,
          cardId: action.payload,
        },
      });

    case QUIT_QUIZ:
      return Object.assign({}, state, {
        quiz: {
          isStarted: false,
        },
      });

    case DELETE_CARD:
      return state;
    // return Object.assign({}, state, {

    // });

    case START_VIDEO:
      return Object.assign({}, state, {
        video: {
          videoStarted: true,
          hasComment: action.payload.hasComment,
          url: action.payload.card.videoIntro.url,
        },
        quiz: {
          questions: action.payload.card.questions,
        },
      });

    default:
      return state;
  }
};

export default CardReducer;
