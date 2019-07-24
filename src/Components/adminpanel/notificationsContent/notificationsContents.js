const postOk = (cardName, icon) => ({
  style: { color: 'white', background: '#1abc9c' },
  placement: 'bottomRight',
  message: 'Ajout réussi !',
  description: `La carte ${cardName} a bien été ajoutée en base de données! 
  Actualisez la page pour voir la nouvelle carte`,
  icon,
});
const postNo = (cardName, response, icon) => ({
  style: { color: 'red', background: 'white' },
  placement: 'topRight',
  message: `Erreur ${response}!`,
  description: `La carte ${cardName} n'a pas pu être ajoutée en base de données!`,
  icon,
});
const postError = (cardName, icon) => ({
  style: { color: 'red', background: 'white' },
  placement: 'topRight',
  message: 'Erreur de connexion!',
  description: `La carte ${cardName} n'a pas pu être ajoutée en base de données!`,
  icon,
});
const putOk = (cardName, icon) => ({
  style: { color: 'white', background: '#1abc9c' },
  placement: 'bottomRight',
  message: 'Modification réussie !',
  description: `La carte ${cardName} a bien été modifiée en base de données!`,
  icon,
});

const putNo = (cardName, response, icon) => ({
  style: { color: 'red', background: 'white' },
  placement: 'topRight',
  message: `Erreur ${response}!`,
  description: `La carte ${cardName} n'a pas pu être modifiée en base de données!`,
  icon,
});

const putError = (cardName, icon) => ({
  style: { color: 'red', background: 'white' },
  placement: 'topRight',
  message: 'Erreur de connexion!',
  description: `La carte ${cardName} n'a pas pu être modifiée en base de données!`,
  icon,
});
const modalPush = (buttonName, number, icon) => ({
  style: { color: 'white', background: '#1abc9c' },
  placement: 'bottomRight',
  message: `${
    buttonName === 'Modifier la question' ? 'Modification réussie !' : 'Ajout réussi !'
  }`,
  description: `La question ${number} a bien été 
  ${buttonName === 'Modifier la question' ? 'modifiée' : 'ajoutée'} !`,
  icon,
});
export {
  postOk, postNo, postError, putOk, putNo, putError, modalPush,
};
