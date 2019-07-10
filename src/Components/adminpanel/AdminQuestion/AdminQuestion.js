import React, { useState } from 'react';

const AdminQuestion = ({ getModalInfo, questionForm, buttonName }) => {
  // Hooks question et resources
  const [question, setQuestion] = useState({});
  const [resources, setResources] = useState([
    {
      url_resource: '',
      type_resource: 0,
    },
  ]);
  // Hook pour ouvrir et fermer la modale
  const [isModal, setIsModal] = useState(false);

  // Fonction qui permet de récupérer les données
  // envoyées en props pour définir les hooks et
  // avoir un préremplissage si données
  const resetModal = () => {
    if (questionForm !== 'non') {
      console.log('ok if');
      setQuestion(questionForm);
      setResources(questionForm.resources);
    } else {
      console.log('ok else');
      setQuestion({});
      setResources([
        {
          url_resource: '',
          type_resource: 0,
        },
      ]);
    }
  };
  // Fonction qui gère les onChange du hook question
  const onQuestionInputChange = ({ target }) => {
    const { value } = target;
    const newQuestion = { ...question };
    const dataKey = target.getAttribute('data-key');
    newQuestion[dataKey] = value;
    setQuestion(newQuestion);
  };

  // Fonction qui gère les onChange du hook resources
  const onResourceInputChange = (event) => {
    const newValues = [...resources];
    const { id } = event.target;
    const dataKey = event.target.getAttribute('data-key');
    newValues[id][dataKey] = event.target.value;
    setResources(newValues);
  };

  // Fonction pour créer une ressource vide
  const addResource = (event) => {
    event.preventDefault();
    setResources([...resources, { url_resource: '', type_resource: 0 }]);
  };

  const deleteResource = (index) => {
    setResources([...resources.slice(0, index), ...resources.slice(index + 1)]);
  };

  // Envoi des données de la question dans la prop
  // fonction élastique vers le parent
  const buildQuestionData = () => {
    const finalQuestion = { ...question };
    finalQuestion.resources = resources;
    getModalInfo(finalQuestion);
  };

  // Fonction handlesubmit et fermeture de modale
  const handleSubmit = (event) => {
    if (question.text_question && question.number_question && question.type_response) {
      buildQuestionData();
      setIsModal(false);
      event.preventDefault();
    } else {
      return alert('Remplissez les champs obligatoires (*)');
    }
  };

  return (
    <div>
      <button
        onClick={() => { resetModal(); setIsModal(true); }}
        type="button"
        className="btn btn-primary"
      >
        {buttonName}
        {' '}

      </button>
      {isModal && (
      <div className="overlay">
        <div className="overlay-content">
          <div className="content">
            <h5
              className="modal-title"
              id="exampleModalCenterTitle"
            >
Espace questions
            </h5>
            <form>
              <div className="d-flex div-question-bouton" row="1">
                <label htmlFor="input-question" className="col-10">
                  Ecrivez votre question* :
                  <input
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
                  Ecrivez le numéro de la question* :
                  <input
                    type="number"
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
                  <input
                    type="url"
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
              <p>Type de réponse liée* :</p>
              <fieldset className="form-group">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <input
                      checked={question.type_response === 1 ? 'checked' : null}
                      className="form-check-input"
                      name="inlineRadioOptionsType_response"
                      type="radio"
                      id="inlineRadiobox1"
                      data-key="type_response"
                      value={1}
                      onChange={onQuestionInputChange}
                    />
                    Numérique
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <input
                      checked={question.type_response === 2 ? 'checked' : null}
                      className="form-check-input"
                      name="inlineRadioOptionsType_response"
                      type="radio"
                      id="inlineRadiobox2"
                      data-key="type_response"
                      value={2}
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
                    {resources.map((resource, i) => (
                      <div className="col-9" style={{ border: '1px black solid' }} key={i}>
                  <textarea
                          key={i}
                          type="text"
                          className="form-control"
                          placeholder="Lien"
                          rows="1"
                          id={i}
                          data-key="url_resource"
                          value={resource.url_resource}
                          onChange={onResourceInputChange}
                        />
                  <br />
                  <p>Type de ressource:</p>
                  <div className="form-check form-check-inline">
                          <label className="form-check-label" htmlFor="inlineRadio1">
                            <input
                              checked={resource.type_resource === 1 ? 'checked' : null}
                              className="form-check-input"
                              name={`inlineRadioOptionsType_resource${i}`}
                              type="radio"
                              id={i}
                              data-key="type_resource"
                              value={1}
                              onChange={onResourceInputChange}
                            />
                            Lire
                          </label>
                        </div>
                  <div className="form-check form-check-inline">
                          <label className="form-check-label" htmlFor="inlineRadio2">
                            <input
                              checked={resource.type_resource === 2 ? 'checked' : null}
                              className="form-check-input"
                              name={`inlineRadioOptionsType_resource${i}`}
                              type="radio"
                              id={i}
                              data-key="type_resource"
                              value={2}
                              onChange={onResourceInputChange}
                            />
                            Ecouter
                          </label>
                        </div>
                  <div className="form-check form-check-inline">
                          <label className="form-check-label" htmlFor="inlineRadio3">
                            <input
                              checked={resource.type_resource === 3 ? 'checked' : null}
                              className="form-check-input"
                              name={`inlineRadioOptionsType_resource${i}`}
                              type="radio"
                              id={i}
                              data-key="type_resource"
                              value={3}
                              onChange={onResourceInputChange}
                            />
                            Voir
                          </label>
                        </div>
                  <button onClick={(e) => { e.preventDefault(); deleteResource(i); }}>Supprimer la ressource</button>
                </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button onClick={addResource}>Ajouter une ressource</button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => {
                  handleSubmit(event);
                }
                }
              >
Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setIsModal(false)}
                className="btn btn-secondary"
              >
Fermer
              </button>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminQuestion;
