import React from 'react';

function ModalTest() {
  // const { titreCard } = 'Carte peur';
  // const { lengthQuestion } = 3;
  // const { questions } = [{ question: 'As tu peur des mouche ?' }, 
  // { question: 'As tu peur des poussin ?' }, { question: 'As tu peur des chapeaux ?' }];

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      {/* <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titreCard}</h5>
          </div>
          <div className="modal-body">
            // eslint-disable-next-line react/no-array-index-key
            {questions.map(question => <Question question={question} />)}
          </div>
          <button onClick={count()} type="button" className="btn btn-primary">Prochaine</button>
        </div>
      </div> */}
    </div>
  );
}
export default ModalTest;
