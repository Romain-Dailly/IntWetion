import React, { useState } from 'react';
// import {useSelector} from 'react-redux';


import './Results.css';

// import { returnStatement } from '@babel/types';
// import { log } from 'util';

//Appel du state via le store redux
// const Results = () => {
//   const selectData = useSelector(store=> store.router.location.state);
//   console.log(selectData);

// const [modal, setModal] = useState(false);


const Results = () => {
  const answers = [
    {
      id: 1,
      score: 1,
      text: "la première question",
      resources: [
        {
          "url_resource": "blabla",
          "type_resource": "1"
        },
        {
          "url_resource": "blabla2",
          "type_resource": "2"
        }
      ]
    },
    {
      id: 2,
      score: 2,
      text: "la deuxième question",
      resources: [
        {
          "url_resource": "blabla",
          "type_resource": "1"
        },
        {
          "url_resource": "blabla2",
          "type_resource": "2"
        }
      ]
    },
    {
      id: 3,
      score: 0,
      text: "la troisème question",
      resources: [
        {
          "url_resource": "blabla",
          "type_resource": "1"
        },
        {
          "url_resource": "blabla2",
          "type_resource": "2"
        }
      ],
    },
    {
      id: 4,
      score: 9,
      text: "la quatrième question",
      resources: [
        {
          "url_resource": "blabla",
          "type_resource": "1"
        },
        {
          "url_resource": "blabla2",
          "type_resource": "2"
        }
      ],
    },
    {
      id: 5,
      score: 6,
      text: "la sixième question",
      resources: [
        {
          "url_resource": "blabla",
          "type_resource": "1"
        },
        {
          "url_resource": "blabla2",
          "type_resource": "2"
        }
      ],
    },
    {
      id: 6,
      score: 8,
      text: "la sixième question",
      resources: [
        {
          "url_resource": "blabla",
          "type_resource": "1"
        },
        {
          "url_resource": "blabla2",
          "type_resource": "2"
        }
      ],
    },
  ]

  const getQuestions = () => {
    const getMinScore = answers.sort((a, b) => {
      return a.score - b.score;
    })
    return [getMinScore[0], getMinScore[1], getMinScore[2]]
  }
    
      return (
    <div className="container-result">
          <h5> Voici les 3 forces que vous pouvez développer dès à présent. <br /><br />Cliquez sur une des forces pour commencer le programme.</h5>
          <div className="card-results">
            <ul className="list-group list-group-flush">
              {getQuestions().map((question) => {
                return <li className="list-group-item" style={{ cursor: "pointer" }} data-toggle="modal" data-target="#exampleModal" >{question.text}</li>
              })}
            </ul>
         </div>
         <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" isOpen>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Votre programme</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <h6>A voir</h6>
                  <ul>
                    <li></li>
                  </ul>
                </div>
                <div>
                  <h6>A lire</h6>
                  <ul>
                    <li></li>
                  </ul>
                </div>
                <div>
                  <h6>A écouter</h6>
                  <ul>
                    <li></li>
                  </ul>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        </div>
         </div>
  
        )
      };
      
      
      export default Results;
