
const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./conf.js');
const app = express();
const port = 8080;
// const cors = require('cors');

// app.use(cors({ origin: '*' }));

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// ROOT ROUTE GET
app.get('/', (request, response) => {
  connection.query('SELECT * FROM card', (error, results) => {
    if (error) {
      response.status(500).send('Erreur lors de la récupération des movies');
      console.log(error);
    } else {
      response.json(results);
    }
  });
});


//we post a big object with inside, {card:{}, videos:[{},{}], resources:[{},{}], questions:[{}, {}]}
// const data = request.body;
// const cardData = { name: data.name, image: data.image, description: data.description, statut: data.statut, type_card: data.type_card, date: Date.now() }
// const dataContentVideos = { url: data.url, type_video: data.type_video, id_card: cardId };
// const dataContentResources = { resource_url: data.resource_url, type_resource: data.type_resource };
// const dataContentQuestions = { text: data.text, image: data.image, type_reponse: data.type_reponse, type_reponse2: data.type_reponse2 }

// Echantillon test ---> bottom of page

// ROUTE POST
app.route('/card')
  .post((request, response) => {
    const data = request.body;
    const dataContentVideos = data.videos;
    const dataContentResources = data.resources;
    const dataContentQuestions = data.questions;
    const cardData = data.card;
    connection.query('INSERT INTO card SET ?', cardData, (error, resultCard) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de l'ajout de la carte");
      }
    })
    connection.query(`SELECT id FROM card WHERE name='${cardData.name}'`, (error, resultId) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la recuperation de l'id de la carte");
      } 
      dataContentVideos.map(dataContentVideo => {
        connection.query(`INSERT INTO videos SET id_card ='${resultId[0].id}', ?`, dataContentVideo, (error, resultVideo) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de l'ajout de la vidéo");
          }
        });
      });
      dataContentResources.map(dataContentResource => {
        connection.query(`INSERT INTO resources SET ?`, dataContentResource, (error, resultResource) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de l'ajout de la ressource");
          }
          dataContentQuestions.map((dataContentQuestion) => {
            connection.query(`INSERT INTO questions SET resources_id=${resultResource.insertId}, ?`, dataContentQuestion, (error, resultQuestion) => {
              if (error) {
                console.log(error);
                response.status(500).send("Erreur lors de l'ajout de la question");
              }
              connection.query(`INSERT INTO quiz_ref SET id_card=${resultId[0].id}, id_question=${resultQuestion.insertId}`, (error, resultQuiz_ref) => {
                if (error) {
                  console.log(error);
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
// Route qui permet de recuperer le nom, id d'une carte existante dans le cadre checkbox
// pour qu'Henry puissent selectionner la carte qu'il souhaite modifier,voir ou supprimer
app.route('/')
  .get((request, response) => {
    connection.query('SELECT card.name card.id FROM card',(error, result) => {
      if (error){
        console.log(error)
        response.sendStatus(500)
      } else {
        response.sendStatus(200)}
    })
  });

app.listen(port, (req, res) => {
  console.log("listening on port " + port);
})


// Sample test
// {
//   "card": {
//     "name": "peurs",
//     "image": "peurs.love",
//     "description": "bouh!",
//     "statut": 1,
//     "type_card": 2,
//     "date": 1234567890
//   },
//   "videos": [
//     {
//       "url": "truc.com",
//       "type_video": "1"
//     }
//   ],
//   "resources": [
//     {
//       "resource_url": "blabla",
//       "type_resource": "1"
//     },
//     {
//       "resource_url": "blabla2",
//       "type_resource": "2"
//     }
//   ],
//   "questions": [
//     {
//       "text": "peur du yaourt",
//       "image": "yaourt.com",
//       "type_reponse": "2",
//       "type_reponse2": "null"
//     },
//     {
//       "text": "peur du concombre",
//       "image": "conc.com",
//       "type_reponse": "1",
//       "type_reponse2": "3"
//     },
//     {
//       "text": "peur des poils",
//       "image": "poils.io",
//       "type_reponse": "2",
//       "type_reponse2": "3"
//     }
//   ]
// }