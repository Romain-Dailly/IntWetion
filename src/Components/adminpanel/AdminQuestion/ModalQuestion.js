import React, { useState, useRef } from 'react';
// import AdminQuestion from './AdminQuestion';


const ModalQuestion = ({ getModalInfo, questionForm, key, clearQuestion}) => {
  
  const inputQuestion = useRef();
  const [question, setQuestion] = useState({});
  const [resources, setResources] = useState([
    {
      url_resource: ""
    }
  ]);


 const resetModal= () => {
   if (questionForm !== 'non'){
     console.log('ok if')
    clearQuestion(inputQuestion);
     setQuestion(questionForm);
     setResources(questionForm.resources);
   } else {
     console.log('ok else')
    clearQuestion(inputQuestion); 
    setQuestion({});
          setResources([
          {
            url_resource: ""
          }
      ])
    } 
 };
  // Fonction qui gère les onChange du hook question
  const onQuestionInputChange = ({ target }) => {
    const { value } = target;
    const newQuestion = { ...question };
    const dataKey = target.getAttribute('data-key');
    newQuestion[dataKey] = value;
    setQuestion(newQuestion);
  }

  // Fonction qui gère les onChange du hook resources
  const onResourceInputChange = (event) => {
    let newValue = [...resources];
    let id = event.target.id;
    newValue[id].url_resource = event.target.value;
    setResources(newValue);
  }

  const addResource = (event) => {
    event.preventDefault();
    setResources([...resources, { url_resource: '' }]);
  }

  const buildQuestionData = () => {
    let finalQuestion = { ...question };
    finalQuestion.resources = resources;
    getModalInfo(finalQuestion);
  }

  const handleSubmit = (event) => {
    buildQuestionData();
    event.preventDefault(); 
}
console.log(question, resources)
  return (
    <div>
      <button
        onClick={() => {resetModal()}}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >Ajouter une question </button>
      <div 
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      >
            <div data className="modal-dialog modal-dialog-centered" role="document">
     <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Espace questions</h5>
              <button 
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <div className="d-flex div-question-bouton" row="1">
                  <label htmlFor="input-question" className="col-10">
                    Ecrivez votre question :
              <input 
              ref={inputQuestion}
              type="text"
              className="form-control div-input-question col-10"
              id="input-question"
              data-key="text_question"
              value={question.text_question}
              onChange={onQuestionInputChange}
              />
                  </label>
                </div>
                <div>
                  <label htmlFor="input-question-number" className="col-10">
                    Ecrivez le numéro de la question :
            <input 
            // ref={inputQuestion}
            type="text"
            className="form-control mr-5 div-input-question"
            id="inpu-question-number"
            placeholder="ex: 1.2"
            data-key="number_question"
            value={question.number_question}
            onChange={onQuestionInputChange}
            />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Ajoutez une photo qui sera affichée avec la question (lien) :
          <textarea
          // ref={inputQuestion}
          className="form-control col-10"
          rows="1"
          id="1"
          data-key="image_question"
          value={question.image_question}
          onChange={onQuestionInputChange}
          />
                  </label>
                </div>
                <br />
                <p>Type de réponse liée :</p>
                <fieldset className="form-group">
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      <input
                        checked={question.type_response === 1?"checked":null} 
                        className="form-check-input"
                        name="inlineRadioOptionsType_response"
                        type="radio"
                        id="inlineRadiobox1"
                        data-key="type_response"
                        value='1'
                        onChange={onQuestionInputChange}
                      />
                      Numérique
                     </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      <input
                      checked={question.type_response === 2?"checked":null} 
                        className="form-check-input"
                        name="inlineRadioOptionsType_response"
                        type="radio"
                        id="inlineRadiobox2"
                        data-key="type_response"
                        value='2'
                        onChange={onQuestionInputChange}
                      />
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
                    <div>
                      {resources.map((resource, i) => {
                        return (<div className="col-9" key={i}>
                          <textarea 
                            key={i} 
                            type="text"
                            className="form-control"
                            placeholder='Lien'
                            rows="1"
                            id={i}
                            value={resources[i].url_resource}
                            onChange={onResourceInputChange} />
                        </div>)
                      })}
                    </div>
                    <div className="mt-4">
                      <button onClick={addResource}>Ajouter ressource</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal">Fermer</button>
              <button 
              data-dismiss="modal"
              type="button"
              className="btn btn-primary"
              onClick={(event) => {
                 handleSubmit(event);
              }
              }
              >Enregistrer</button>
              </div>
          </div><
        </div>

        {/* <AdminQuestion
          getModalInfo={getModalInfo}
          question={question}
          /> */}



      </div>
    </div>
  );
}

export default ModalQuestion;