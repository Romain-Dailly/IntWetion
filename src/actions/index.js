import {
  START_QUIZ,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
  REQUEST_DATA,
  RECEIVE_DATA,
  QUIT_QUIZ
} from "./types";
import { fetchCards, deleteCard } from "../data/source";

export const addCard = {
  type: ADD_CARD
};
export const deleteCardAction = id => ({
  type: DELETE_CARD,
  payload: id
});
export const editCard = {
  type: EDIT_CARD
};

export const startQuiz = card => ({
  type: START_QUIZ,
  payload: card
});

export const quitQuiz = {
  type: QUIT_QUIZ
};

export const requestData = () => ({
  type: REQUEST_DATA
});

/**
 * @param {object} cards list of card objects.
 */
export const receiveData = cards => ({
  type: RECEIVE_DATA,
  payload: cards
});

export const getCards = () => (dispatch, getState) => {
  // Retrieve the current state from redux.
  const state = getState();
  console.log(state);
  /* If the `data` is an empty, trigger a loading state until
   * we receive data from the api endpoint. This prevents unnecessary
   * re-rendering of react components.
   */
  if (!state.card.data.length) {
    dispatch(requestData());
    try {
      fetchCards(cards => {
        dispatch(receiveData(cards));
      });
    } catch (error) {
      //TODO Handle error
      console.log("error");
    }
  }
};

export const removeCard = id => (dispatch, getState) => {
  // Retrieve the current state from redux.
  const state = getState();
  console.log(state);

  if (state.card.data.length) {
    try {
      deleteCard(1, () => {
        console.log("called");
        dispatch(deleteCardAction(id));
      });
    } catch (error) {
      //TODO Handle error
      console.log("error");
    }
  }
};
