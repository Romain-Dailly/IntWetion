import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Results.css';

const Results = () => {
  const selectData = useSelector(store => store.card.results);
  const dataSort = selectData && Object.values(selectData);

  // function to sort array ascending
  const getQuestions = () => {
    const getMinScore = dataSort.sort((a, b) => a.answer - b.answer);
    return [getMinScore[0], getMinScore[1], getMinScore[2]];
  };
  const getVideoResource = resources => resources.filter(value => value.type_resource === 2);

  const getBookResource = resources => resources.filter(value => value.type_resource === 1);

  const getMusicResource = resources => resources.filter(value => value.type_resource === 3);

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
                setResource(question.question.resources);
                // getVideoResource(question.question.resources);
              }}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="button"
              className="list-group-item"
              style={{ cursor: 'pointer' }}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              {question.question.text_question}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          isOpen
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Votre programme
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <h6>A voir</h6>
                  <ul>
                    {getVideoResource(resource).map(res => (
                      <li>
                        <a target="blank" href={res.url_resource}>
                          {res.url_resource}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6>A lire</h6>
                  <ul>
                    {getBookResource(resource).map(res => (
                      <li>
                        <a target="blank" href={res.url_resource}>
                          {res.url_resource}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6>A écouter</h6>
                  <ul>
                    {getMusicResource(resource).map(res => (
                      <li>
                        <a target="blank" href={res.url_resource}>
                          {res.url_resource}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
