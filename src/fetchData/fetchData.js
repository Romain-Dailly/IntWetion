import axios from 'axios';

// Get id, name, image & description of all cards
const fetchAllCards = () => {
  axios.get('http://localhost:8080/cards/').then(res => res.data);
};

// Get all from a card with its id
const fetchCard = (id, callback) => {
  axios.get('http://localhost:8080/card/', { params: { id } }).then((resp) => {
    callback(resp.data);
  });
};

// Delete all from a card with its id
const deleteCard = (id) => {
  axios.delete('http://localhost:8080/card/', { params: { id } }).then(() => {});
};

// Post a new card with all in it
const postCard = (card) => {
  axios.post('http://localhost:8080/card/', card).then(() => {});
};

// Modify a card by posting the new one with id
// Needs a get before to access to content of before changes card
const putCard = (card, id) => {
  axios.put('http://localhost:8080/card/', { params: { id } }, card).then(() => {});
};

export {
  fetchAllCards, fetchCard, deleteCard, postCard, putCard,
};
