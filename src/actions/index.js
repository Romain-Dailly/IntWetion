import {
  START_QUIZ,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
  GET_DATA
} from "./types";

export const addCard = {
  type: ADD_CARD
};
export const deleteCard = {
  type: DELETE_CARD
};
export const editCard = {
  type: EDIT_CARD
};
export const getCardData = {
  type: GET_DATA
};

export const startQuiz = card => ({
  type: START_QUIZ,
  payload: card
});
