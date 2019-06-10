import React from 'react';
// import axios from 'axios';
import { useState } from 'react';


// Simon confirme qu'il faut passer par une fonction (pas de class) et utiliser les hook donc pas de controlled component ici.

function Form() {

  // Je pense que c'est possible de faire seulement :
  // const [adminInput, setAdminInput] = useState({});
  const [adminInput, setAdminInput] = useState({
    card: {},
    questions: {},
    quiz_ref: {},
    video: {},
  });

  // () => {
  //   axios.post(`http://localhost:8080/card/`
  //   )} 

  return (
    <div className="container-fluid">
      < div className="row">
        <div className="col-3">Administration du site</div>
        <div className="col-9">
          <form className="pr-5">
            <div className="form-group d-flex flex-column">
              <label for="exampleFormControlTextarea1">Sélectionner une action :</label>
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                  <label class="form-check-label" for="inlineRadio1">Ajouter une carte</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                  <label class="form-check-label" for="inlineRadio2">Modifier une carte</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                  <label class="form-check-label" for="inlineRadio3">Supprimer une carte</label>
                </div>
              </div>
            </div>
            < div className="container-card">
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                  <label class="form-check-label" for="inlineRadio1">Présent</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                  <label class="form-check-label" for="inlineRadio2">Peurs</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                  <label class="form-check-label" for="inlineRadio3">Forces</label>
                </div>
              </div>
            </div>
            <div className="form-group d-flex flex-column">
              <label for="exampleFormControlTextarea1">Type de carte :</label>
              <div>
                <div class="form-check form-check-inline">
                  <input onClick={adminInput.card.online = 0} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                  <label class="form-check-label" for="inlineRadio1">En ligne - gratuit</label>
                </div>
                <div class="form-check form-check-inline">
                  <input onClick={adminInput.card.online} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                  <label class="form-check-label" for="inlineRadio2">En ligne - payant</label>
                </div>
                <div class="form-check form-check-inline">
                  <input onClick={adminInput.card.online = 1} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                  <label class="form-check-label" for="inlineRadio3">Non visible</label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" value={adminInput.card.description} rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, image de la carte</label>
              <textarea value={adminInput.card.image_question} class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, vidéo-intro de la carte</label>
              <textarea value={adminInput.video.url_video} class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, musique</label>
              <textarea value={adminInput.video.url_video} class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, vidéo, fin de test</label>
              <textarea value={adminInput.url_video} class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <h1>Espace test</h1>
            <div class="form-group">
              <label for="formGroupExampleInput">Question</label>
              <div className="d-flex">
                <input value={adminInput.questions.text_question} type="text" class="form-control mr-5" id="formGroupExampleInput" />
                <button type="button" class="btn btn-secondary ">Supprimer</button>
              </div>
              {/* Ajouter image_question */}
            </div>
            <div>
              <label class="form-check-label" for="inlineCheckbox1">Type de réponse liée</label>
              <fieldset class="form-group">
                <div class="form-check form-check-inline">
                  {/* Faire un onClick ou mettre directement dans value ? */}
                  <input onclick={adminInput.questions.type_response = 0} class="form-check-input" type="checkbox" id="inlineCheckbox1" value={adminInput.questions.type_response = 0} />
                  <label class="form-check-label" for="inlineCheckbox1">Numérique</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                  <label class="form-check-label" for="inlineCheckbox2">Texte</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
                  <label class="form-check-label" for="inlineCheckbox3">%</label>
                </div>
              </fieldset>
              <div className="row">
                <div className="col-3">
                  Ressources liées:
              </div>
                <div className="col-9">
                  <div class="form-row">
                    <div class="col-3">
                      <input type="text" class="form-control" placeholder="Nom" />
                    </div>
                    <div class="col-9">
                      <textarea type="text" class="form-control" placeholder="Lien" rows="1" />
                    </div>
                  </div>
                  <div class="form-row mt-4">
                    <div class="col-3">
                      <input type="text" class="form-control" placeholder="Nom" />
                    </div>
                    <div class="col-9">
                      <textarea type="text" class="form-control" placeholder="Lien" rows="1" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="mr-2 d-inline-block">Ajouter un champ ressource supplémetaire</p>
                    <i class="fas fa-plus-circle"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <i class="fas fa-plus-circle"></i>
                  <p className="ml-4 d-inline-block">Ajouter un champ ressource supplémetaire</p>
                </div>
              </div>
            </div>
            <button onClick={() => setAdminInput({})} type="submit" class="btn btn-primary mt-5 mb-5" value="submit">Enregistrer</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Form;
