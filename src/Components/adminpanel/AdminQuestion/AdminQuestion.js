import React, { useState } from 'react';
import { notification, Icon, Modal } from 'antd';
import './AdminQuestion.css';

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
      setQuestion(questionForm);
      setResources(questionForm.resources);
    } else {
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
    if (question.text_question && question.number_question && question.type_response) {
      buildQuestionData();
      setIsModal(false);
      event.preventDefault();
      notification.open({
        style: { color: 'white', background: '#1abc9c' },
        placement: 'bottomRight',
        message: `${buttonName === 'Modifier la question' ? 'Modification réussie !' : 'Ajout réussi !'}`,
        description: `La question ${question.number_question} a bien été 
        ${buttonName === 'Modifier la question' ? 'modifiée' : 'ajoutée'} !`,
        icon: <Icon type="smile" style={{ color: 'white' }} />,
      });
    }
  };

  return (
    <div>
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
            className="btn btn-light"
          >
            {buttonName}
          </button>
        )}
      <Modal
        destroyOnClose
        title="Question / Ressources "
        visible={isModal}
        className="modal-set-question"
        onOk={e => handleSubmit(e)}
        onCancel={() => setIsModal(false)}
        max-width="55em"
      >

        <div className="card-block">
          <h4><span className="block-number-question">4.1</span>Question</h4>
          <label htmlFor="input-question">
            Question<span className="asterixetobelix">*</span> :
            <div>
              <input
              type="text"
              className="form-control div-input-question"
              id="input-question"
              data-key="text_question"
              value={question.text_question}
              onChange={onQuestionInputChange}
            />
            </div>
          </label>

          <div>
            <label htmlFor="input-question-number">
              Numéro de la question<span className="asterixetobelix">*</span> :
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
              Photo de la question :
              <input
                type="url"
                className="form-control"
                rows="1"
                id="1"
                data-key="image_question"
                value={question.image_question}
                onChange={onQuestionInputChange}
              />
            </label>
          </div>
          <fieldset className="form-group">
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="inlineRadio1">
                Type de réponse liée <span className="asterixetobelix">*</span> :
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
        </div>

        <div className="card-block">
          <h4><span className="block-number-question">4.2</span>Ressources associées :</h4>
          <div>
            <div>
              {resources.map((resource, i) => (
                <div className="block-resource">
                  <textarea
                    className="form-control"
                    placeholder="Lien"
                    rows="1"
                    id={i}
                    data-key="url_resource"
                    value={resource.url_resource}
                    onChange={onResourceInputChange}
                  />
                  <br />
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Type de ressource :
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
                      Livre
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
                      Musique
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
                      Vidéo
                      </label>
                  </div>
                  <div>
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
      </Modal>
    </div>
  );
};

export default AdminQuestion;
