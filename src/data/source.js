/**
 * @file
 * This file contains some helper functions for accessing web services.
 *
 * To use these helper functions;
 * 1: Install axios using `yarn add axios` or `npm install axios`
 * 2: Import them into your javaScript file using
 * `import { '<function names separated with a comma>' } from '<path>;`
 * 3: Invoke the function of your choice and pass the required parameters.
 * Example `const data = fetchCards()`
 */

import axios from 'axios';

// const BASE_URL = "http://localhost:8080/";
const TEST_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Performs an HTTP GET request using the [axios api]{@link https://github.com/axios/axios}
 * @param {string} path The URL path to be appended to the base server URL.
 * @param {object} params Optional: The URL parameters to be sent with the request.
 */
const requestData = (path, params = {}) => {
  // axios config options for making network requests
  const config = {
    baseURL: TEST_BASE_URL,
    params: { ...params },
  };
  // Perform a GET request wih the provided path and config options
  return axios.get(path, config);
};

/**
 * Performs an HTTP DELETE  request using the [axios api]{@link https://github.com/axios/axios}
 * @param {string} path The URL path to be appended to the base server URL.
 * @param {object} params Optional: The URL parameters to be sent with the request.
 */
const deleteData = (path, params = {}) => {
  // axios config options for making network requests
  const config = {
    baseURL: TEST_BASE_URL,
    params: { ...params },
  };
  // Perform a GET request wih the provided path and config options
  return axios.delete(path, config);
};

/**
 * Get a list of card data.
 *
 * This function doesn't have any built in error handling.
 * Try to invoked it within a try-catch block or any other means.
 *
 * @param {function} callback A function that receives the parsed HTTP
 *  response as an argument.
 */
const fetchCards = async (callback) => {
  // const path = "/cards";
  const path = '/posts';
  const response = await requestData(path);
  // The request was successful. Pass it to the callback function.
  callback(response.data);
};

/**
 * @param {number} id The id of a specific card.
 * @param {function} callback A function that receives the parsed HTTP
 *  response as an argument.
 */
const fetchCard = async (id, callback) => {
  // const path = "/cards";
  const path = '/posts';
  const response = await requestData(path);
  // The request was successful. Pass it to the callback function.
  callback(response.data);
};

// Delete all from a card with its id
const deleteCard = async (id, callback) => {
  const path = `posts/${id}`;
  const deleted = await deleteData(path);
  if (deleted.status === 200) {
    callback();
  }
};

// Post a new card with all in it
const postCard = (card) => {
  axios
    .post('http://localhost:8080/card/', card)
    .then(resp => console.log(resp));
};

// Modify a card by posting the new one with id
// Needs a get before to access to content of before changes card
const putCard = (card, id) => {
  axios
    .put('http://localhost:8080/card/', { params: { id } }, card)
    .then(resp => console.log(resp));
};

export {
  fetchCards, fetchCard, deleteCard, postCard, putCard,
};
