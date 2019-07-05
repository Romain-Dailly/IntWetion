import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import AdminQuestion from '../AdminQuestion/AdminQuestion';

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
  const [adminInputQuestions, setAdminInputQuestions] = useState([]);

  // Puting all the information in the hook card before the post
  const buildCardData = () => {
  
  };

  const addQuestion = (question) => {
    setAdminInputQuestions([...adminInputQuestions, question]);
  }

  const modifyQuestion = (question, i) => {
    let finalQuestions = [ ...adminInputQuestions ];
    finalQuestions[i] = question;
    setAdminInputQuestions(finalQuestions);
  }

  const deleteQuestion = (i) => {
    setAdminInputQuestions([...adminInputQuestions.slice(0, i), adminInputQuestions.slice(i+1)]);
  }

console.log(adminInputQuestions)
  // Envoie la totalité du formulaire stockée dans hook card
  // lors du click sur le bouton enregistrer.
  const handleSubmit = (event) => {
    buildCardData();
    event.preventDefault();
    axios.post('http:///localhost:8080/card/', adminInput)
      .then((response) => {
        console.log(response);
      });
  };

  // Fonction qui gère les onChange du hook card
  const onCardInputChange = ({ target }) => {
    const { value } = target;
    const newObj = { ...adminInput };
    const dataKey = target.getAttribute('data-key');
    newObj.card[dataKey] = value;
    setAdminInput(newObj);
  };
  // console.log(adminInput);

  // Fonction qui gère les onChange du hook vidéo
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
              <h1>Espace questions</h1>
              <div>
                {adminInputQuestions.map((question, i) => {
                  return <div key={i} className="d-flex bg-light">
                  <div className="d-flex"> 
                    <p>texte : {question.text_question}</p>
                    <p>numero : {question.number_question}</p>
                  </div>
                  <div className="ml-5">
                  <AdminQuestion key={i} buttonName ='Modifier la question' questionForm={question} getModalInfo={modifyQuestion} />
                  <button
                  onClick={()=> deleteQuestion (i)}
                  type="button"
                  className="btn btn-primary">Supprimer</button>
                  </div>
                  </div>
                })}
                <AdminQuestion key='-1' buttonName='Ajouter une question' questionForm='non' getModalInfo = {addQuestion} />
                </div> 
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
