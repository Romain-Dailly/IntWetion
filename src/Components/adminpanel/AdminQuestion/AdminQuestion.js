import React, { useState } from 'react';
import { notification, Icon, Modal } from 'antd';
import { modalPush } from '../notificationsContent/notificationsContents';
import './AdminQuestion.css';

const AdminQuestion = ({ getModalInfo, questionForm, buttonName }) => {
  // Hooks question et resources
  const [question, setQuestion] = useState({});
  const [resources, setResources] = useState([]);
  // Hook pour ouvrir et fermer la modale
  const [isModal, setIsModal] = useState(false);

  // Fonction qui permet de récupérer les données
  // envoyées en props pour définir les hooks et
  // avoir un préremplissage si données
  const resetModal = () => {
    if (questionForm !== 'non') {
      setQuestion(questionForm);
      setResources(questionForm.resources);
    } else {
      setQuestion({});
      setResources([]);
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
  const onResourceInputChange = ({ target }) => {
    const newValues = [...resources];
    const { id } = target;
    const dataKey = target.getAttribute('data-key');
    newValues[id][dataKey] = target.value;
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
    finalQuestion.resources = resources.filter(resource => resource.url_resource !== '');
    getModalInfo(finalQuestion);
  };

  // Fonction handlesubmit et fermeture de modale
  const handleSubmit = (event) => {
    if (question.text_question && question.number_question && question.type_response && question.image_question) {
      buildQuestionData();
      setIsModal(false);
      notification.open(modalPush(buttonName, question.number_question, <Icon type="smile" style={{ color: 'white' }} />),);
      event.preventDefault();
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {buttonName === 'Modifier la question' ? (
        <i
          title="Modifier"
          tabIndex="-1"
          role="button"
          className="icon-edit"
          onClick={() => {
            resetModal();
            setIsModal(true);
          }}
        />
      ) : (
        <button
          onClick={() => {
            resetModal();
            setIsModal(true);
          }}
          type="button"
          className="btn btn-success"
        >
          {buttonName}
        </button>
      )}
      <Modal
        destroyOnClose
        okButtonProps={{ htmlType :"submit", form:"myform"}}
        cancelText="Fermer"
        okText="Enregistrer"
        title="Espace questions"
        visible={isModal}
        onOk={e => handleSubmit(e)}
        onCancel={() => setIsModal(false)}
      >
        <form id="myform">
          <div className="d-flex div-question-bouton" row="1">
            <label htmlFor="input-question" className="col-10">
              Ecrivez votre question* :
              <input
                required
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
                required
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
                  required
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
                  required
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
            <div className="col-3">Ressources liées :</div>
            <div className="col-9">
              <div>
                {resources.map((resource, i) => (
                  <div className="col-9" style={{ border: '1px black solid' }}>
                    <textarea
                      required
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
                          required
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
                          required
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
                          required
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteResource(i);
                      }}
                    >
                      Supprimer la ressource
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button type="button" onClick={addResource}>
                  Ajouter une ressource
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminQuestion;
