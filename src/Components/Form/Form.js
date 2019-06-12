import React, { useState } from 'react';

/* Simon confirme qu'il faut passer par une fonction (pas de class) et utiliser les hook donc pas de controlled component ici. */


function Form() {
  const [adminInput, setAdminInput] = useState({
    card: {
      name: null,
      image: null,
      description: null,
      online: false,
      payment: null,
      date: null,
    },
    questions: {
      text_question: null,
      image_quesion: null,
      type_response: 0,
      type_response2: 0,
      // id_resource: null,
    },
    video: {
      url_video: null,
      type_video: null,
    },
    resources: {
      url_resource: null,
      type_resource: null,
    },
  });
  /* () => {
  axios.post(`http://localhost:8080/card/`
  )} */
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">Administration du site</div>
        <div className="col-9">
          <form className="pr-5" control="bipbop">
            <div className="form-group d-flex flex-column">
              <label htmlFor="exampleFormControlTextarea1" control="bipbop">Sélectionner une action :</label>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                  <label className="form-check-label" htmlFor="inlineRadio1" control="bipbop">Ajouter une carte</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                  <label className="form-check-label" htmlFor="inlineRadio2">Modifier une carte</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                  <label className="form-check-label" htmlFor="inlineRadio3">Supprimer une carte</label>
                </div>
              </div>
            </div>
            <div className="container-card">
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                  <label className="form-check-label" htmlFor="inlineRadio1">Présent</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                  <label className="form-check-label" htmlFor="inlineRadio2">Peurs</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                  <label className="form-check-label" htmlFor="inlineRadio3">Forces</label>
                </div>
              </div>
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="exampleFormControlTextarea1">Type de carte :</label>
              <div>
                <div className="form-check form-check-inline">
                  <input onClick={adminInput.card.online} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                  <label className="form-check-label" htmlFor="inlineRadio1">En ligne - gratuit</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onClick={adminInput.card.online} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                  <label className="form-check-label" htmlFor="inlineRadio2">En ligne - payant</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onClick={adminInput.card.online} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                  <label className="form-check-label" htmlFor="inlineRadio3">Non visible</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" value={adminInput.card.description} rows="3"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Lien, image de la carte</label>
              <textarea value={adminInput.card.image_question} className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Lien, vidéo-intro de la carte</label>
              <textarea value={adminInput.video.url_video} className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Lien, musique</label>
              <textarea value={adminInput.video.url_video} className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Lien, vidéo, fin de test</label>
              <textarea value={adminInput.url_video} className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <h1>Espace test</h1>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Question</label>
              <div className="d-flex">
                <input value={adminInput.questions.text_question} type="text" className="form-control mr-5" id="formGroupExampleInput" />
                <button type="button" className="btn btn-secondary ">Supprimer</button>
              </div>
              {/* Ajouter image_question */}
            </div>
            <div>
              <label className="form-check-label" htmlFor="inlineCheckbox1">Type de réponse liée</label>
              <fieldset className="form-group">
                <div className="form-check form-check-inline">
                  {/* Faire un onClick ou mettre directement dans value ? */}
                  <input onclick={adminInput.questions.type_response} className="form-check-input" type="checkbox" id="inlineCheckbox1" value={adminInput.questions.type_response} />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">Numérique</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">Texte</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
                  <label className="form-check-label" htmlFor="inlineCheckbox3">%</label>
                </div>
              </fieldset>
              <div className="row">
                <div className="col-3">
                  Ressources liées:
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
                    <i className="fas fa-plus-circle"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <i className="fas fa-plus-circle"></i>
                  <p className="ml-4 d-inline-block">Ajouter un champ ressource supplémetaire</p>
                </div>
              </div>
            </div>
            <button onClick={() => setAdminInput({})} className="btn btn-primary mt-5 mb-5" value="submit">Enregistrer</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Form;
