/* eslint-disable no-unused-expressions */
import { Table, Divider } from 'antd';

const tableQuestion = [
  {
    title: 'numéro',
    dataIndex: 'numéro',
    key: 'numéro',
  },
  {
    title: 'texte',
    dataIndex: 'texte',
    key: 'texte',
  },
  {
    title: 'nombre de ressources',
    dataIndex: 'ressourcesLength',
    key: 'ressourcesLength',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
     
  },
];
 

<Table dataSource={adminInputQuestions.map((q, i)=> q={...q, ...i: i})}>
  <Column title="Numéro" dataIndex="number_question" key="number_question" />
  <Column title="Texte" dataIndex="text_question" key="text_question" />
  <Column
    title="Action"
    key="action"
    render={(question) => (
      <div>
      <AdminQuestion
                          buttonName="Modifier la question"
                          questionForm={question}
                          getModalInfo={questio => modifyQuestion(questio, question.i)}
                        />
                        <button
                          onClick={() => deleteQuestion(question.i)}
                          type="button"
                          className="btn btn-primary"
                        >
                          Supprimer
                        </button>
                        </div>
    )
    }
  />
</Table>
<div>
        <Button type="primary" onClick={()=>{resetModal();setIsModal(true);}}>
          {buttonName}
        </Button>
        <Modal
          title="Espace questions"
          visible={isModal}
          onOk={handleSubmit()}
          onCancel={setIsModal(false)}
        >
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
                  <div className="col-3">Ressources liées :</div>
                  <div className="col-9">
                    <div>
                      {resources.map((resource, i) => (
                        <div className="col-9" style={{ border: '1px black solid' }}>
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
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
        </Modal>
      </div>