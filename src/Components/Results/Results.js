import React from 'react';
import {useSelector} from 'react-redux';

import './Results.css';

const Results = () => {
  const selectData = useSelector(store=> store.router.location.state);
  console.log(selectData);
  
  return (
    <div className="container-result">
      <h5>Souhaitez-vous développer une de ces forces ?</h5>
      <div className="card-results">
        <ul className="list-group list-group-flush">
          <li className="list-group-item" >Ma confiance.</li>
          <li className="list-group-item" >Mes rêves.</li>
          <li className="list-group-item" >Mon état d'être.</li>
        </ul>
      </div>
    </div>

  )
};

export default Results;
