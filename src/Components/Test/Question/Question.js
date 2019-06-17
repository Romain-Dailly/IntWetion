import React from 'react';


function Question(props) {
  //const { question } = props.question

  return (
    <div>
      <p>{question}</p>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox0">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox0" value="option0" />
          0
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox1">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
          1
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox2">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
          2
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox3">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
          3
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox4">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" />
          4
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox5">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5" />
          5
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox6">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="option6" />
          6
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox7">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option7" />
          7
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox8">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="option8" />
          8
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox9">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox9" value="option9" />
          9
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineCheckbox10">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox10" value="option10" />
          10
        </label>
      </div>
    </div>
  );
}
export default Question;
