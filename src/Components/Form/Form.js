import React from 'react';


function Form() {
  return (
    <div className="container-fluid">
      < div className="row">
        <div className="col-3">Administration du site</div>
        <div className="col-9">
          <form className="pr-5">
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, image de la carte</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, image de la carte</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, image de la carte</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Lien, image de la carte</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <h1>Ajouter une question</h1>
            <div class="form-group">
              <label for="formGroupExampleInput">Question</label>
              <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>



            {/*  */}
            <form>
              <fieldset class="form-group">
                <div class="row">
                  <legend class="col-form-label col-sm-2 pt-0">Type de réponse associée</legend>
                  <div class="col-sm-10">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="gridCheckbox" id="gridRadios1" value="option1" />
                      <label class="form-check-label" for="gridRadios1">
                        Texte
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="gridCheckbox" id="gridRadios2" value="option2" />
                      <label class="form-check-label" for="gridRadios2">
                        Numérique
          </label>
                    </div>
                    <div class="form-check disabled">
                      <input class="form-check-input" type="checkbox" name="gridCheckbox" id="gridRadios3" value="option3" />
                      <label class="form-check-label" for="gridRadios3">
                        %
          </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="form-group row">
                <div class="col-sm-2">Checkbox</div>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck1" />
                    <label class="form-check-label" for="gridCheck1">
                      Example checkbox
        </label>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-10">
                  <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
              </div>
            </form>


            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div >
  )
}


export default Form;