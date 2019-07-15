import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import {
  Table, notification, Icon, Popconfirm, BackTop,
} from 'antd';
import _ from 'underscore';
import AdminQuestion from '../AdminQuestion/AdminQuestion';
import {
  postOk,
  postNo,
  postError,
  putOk,
  putNo,
  putError,
} from '../notificationsContent/notificationsContents';

function Form() {
  const cardIndex = useSelector(store => store.router.location.state);
  const cardData = useSelector(store => store.card.data[cardIndex]);

  // Hook redirection au handleSubmit
  const [submitted, setSubmitted] = useState(false);
  // Hook pour le titre du formulaire
  const [formState, setFormState] = useState("Création d'une nouvelle carte");
  // Hook pour l'élément card
  const [adminInput, setAdminInput] = useState({
    card: {
      name: '',
      image: '',
      description: '',
      online: 0,
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
  // Hook pour définir le titre, le préremplissage du formulaire
  // au lancement du rendu
  useEffect(() => {
    if (cardData) {
      setFormState('Modifier la carte');
      setAdminInput(cardData);
      setAdminInputQuestions(cardData.questions);
    }
  }, []);

  // data pour la table de questions, organisée par numéros
  const { Column } = Table;
  const dataQuestions = _.sortBy(
    adminInputQuestions.map(
      (question, index) => (question = { ...question, i: index, nb: question.resources.length }),
    ),
    'number_question',
  );

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

  // Organisation et filtrage des données pour le put et le post
  const buildCardData = () => {
    const questionsForPut = adminInputQuestions.length > 0
      ? adminInputQuestions.map(question => ({
        number_question: question.number_question,
        text_question: question.text_question.replace('"', "'"),
        image_question: question.image_question,
        type_response: question.type_response,
        has_comment: 0,
        resources: question.resources.map(res => ({
          url_resource: res.url_resource.replace('"', "'"),
          type_resource: res.type_resource,
        })),
      }))
      : [];
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
  // Envoie la totalité du formulaire stockée dans le hook adminInput
  // lors du click sur le bouton enregistrer si les données requises
  // ont été entrées.
  // Si l'on a un id dans le hook, c'est que l'on a reçu des données au montage
  // et c'est un put, sinon, c'est un post
  // Notifications si action réussie ou echouée
  const handleSubmit = (event) => {
    if (
      adminInput.card.name !== ''
      && adminInput.card.description !== ''
      && adminInput.card.image !== ''
      && adminInput.card.online !== ''
      && adminInput.card.payment !== ''
    ) {
      event.preventDefault();
      if (adminInput.card.id && adminInput.card.date !== 0) {
        return axios
          .put(`http://192.168.184.100:8080/card/?id=${adminInput.card.id}`, buildCardData())
          .then((response) => {
            // eslint-disable-next-line no-console
            console.log(response);
            if (response.status === 200) {
              setSubmitted(true);
              return notification.open(
                putOk(adminInput.card.name, <Icon type="smile" style={{ color: 'white' }} />),
              );
            }
            return notification.open(
              putNo(
                adminInput.card.name,
                response.status,
                <Icon type="smile" style={{ color: 'white' }} />,
              ),
            );
          })
          .catch(() => notification.open(
            putError(adminInput.card.name, <Icon type="smile" style={{ color: 'white' }} />),
          ));
      }
      return axios
        .post('http://192.168.184.100:8080/card/', buildCardData())
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          if (response.status === 200) {
            setSubmitted(true);
            return notification.open(
              postOk(adminInput.card.name, <Icon type="smile" style={{ color: 'white' }} />),
            );
          }
          return notification.open(
            postNo(
              adminInput.card.name,
              response.status,
              <Icon type="smile" style={{ color: 'white' }} />,
            ),
          );
        })
        .catch(() => notification.open(
          postError(adminInput.card.name, <Icon type="smile" style={{ color: 'white' }} />),
        ));
    }
  };

  if (submitted) {
    return (
      <Redirect
        push
        to={{
          pathname: `${process.env.PUBLIC_URL}`,
        }}
      />
    );
  }
  return (
    <div className="container-fluid">
      <div className="container-adminInput">
        <form id="form" className="pr-5 divForm">
          <h1 className="form-title">{formState}</h1>
          <div className="card-block">
            <h4>
              <span className="block-number">1</span>
              Informations / carte
            </h4>
            <label htmlFor="formGroupExampleInputcard" className="divcard">
              Nom de la carte :
              <input
                required
                placeholder="Mes points forts"
                type="text"
                className="form-control mr-5 div-input-question "
                id="formGroupExampleInput"
                data-key="name"
                value={adminInput.card.name}
                onChange={onCardInputChange}
              />
            </label>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Description :
                <textarea
                  required
                  placeholder="Description du questionnaire"
                  className="form-control "
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
                Image de la carte (lien url):
                <input
                  required
                  type="url"
                  placeholder="https://images.com"
                  className="form-control "
                  id="exampleFormControlTextarea1"
                  rows="1"
                  data-key="image"
                  value={adminInput.card.image}
                  onChange={onCardInputChange}
                />
              </label>
            </div>
            <div className="colorP d-flex">
              <p htmlFor="color">Couleur du thème : </p>
            </div>
            <input
              type="color"
              className=""
              id="color"
              rows="6"
              data-key="bg_color"
              value={adminInput.card.bg_color}
              onChange={onCardInputChange}
            />
          </div>
          <div className="card-block">
            <h4>
              <span className="block-number">2</span>
              Statut
            </h4>
            <div className="form-group d-flex flex-column">
              <p>Visibilité de la carte :</p>
              <div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <input
                      required
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
                      required
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
              <p>Statut commercial :</p>
              <div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <input
                      required
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
                      required
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
          </div>
          <h1 className="form-title">Création du questionnaire</h1>
          <div className="card-block">
            <h4>
              <span className="block-number">3</span>
              Vidéos / Musique
            </h4>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Vidéo introductive du questionnnaire :
                <input
                  type="url"
                  placeholder="https://youtube.com"
                  className="form-control "
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
                Musique du questionnaire :
                <input
                  type="url"
                  placeholder="https://youtube.com"
                  className="form-control "
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
                Vidéo de fin du questionaire :
                <input
                  type="url"
                  placeholder="https://youtube.com"
                  className="form-control "
                  rows="1"
                  id="2"
                  data-key="url_video"
                  value={adminInput.videos[2].url_video}
                  onChange={onVideoInputChange}
                />
              </label>
            </div>
          </div>

          <div className="card-block">
            <h4>
              <span className="block-number">4</span>
              Questions / Ressources
            </h4>
            <div>
              <div className="d-flex justify-content-center mb-3">
                <AdminQuestion
                  key="-1"
                  buttonName="Ajouter une question"
                  questionForm="non"
                  getModalInfo={addQuestion}
                />
              </div>
              <Table dataSource={dataQuestions}>
                <Column title="Numéro" dataIndex="number_question" key="number_question" />
                <Column title="Texte" dataIndex="text_question" key="text_question" />
                <Column title="Ressources" dataIndex="nb" key="nb" />
                <Column
                  title="Action"
                  key="action"
                  render={question => (
                    <div>
                      <AdminQuestion
                        buttonName="Modifier la question"
                        questionForm={question}
                        getModalInfo={questio => modifyQuestion(questio, question.i)}
                      />
                      <div className="d-flex justify-content-center">
                        <i
                          style={{ cursor: 'pointer', fontSize: '28px' }}
                          role="button"
                          title="Supprimer"
                          onClick={() => deleteQuestion(question.i)}
                          className="icon-trash"
                          tabIndex="-1"
                        />
                      </div>
                    </div>
                  )}
                />
              </Table>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              form="form"
              className="btn btn-success"
              onClick={e => handleSubmit(e)}
            >
              Enregistrer
            </button>
            <Popconfirm
              placement="bottom"
              title="Etes-vous sûr(e) ?"
              onConfirm={() => setSubmitted(true)}
              okText="Oui"
              cancelText="Non "
            >
              <button className="btn btn-success">Quitter sans enregistrer</button>
            </Popconfirm>
          </div>
        </form>
        <BackTop />
      </div>
    </div>
  );
}

export default Form;
