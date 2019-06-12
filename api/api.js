const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./conf.js');

const app = express();
const port = 8080;
app.use(cors({ origin: '*' }));
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
}));

// ROOT ROUTE GET
app.get('/', (request, response) => {
  connection.query('SELECT * FROM card', (error, results) => {
    if (error) {
      response.status(500).send('Erreur lors de la récupération des movies');
      // console.log(error);
    } else {
      response.json(results);
    }
  });
});

// ROUTE card
app.route('/card/')
  .post((request, response) => {
    const data = request.body;
    const dataContentVideos = data.videos;
    const dataContentResources = data.resources;
    const dataContentQuestions = data.questions;
    const cardData = data.card;
    // On poste le contenu de la table card
    connection.query('INSERT INTO card SET ?', cardData, (error, _) => {
      if (error) {
        // console.log(error);
        response.status(500).send("Erreur lors de l'ajout de la carte");
      }
    });
    // On récupère l'id de notre nouvelle card dans le resultat de la requête(resultId)
    connection.query(`SELECT id FROM card WHERE name='${cardData.name}'`, (error, resultId) => {
      if (error) {
        // console.log(error);
        response.status(500).send("Erreur lors de la recuperation de l'id de la carte");
      }
      // On poste les videos(tableau d'objets) en injectant pour chacune notre resultId(reference)
      dataContentVideos.map((dataContentVideo) => {
        return connection.query(`INSERT INTO videos SET id_card ='${resultId[0].id}', ?`, dataContentVideo, (errorVideos, resultVideos) => {
          if (errorVideos) {
            // console.log(error);
            response.status(500).send("Erreur lors de l'ajout de la vidéo");
          }
        });
      });
      // On poste les ressources une à une(tableau d'objets)
      // en récupérant chaque id dans le resultResource
      dataContentResources.map((dataContentResource) => {
        return connection.query('INSERT INTO resources SET ?', dataContentResource, (errorResource, resultResource) => {
          if (errorResource) {
            // console.log(error);
            response.status(500).send("Erreur lors de l'ajout de la ressource");
          }
          // Pour une ressource, on poste la question correspondante en injectant l'id de la ressource(resultResource); 
          dataContentQuestions.map((dataContentQuestion) => {
            return connection.query(`INSERT INTO questions SET id_resource=${resultResource.insertId}, ?`, dataContentQuestion, (errorQuestion, resultQuestion) => {
              if (errorQuestion) {
                // console.log(error);
                response.status(500).send("Erreur lors de l'ajout de la question");
              }
              // On lie la question ajoutée à la card en création par leurs id dans la table quiz_ref 
              connection.query(`INSERT INTO quiz_ref SET id_card=${resultId[0].id}, id_question=${resultQuestion.insertId}`, (errorQuiz, resultQuizRef) => {
                if (errorQuiz) {
                  // console.log(error);
                  response.status(500).send("Erreur lors de l'ajout des id dans quiz_ref");
                } else {
                  response.sendStatus(200);
                }
              });
            });
          });
        });
      });
    })
  })
  .get((request, response) => {
    connection.query('SELECT * FROM card', (error, result) => {
      if (error) {
        // console.log(error);
        response.status(500).send("Erreur lors de la récupération de la carte");
      }
      connection.query(`SELECT * FROM videos WHERE id_card=${result[0].id}`, (error, resultVideo) => {
        if (error) {
          // console.log(error);
          response.status(500).send('Erreur lors de la récupération des vidéos');
        }
        connection.query(`SELECT * FROM quiz_ref q JOIN questions ON questions.id = id_question 
        JOIN resources r ON r.id = questions.id_resource WHERE q.id_card=${result[0].id}`, (error, resultQuestions) => {
          if (error) {
            // console.log(error);
            response.status(500).send("Erreur lors de la récupération des questions")
          } else {
            const data = {
              card: result,
              videos: resultVideo,
              questions: resultQuestions,
            };
            response.status(200).send(data);
          }
        });
      });
    });
  });

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
