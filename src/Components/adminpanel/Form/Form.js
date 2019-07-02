import React, { useState } from 'react';
import axios from 'axios';

import './Form.css';

function Form() {
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
  const [adminInputQuestions, setAdminInputQuestions] = useState([],
  );

  // Hook pour l'élément resource
  const [adminInputResource, setAdminInputResource] = useState([]);

  // Envoie la totalité du formulaire stockée dans hook card
  // lors du click sur le bouton enregistrer.
  const handleSubmit = (event) => {
    buildCardData()
    event.preventDefault();
    // axios.post('http:///localhost:8080/card/', adminInput)
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  // Fonction qui gère les onChange du hook card
  const onCardInputChange = ({ target }) => {
    const { value } = target;
    const newObj = { ...adminInput };
    const dataKey = target.getAttribute('data-key');
    newObj.card[dataKey] = value;
    setAdminInput(newObj);
  };
  console.log(adminInput);

  // Fonction qui gère les onChange du hook vidéo
  const onVideoInputChange = ({ target }) => {
    const { value, id } = target;
    const newObj = { ...adminInput };
    const dataKey = target.getAttribute('data-key');
    newObj.videos[id][dataKey] = value;
    setAdminInput(newObj);
  };

  // Fonction qui gère les onChange du hook question, peut être fusionnée avec onVideoInputChange
  // const onQuestionInputChange = ({ target }) => {
  //   const { value } = target;
  //   const newObj = { ...adminInputQuestion };
  //   const dataKey = target.getAttribute('data-key');
  //   newObj[dataKey] = value;

  //   setAdminInputQuestion(newObj);
  // }

  console.log(adminInputResource);


  // Fonction qui gère les onChange du hook resources
  const onResourceInputChange = ({ target }) => {
    const { value } = target;
    const newObj = { ...adminInputResource };
    const dataKey = target.getAttribute('data-key');
    newObj[dataKey] = value;
    newObj.questionNumber = adminInputQuestion.number_question;
    setAdminInputResource([newObj]);
  }


  const buildCardData = () => {
    const resources = adminInputResource.filter(
      resource => resource.questionNumber === adminInputQuestion.number_question);
    adminInputQuestion.resources = resources;
    adminInput.questions = adminInputQuestion;

    console.log(adminInput);
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 div-menu">Administration du site</div>
          <div className="container-adminInput col-10">
            <form className="pr-5 divForm">
              <div>
                <label htmlFor="formGroupExampleInputcard" className="divcard">
                  Entrez le nom de la carte :
                  <input type="text" className="form-control mr-5 div-input-question col-10" id="formGroupExampleInput" data-key="name" value={adminInput.card.name} onChange={onCardInputChange} />
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
                  <textarea className="form-control col-10" id="exampleFormControlTextarea1" rows="1" data-key="image" onChange={onCardInputChange} />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Lien, vidéo-intro de la carte
                  <textarea className="form-control col-10" id="0" rows="1" data-key="url_video" value={adminInput.videos.url_video} onChange={onVideoInputChange} />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Lien, musique
                  <textarea className="form-control col-10" rows="1" id="1" data-key="url_video" value={adminInput.videos.url_video} onChange={onVideoInputChange} />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Lien, vidéo, fin de test
                  <textarea className="form-control col-10" rows="1" id="2" data-key="url_video" value={adminInput.videos.url_video} onChange={onVideoInputChange} />
                </label>
              </div>
              <div className="form-group d-flex flex-column">
                <p>Définissez la visibilité de la carte :</p>
                <div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      <input className="form-check-input" type="radio" name="inlineRadioOptionsOnline" id="inlineRadio1" data-key="online" value={0} onChange={onCardInputChange} />
                      En ligne
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      <input className="form-check-input" type="radio" name="inlineRadioOptionsOnline" id="inlineRadio2" data-key="online" value={1} onChange={onCardInputChange} />
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
                      <input className="form-check-input" type="radio" name="inlineRadioOptionsPayment" id="inlineRadio1" data-key="payment" value={1} onChange={onCardInputChange} />
                      Payante
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      <input className="form-check-input" type="radio" name="inlineRadioOptionsPayment" id="inlineRadio2" data-key="payment" value={2} onChange={onCardInputChange} />
                      Gratuite
                    </label>
                  </div>
                </div>
              </div>
              <h1>Espace test</h1>
              <div>
                <div className="d-flex div-question-bouton" row="1">
                  <label htmlFor="formGroupExampleInput" className="col-10">
                    Ecrivez votre question :
                    <input type="text" className="form-control div-input-question col-10" id="formGroupExampleInput" data-key="text_question" value={adminInputQuestion.text_question} onChange={onQuestionInputChange} />
                  </label>
                  <button type="button" className="btn btn-secondary btn-delete">Supprimer</button>
                </div>
              </div>
              <div>
                <label htmlFor="formGroupExampleInput" className="col-10">
                  Ecrivez le numéro de la question :
                  <input type="text" className="form-control mr-5 div-input-question" id="formGroupExampleInput" placeholder="ex: 1.2" data-key="number_question" value={adminInputQuestion.number_question} onChange={onQuestionInputChange} />
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Ajoutez une photo qui sera affichée avec la question (lien) :
                  <textarea className="form-control col-10" rows="1" id="1" data-key="image_question" value={adminInputQuestion.image_question} onChange={onQuestionInputChange} />
                </label>
              </div>
              <br />
              <p>Type de réponse liée :</p>
              <fieldset className="form-group">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" data-key="type_response" value={1} onChange={onQuestionInputChange} />
                    Numérique
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" data-key="type_response" value={2} onChange={onQuestionInputChange} />
                    Texte
                  </label>
                </div>
              </fieldset>
              <br />
              <div className="row">
                <div className="col-3">
                  Ressources liées :
                </div>
                <div className="col-9">
                  <div className="form-row">
                    <div className="col-3">
                      <input type="text" className="form-control" placeholder="Nom" data-key="" />
                    </div>
                    <div className="col-9">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Lien"
                        rows="1"
                        id="1"
                        data-key="url_resource"
                        value={adminInputResource.url_resource}
                        onChange={onResourceInputChange} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="mr-2 d-inline-block">Ajouter un champ ressource supplémentaire</p>
                    <i className="fas fa-plus-circle" />
                  </div>
                </div>
                <div className="mt-4">
                  <i className="fas fa-plus-circle" />
                  <p className="ml-4 d-inline-block">Ajouter un champ ressource supplémentaire</p>
                </div>
              </div>
              <button onClick={handleSubmit} className="btn btn-primary mt-5 mb-5" value="submit" type="submit">Enregistrer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
