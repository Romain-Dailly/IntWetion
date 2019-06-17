import React, { useState } from 'react';
import axios from 'axios';

import './Form.css';

function Form() {

  // Hook pour l'élément card
  const [adminInput, setAdminInput] = useState({
    card: {
      name: "",
      image: "",
      description: "",
      online: 0,
      payment: 0,
      date: 0,
    },
    videos: [
      {
        url_video: "",
        type_video: 1,
      },
      {
        url_video: "",
        type_video: 2,
      },
      {
        url_video: "",
        type_video: 3,
      }
    ],
    question: [],
  });
  //Hook pour l'élément question
  // const [adminInputQuestion, setAdminInputQuestion] = useState({
  //   question: {
  //     number_question: "",
  //     text_question: "",
  //     image_question: "",
  //     type_response: 1,
  //     has_comment: false,
  //     resources: [],
  //   }
  // });

  //Hook pour l'élément resource
  // const [adminInputResource, setAdminInputResource] = useState({
  //   resource: {
  //     url_resource: "",
  //     type_resource: 1,
  //   }
  // });

  // }

  // Envoie la totalité du formulaire stockée dans hook card lors du click sur le bouton enregistrer. 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http:///localhost:8080/card/', adminInput)
      .then((response) => {
        console.log(response);
      });
  }
  console.log(adminInput);

  // Fonction qu gère les onChange de card
  const onCardInputChange = ({ target }) => {
    const { value, name } = target;
    const newObj = { ...adminInput };
    newObj.card[name] = value
    setAdminInput(newObj)
    console.log(target)
  }

  //Fonction qui gère les onChange de la partie vidéo
  let onVideoInputChange = ({ target }) => {
    let { value, name, id } = target;
    const newObj = { ...adminInput };
    newObj.videos[id][name] = value
    setAdminInput(newObj)
    console.log(target)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">Administration du site</div>
        <div className="col-9">
          <form className="pr-5 divForm" control="bipbop" >
            <div className="form-group d-flex flex-column">
              <p>Que voulez-vous faire ?</p>
              <div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1" control="bipbop">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                    Ajouter une carte
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    Modifier une carte
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                    Supprimer une carte
                  </label>
                </div>
              </div>
            </div>
            <div className="container-card">
              <div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                    Présent
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    Peurs
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                    Forces
                  </label>
                </div>
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Entrez le nom de la carte :
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                  name="name"
                  value={adminInput.card.name} onChange={onCardInputChange} />
              </label>
            </div>
            <div className="form-group d-flex flex-column">
              <p>Définissez la visibilité de la carte :</p>
              <div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <input className="form-check-input" type="radio" id="inlineRadio1" value={adminInput.card.online= 1} onChange={onCardInputChange} />
                    En ligne
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <input className="form-check-input" type="radio"  id="inlineRadio2" value={adminInput.card.online= 2} onChange={onCardInputChange}  />
                    Hors ligne
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group d-flex flex-column">
              <p>Statut commercial de la carte :</p>
              <div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                    Payante
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                    Gratuite
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Description
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                  name="description"
                  value={adminInput.card.description} onChange={onCardInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Lien, image de la carte
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" name="image" onChange={onCardInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Lien, vidéo-intro de la carte
                <textarea className="form-control" id="0" rows="1" name="url_video" value={adminInput.videos.url_video} onChange={onVideoInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Lien, musique
                <textarea className="form-control" rows="1" id="1" name="url_video" value={adminInput.videos.url_video} onChange={onVideoInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Lien, vidéo, fin de test
                <textarea className="form-control" rows="1" id="2" name="url_video" value={adminInput.videos.url_video} onChange={onVideoInputChange} />
              </label>
            </div>
            <h1>Espace test</h1>
            <div className="form-group">
              <div className="d-flex">
                <label htmlFor="formGroupExampleInput">
                  Question
                  <input type="text" className="form-control mr-5" id="formGroupExampleInput" />
                </label>
                <button type="button" className="btn btn-secondary ">Supprimer</button>
              </div>
              {/* Ajouter image_question */}
            </div>
            <div>
              <p>Type de réponse liée :</p>
              <fieldset className="form-group">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" />
                    Numérique
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                    Texte
                  </label>
                </div>
              </fieldset>
              <div className="row">
                <div className="col-3">
                  Ressources liées :
                </div>
                <div className="col-9">
                  <div className="form-row">
                    <div className="col-3">
                      <input type="text" className="form-control" placeholder="Nom" />
                    </div>
                    <div className="col-9">
                      <textarea type="text" className="form-control" placeholder="Lien" rows="1" />
                    </div>
                  </div>
                  <div className="form-row mt-4">
                    <div className="col-3">
                      <input type="text" className="form-control" placeholder="Nom" />
                    </div>
                    <div className="col-9">
                      <textarea type="text" className="form-control" placeholder="Lien" rows="1" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="mr-2 d-inline-block">Ajouter un champ ressource supplémetaire</p>
                    <i className="fas fa-plus-circle" />
                  </div>
                </div>
                <div className="mt-4">
                  <i className="fas fa-plus-circle" />
                  <p className="ml-4 d-inline-block">Ajouter un champ ressource supplémentaire</p>
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary mt-5 mb-5" value="submit" type="submit">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
