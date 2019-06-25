import React,{useState} from 'react';

const AdminQuestion = () => {

  const [question, setQuestion] = useState({});
  const [resources, setResources] = useState([]);


   // Fonction qui gère les onChange du hook question, peut être fusionnée avec onVideoInputChange
   const onQuestionInputChange = ({ target }) => {
    const { value } = target;
    const newQuestion = { ...question };
    const dataKey = target.getAttribute('data-key');
    newQuestion[dataKey] = value;
    setQuestion(newQuestion);
  }

  // Fonction qui gère les onChange du hook resources
  const onResourceInputChange = ({ target }) => {
    const { value } = target;
    const newObj = { ...resources };
    const dataKey = target.getAttribute('data-key');
    newObj[dataKey] = value;
    newObj.questionNumber = question.number_question;
    setResources([newObj]);
  }

  console.log(question);
  

  return (
    <div>
      <h1>Espace test</h1>
      <div>
        <div className="d-flex div-question-bouton" row="1">
          <label htmlFor="formGroupExampleInput" className="col-10">
            Ecrivez votre question :
                    <input type="text" className="form-control div-input-question col-10" id="formGroupExampleInput" data-key="text_question" value={question.text_question} onChange={onQuestionInputChange} />
          </label>
          <button type="button" className="btn btn-secondary btn-delete">Supprimer</button>
        </div>
      </div>

      <div>
        <label htmlFor="formGroupExampleInput" className="col-10">
          Ecrivez le numéro de la question :
                  <input type="text" className="form-control mr-5 div-input-question" id="formGroupExampleInput" placeholder="ex: 1.2" data-key="number_question" value={question.number_question} onChange={onQuestionInputChange} />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">
          Ajoutez une photo qui sera affichée avec la question (lien) :
                  <textarea className="form-control col-10" rows="1" id="1" data-key="image_question" value={question.image_question} onChange={onQuestionInputChange} />
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
              <textarea type="text"
                className="form-control"
                placeholder="Lien"
                rows="1"
                id="1"
                data-key="url_resource"
                value={resources.url_resource}
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
    </div>
  );
}

export default AdminQuestion;