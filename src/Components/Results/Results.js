import React, { useState } from 'react';
import {useSelector} from 'react-redux';

import './Results.css';

// import { returnStatement } from '@babel/types';
// import { log } from 'util';

// Appel du state via le store redux
// const Results = () => {

// const [modal, setModal] = useState(false);

const Results = () => {
  const selectData = useSelector(store=> store.card.results);
  console.log(selectData);
  
  const answers = [
    {
      id: 1,
      score: 1,
      text: 'la première question',
      resources: [
        {
          url_resource: 'blabla',
          type_resource: '2',
        },
        {
          url_resource: 'blabla2',
          type_resource: '2',
        },
        {
          url_resource: 'blabla2',
          type_resource: '1',
        },
      ],
    },
    {
      id: 2,
      score: 2,
      text: 'la deuxième question',
      resources: [
        {
          url_resource: 'blabla',
          type_resource: '3',
        },
        {
          url_resource: 'blabla2',
          type_resource: '3',
        },
      ],
    },
    {
      id: 3,
      score: 0,
      text: 'la troisème question',
      resources: [
        {
          url_resource: 'blabla',
          type_resource: '1',
        },
        {
          url_resource: 'blabla2',
          type_resource: '1',
        },
        {
          url_resource: 'blabla2',
          type_resource: '3',
        },
      ],
    },
    {
      id: 4,
      score: 9,
      text: 'la quatrième question',
      resources: [
        {
          url_resource: 'blabla',
          type_resource: '1',
        },
        {
          url_resource: 'blabla2',
          type_resource: '1',
        },
      ],
    },
    {
      id: 5,
      score: 6,
      text: 'la cinquième question',
      resources: [
        {
          url_resource: 'blabla',
          type_resource: '1',
        },
        {
          url_resource: 'blabla2',
          type_resource: '1',
        },
      ],
    },
    {
      id: 6,
      score: 8,
      text: 'la sixième question',
      resources: [
        {
          url_resource: 'blabla',
          type_resource: '1',
        },
        {
          url_resource: 'blabla2',
          type_resource: '1',
        },
      ],
    },
  ];

  // Fonction qui permet de trier les objets du tableau par ordre de score croissant
  const getQuestions = () => {
    const getMinScore = answers.sort((a, b) => a.score - b.score);
    return [getMinScore[0], getMinScore[1], getMinScore[2]];
  };

  const getVideoResource = resources => resources.filter(value => value.type_resource === '1');

  const getBookResource = resources => resources.filter(value => value.type_resource === '2');

  const getMusicResource = resources => resources.filter(value => value.type_resource === '3');

  const [resource, setResource] = useState([]);
  return (
    <div className="container-result">
      <h5>
        Voici les 3 forces que vous pouvez développer dès à présent.
        <br />
        <br />
        Cliquez sur une des forces pour commencer le programme.
      </h5>
      <div className="card-results">
        <ul className="list-group list-group-flush">
          {getQuestions().map(question => (
            <li
              onClick={() => {
                setResource(question.resources);
                getVideoResource(question.resources);
              }}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="button"
              className="list-group-item"
              style={{ cursor: 'pointer' }}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              {question.text}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" isOpen>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Votre programme</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <h6>A voir</h6>
                  <ul>
                    {getVideoResource(resource).map(res => <li>{res.url_resource}</li>)
                    }
                  </ul>
                </div>
                <div>
                  <h6>A lire</h6>
                  <ul>
                    {getBookResource(resource).map(res => <li>{res.url_resource}</li>)}
                  </ul>
                </div>
                <div>
                  <h6>A écouter</h6>
                  <ul>
                    {getMusicResource(resource).map(res => <li>{res.url_resource}</li>)}

                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Results;
