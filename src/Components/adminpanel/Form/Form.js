import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Form.css';
import AdminQuestion from '../AdminQuestion/AdminQuestion';

function Form() {
  const cardIndex = useSelector(store => store.router.location.state);
  const cardData = useSelector(store => store.card.data[cardIndex]);

  // Hook pour le titre du formulaire
  const [formState, setFormState] = useState('Créer une nouvelle carte');
  // Hook pour l'élément card
  const [adminInput, setAdminInput] = useState({
    card: {
      name: '',
      image: '',
      description: '',
      online: 1,
      payment: 0,
      date: 0,
    },
    videos: [
      {
        url_video: '',
        type_video: 1,
      },
      {
        url_video: '',
        type_video: 2,
      },
      {
        url_video: '',
        type_video: 3,
      },
    ],
    questions: [],
  });

  // Hook pour l'élément question
  const [adminInputQuestions, setAdminInputQuestions] = useState([]);

  // Hook pour définir le titre, le préremplissage du formulaire
  // au lancement du rendu
  useEffect(() => {
    if (cardData) {
      setFormState('Modifier la carte');
      setAdminInput(cardData);
      setAdminInputQuestions(cardData.questions);
    }
  }, []);

  // Organisation et filtrage des données pour le put et le post
  const buildCardData = () => {
    const questionsForPut = adminInputQuestions.map(question => ({
      number_question: question.number_question,
      text_question: question.text_question.replace('"', "'"),
      image_question: question.image_question.replace('"', "'"),
      type_response: question.type_response,
      has_comment: question.has_comment,
      resources: question.resources.map(res => ({
        url_resource: res.url_resource.replace('"', "'"),
        type_resource: res.type_resource,
      })),
    }));
    return {
      card: {
        bg_color: adminInput.card.bg_color,
        description: adminInput.card.description.replace('"', "'"),
        image: adminInput.card.image.replace('"', "'"),
        name: adminInput.card.name.replace('"', "'"),
        online: adminInput.card.online,
        payment: adminInput.card.payment,
      },
      videos: adminInput.videos,
      questions: questionsForPut,
    };
  };

  // Fonction qui crée une question vide et ouvre la modale
  // pour la modifier
  const addQuestion = (question) => {
    setAdminInputQuestions([...adminInputQuestions, question]);
  };

  // Fonction pour modifier le hook des questions à la fermeture de la modale question
  // fonction élastique appellée dans le composant modale avec les données
  const modifyQuestion = (question, i) => {
    const finalQuestions = [...adminInputQuestions];
    finalQuestions[i] = question;
    setAdminInputQuestions(finalQuestions);
  };

  const deleteQuestion = (i) => {
    setAdminInputQuestions([
      ...adminInputQuestions.slice(0, i),
      ...adminInputQuestions.slice(i + 1),
    ]);
  };

  // Envoie la totalité du formulaire stockée dans hook adminInput
  // lors du click sur le bouton enregistrer.
  // Si on a un id dans le hook, c'est que l'on a reçu des données
  // et c'est un put, sinon, c'est un post
  const handleSubmit = (event) => {
    event.preventDefault();
    if (adminInput.card.id && adminInput.card.date !== 0) {
      return axios
        .put(`http:///localhost:8080/card/?id=${adminInput.card.id}`, buildCardData())
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
        });
    }
    return axios.post('http:///localhost:8080/card/', buildCardData()).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
    });
  };

  // Fonction qui gère les onChange du hook adminInput
  const onCardInputChange = ({ target }) => {
    const { value } = target;
    const newObj = { ...adminInput };
    const dataKey = target.getAttribute('data-key');
    newObj.card[dataKey] = value;
    setAdminInput(newObj);
  };

  // Fonction qui gère les onChange du hook adminInput.vidéos
  const onVideoInputChange = ({ target }) => {
    const { value, id } = target;
    const newObj = { ...adminInput };
    const dataKey = target.getAttribute('data-key');
    newObj.videos[id][dataKey] = value;
    setAdminInput(newObj);
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 div-menu">Administration du site</div>
          <div className="container-adminInput col-10">
            <form className="pr-5 divForm">
              <div>
                <h1>{formState}</h1>
                <label htmlFor="formGroupExampleInputcard" className="divcard">
                  Entrez le nom de la carte :
                  <input
                    type="text"
                    className="form-control mr-5 div-input-question col-10"
                    id="formGroupExampleInput"
                    data-key="name"
                    value={adminInput.card.name}
                    onChange={onCardInputChange}
                  />
                </label>
              </div>
              <div className="colorP d-flex justify-content-center">
                <label htmlFor="color">
                  Couleur du thème
                  <input
                    type="color"
                    className="form-control col-6 p-0 m-0"
                    id="color"
                    rows="6"
                    data-key="bg_color"
                    value={adminInput.card.bg_color}
                    onChange={onCardInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Description
                  <textarea
                    className="form-control col-10"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    data-key="description"
                    value={adminInput.card.description}
                    onChange={onCardInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Lien, image de la carte
                  <textarea
                    className="form-control col-10"
                    id="exampleFormControlTextarea1"
                    rows="1"
                    data-key="image"
                    value={adminInput.card.image}
                    onChange={onCardInputChange}
                  />
                </label>
              </div>
              <h2>Vidéos / Musique</h2>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Lien, vidéo-intro de la carte
                  <textarea
                    className="form-control col-10"
                    id="0"
                    rows="1"
                    data-key="url_video"
                    value={adminInput.videos[0].url_video}
                    onChange={onVideoInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Lien, musique
                  <textarea
                    className="form-control col-10"
                    rows="1"
                    id="1"
                    data-key="url_video"
                    value={adminInput.videos[1].url_video}
                    onChange={onVideoInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Lien, vidéo, fin de test
                  <textarea
                    className="form-control col-10"
                    rows="1"
                    id="2"
                    data-key="url_video"
                    value={adminInput.videos[2].url_video}
                    onChange={onVideoInputChange}
                  />
                </label>
              </div>
              <div className="form-group d-flex flex-column">
                <p>Définissez la visibilité de la carte :</p>
                <div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptionsOnline"
                        id="inlineRadio1"
                        data-key="online"
                        value={1}
                        checked={adminInput.card.online === 1 ? 'checked' : null}
                        onChange={onCardInputChange}
                      />
                      En ligne
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptionsOnline"
                        id="inlineRadio2"
                        data-key="online"
                        value={0}
                        checked={adminInput.card.online === 0 ? 'checked' : null}
                        onChange={onCardInputChange}
                      />
                      Hors ligne
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group d-flex flex-column">
                <p>Statut commercial de la carte :</p>
                <div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptionsPayment"
                        id="inlineRadio1"
                        data-key="payment"
                        value={1}
                        checked={adminInput.card.payment === 1 ? 'checked' : null}
                        onChange={onCardInputChange}
                      />
                      Payante
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptionsPayment"
                        id="inlineRadio2"
                        data-key="payment"
                        value={0}
                        checked={adminInput.card.payment === 0 ? 'checked' : null}
                        onChange={onCardInputChange}
                      />
                      Gratuite
                    </label>
                  </div>
                </div>
              </div>
              <h2>Questions / Ressources</h2>
              <div>
                {adminInputQuestions.length > 0
                  && adminInputQuestions.map((question, i) => (
                    <div className="d-flex bg-light">
                      <div className="d-flex">
                        <p>
texte :
                          {question.text_question}
                        </p>
                        <p>
numero :
                          {question.number_question}
                        </p>
                      </div>
                      <div className="ml-5">
                        <AdminQuestion
                          buttonName="Modifier la question"
                          questionForm={question}
                          getModalInfo={questio => modifyQuestion(questio, i)}
                        />
                        <button
                          onClick={() => deleteQuestion(i)}
                          type="button"
                          className="btn btn-primary"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                <AdminQuestion
                  key="-1"
                  buttonName="Ajouter une question"
                  questionForm="non"
                  getModalInfo={addQuestion}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
