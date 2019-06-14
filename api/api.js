const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./conf.js');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors({ origin: '*' }));

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Echantillon test ---> './sample_card.json

// ROUTE card
app.route('/card/')
  //POST
  .post((request, response) => {
    const data = request.body;
    const dataContentVideos = data.videos;
    const dataContentResources = data.resources;
    const dataContentQuestions = data.questions;
    const cardData = data.card;
    //On poste le contenu de la table card
    connection.query('INSERT INTO card SET ?', cardData, (error, resultCard) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de l'ajout de la carte");
      }
      //On poste les videos(tableau d'objets) en injectant pour chacune notre id gébéré par l'ajout de la carte
      dataContentVideos.map(dataContentVideo => {
        connection.query(`INSERT INTO videos SET id_card ='${resultCard.insertId}', ?`, dataContentVideo, (error, resultVideo) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de l'ajout de la vidéo");
          }
        });
      });
      //On poste les questions une à une(tableau d'objets)en récupérant chaque id dans le resultResource
      dataContentQuestions.map(dataContentQuestion => {
        connection.query(`INSERT INTO questions SET id_card ='${resultCard.insertId}', ?`, dataContentQuestion, (error, resultQuestion) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de l'ajout de la question");
          }
          //Pour une question, on poste les ressources correspondantes en injectant l'id de la question(resultQuestion) 
          dataContentResources.map((dataContentResource) => {
            connection.query(`INSERT INTO resources SET id_question='${resultQuestion.insertId}', ?`, dataContentResource, (error, resultResource) => {
              if (error) {
                console.log(error);
                response.status(500).send("Erreur lors de l'ajout de la resource");
              }
            });
          });
        });
      })
    })
    response.sendStatus(200);
  })
  //GET
  .get((request, response) => {
    // On recupère l'id de la card envoyé en paramètre du fetch en front
    let idCard = request.body.id;
    // On récupère le contenu de la table card grâce à l'id
    connection.query(`SELECT * FROM card WHERE id=${idCard}`, (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la récupération de la carte")
      }
      // Puis le contenu de la table vidéo correspondant à l'id
      connection.query(`SELECT * FROM videos WHERE id_card=${idCard}`, (error, resultVideos) => {
        if (error) {
          console.log(error);
          response.status(500).send("Erreur lors de la récupération des vidéos");
        }
        // Celui de la table questions lié à l'id
        connection.query(`SELECT * FROM questions WHERE id_card=${idCard}`, (error, resultQuestions) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de la récupération des questions")
          }
          //On récupère les ids des questions dans un array
          const questionIds = resultQuestions.map(item => item.id);
          console.log(questionIds)
          //Que l'on utilise pour récupérer les ressources associées
          connection.query(`SELECT * FROM resources WHERE id_question IN (${questionIds})`, (error, resultResources) => {
            if (error) {
              console.log(error);
              response.status(500).send("Erreur lors de la récupération des ressources")
            }
            //On créée un objet contenant les resultats des queries sur chaques tables {card : [{}], videos : [{}], questions: [{}, {}]}
            const data = {
              card: result,
              videos: resultVideos,
              questions: resultQuestions,
              resources: resultResources
            }
            response.status(200).send(data);
          })
        })
      })
    })
  })
  //DELETE
  .delete((request, response) => {
    // On recupère l'id de la card envoyé en paramètre du fetch en front
    let idCard = request.body.id;
    // On supprime le contenu de la table card grâce à l'id et des autres tables en cascade(défini en bdd)
    connection.query(`DELETE FROM card WHERE id=${idCard}`, (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la suppression de la carte")
      } 
      response.sendStatus(200)
    })
  });
app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
