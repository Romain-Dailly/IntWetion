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

// ROUTE POST CARD
app.route('/newcard')
  .post((request, response) => {
    const data = request.body;
    const cardData = { name: data.name, image: data.image, description: data.description, statut: data.statut, type_card: data.type_card, date: Date.now() }
    connection.query('INSERT INTO card SET ?', cardData, (error, result) => {
      if (error) {
      console.log(error);
      response.status(500).send("oups, il semblerait qu'il y ait un problème intuitif");
      } else  {
        response.status(200).send({ cardId: result.insertId });
      } 
    })}).put()


    // const videosData = { url : data.url, type_video : data.type_video, id_card : data.type_video }
    // connection.query('INSERT INTO videos SET ?', videosData, (error, result) => {
    //   if (error) {
    //     console.log(error)
    //     response.status(500).send("oups il n'y a un petit probleme avec les videos =( ");
    //   }else {
    //     response.sendStatus(200)
    //   }
    // })
  });






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


    // getCardId(cardId => {
    //     console.log(cardId);
    // } );


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
});