import React from 'react';
// import {useSelector} from 'react-redux';

import './Results.css';
// import { returnStatement } from '@babel/types';
// import { log } from 'util';

//Appel du state via le store redux
// const Results = () => {
//   const selectData = useSelector(store=> store.router.location.state);
//   console.log(selectData);
function Results() {
  const answers = [
    {
      id: 1,
      score: 1,
      text: "la première"
    },
    {
      id: 2,
      score: 2,
      text: "la deuxième"
    },
    {
      id: 3,
      score: 0,
      text: "la première"
    },
    {
      id: 4,
      score: 9,
      text: "la quatrième"
    },
    {
      id: 5,
      score: 6,
      text: "la sixième"
    },
    {
      id: 6,
      score: 8,
      text: "la sixième"
    },
  ]

const getQuestions = () => {
  const getMinScore = answers.sort((a, b) => {
    return a.score -b.score;
  })
  return [getMinScore[0], getMinScore[1], getMinScore[2]]
}

  return (
    <div className="container-result">
      <h5>Souhaitez-vous développer une de ces forces ?</h5>
      <div className="card-results">
        <ul className="list-group list-group-flush">
       {getQuestions().map((question)=> {
        return <li className="list-group-item" >{question.text}</li>
       })}
        </ul>
      </div>
    </div>

  )
};


export default Results;
