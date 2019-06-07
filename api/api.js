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

// ROUTE POST
app.route('/card')
 .post((request, response) => {
    const data = request.body;
    const cardId = request.params.id;
    const dataContentVideos = data.videos;
    const dataContentResources = data.resources;
    const dataContentQuestions = data.questions;
    const cardData = data.card;
    connection.query('INSERT INTO card SET ?', cardData,(error, resultCard) => {
      if (error) {
      console.log(error);
      response.status(500).send("Erreur lors de l'insertion de la carte en base de données");
      }
    })
    .then(connection.query(`SELECT id FROM card WHERE name=${data.name}` , (error, resultId) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la recuperation de l'id généré");
        } 
        connection.query(`INSERT INTO videos WHERE card.id=${resultId.insertId} SET card_id = ${resultId.insertId}, ?`, dataContentVideos, (error, resultVideos) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de l'ajout de vidéo");
          }
        }) 
          dataContentResources.map(dataContentResource => {
        connection.query(`INSERT INTO resources WHERE card_id=${resultId.insertId} SET ?`, dataContentResource, (error, resultResources) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de l'ajout de ressource");
          } 
            dataContentQuestions.map((dataContentQuestion) => {
              return connection.query(`INSERT INTO questions WHERE resources_id=${resultResource.insertId} SET ?`, dataContentQuestion, (error, resultQuestions) => {
                if (error) {
                  console.log(error);
                  response.status(500).send("Erreur lors de l'ajout de la question");
                } 

            connection.query(`INSERT INTO questions WHERE resources_id=${resultResources.insertId} SET ?`, dataContentQuestions, (error, resultQuestions) => {
              if (error) {
                console.log(error);
                response.status(500).send("oups, il semblerait qu'il y ait un problème intuitif2");
              } else {
                response.sendStatus(200)
              }
            })
            })
          })
        })
       })
     })
  )})



  

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