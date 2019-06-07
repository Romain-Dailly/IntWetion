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

// Echantillon test 
//card: { "name= peurs", "image= peurs.love", "description= bouh!", "statut= 1", "type_card= 2", "date= 1234567890" }, 
//videos: { "url= truc.com", "type_video= 1" },
//resources: [{ resource_url: blabla, type_resource: 1 }, { resource_url: blabla2 type_resource: 2 }],
//questions: [{ text: peur du yaourt, image: yaourt.com, type_reponse: 2, type_reponse2: null },{ text: peur du concombre, image: conc.com, type_reponse: 1, type_reponse2: 3 },{ text: peur des poils, image: poils.io, type_reponse: 2, type_reponse2: 3 }]


// ROUTE POST
app.route('/card')
 .post((request, response) => {
    const data = request.body;
    const dataContentVideos = data.videos;
    const dataContentResources = data.resources;
    const dataContentQuestions = data.questions;
    const cardData = data.card;
    connection.query('INSERT INTO card SET ?', cardData,(error, resultCard) => {
      if (error) {
      console.log(error);
      response.status(500).send("Erreur lors de l'ajout de la carte");
      }
    })
    connection.query(`SELECT id FROM card WHERE name=${data.name}` , (error, resultId) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la recuperation de l'id de la carte");
        } 
        dataContentVideos.map(dataContentVideo => {
          connection.query(`INSERT INTO videos SET card_id = ${resultId.insertId}, ?`, dataContentVideo, (error, resultVideo) => {
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
                  connection.query(`INSERT INTO quiz_ref SET id_card=${resultId.insertId}, id_question=${resultQuestion.insertId}`, (error, resultQuiz_ref) => {
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
  });



  

// app.route('/card/:id')
//  .post((request, response) => {

//   connection.beginTransaction(error => {
//     if (error) {
//       console.log(error);
//       response.status(500).send("Could not execute the transaction");
//       throw error;
//     }

//         response.status(200).send(`${results.insertId}`);
//         console.log(request)
//       }
//     });

    //  }





  // app.get('/id', (request, response) => {
//   connection.query('SELECT card.id FROM card', (error, results) => {
//     if (error) {
//       response.status(500).send("Erreur lors de la récupération de l'identification de la carte");
//       console.log(error);
//     } else {
//       const idCard = response.json(results);
//     }
//   });
// });

// const getCardId = callback => {
//   app.get('/id', (request, response) => {
//     connection.query('SELECT card.id FROM card', (error, results) => {
//       if (error) {
//         response.status(500).send("Erreur lors de la récupération de l'identification de la carte");
//         console.log(error);
//       } else {
//         // callback(results);
        
//       }
//     });
//   });
// // }




/** 
 * An sql transaction with series of `POST` methods to be executed in a sequential order.
 * These methods populate our database tables: `card`,`questions`, `quiz_ref`, `resources`, `videos`
 * with our form data.
 */
// app.post('/', (request, response) => {
//   const data = request.body;
//   const cardData = { id: data.id, name: data.name, image: data.image, description: data.description, statut: data.statut, type_card: data.type_card, date: Date.now() }
//   console.log(cardData);

  // connection.beginTransaction(error => {
  //   if (error) {
  //     console.log(error);
  //     response.status(500).send("Could not execute the transaction");
  //     throw error;
  //   }

  // connection.query('INSERT INTO card SET ?', cardData, (error, results) => {
  //   if (error) {
  //     console.log(error);
  //     response.status(500).send("oups, il semblerait qu'il y ait un problème intuitif");
  //   } else {
  //     response.sendStatus(200);
  //   }

    // connection.query('', resourcesEntity, (error, results) => {
    //   if (error) {
    //     return connection.rollback(() => {
    //       console.log(error);
    //       response.status(500).send("Couldn't complete the questions transaction ");
          
    //     });
    //   }
    // });

//   });
// });

app.listen(port, (req, res) => {
  console.log("listening on port " + port);
})