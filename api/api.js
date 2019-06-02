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

/** 
 * An sql transaction with series of `POST` methods to be executed in a sequential order.
 * These methods populate our database tables: `card`,`questions`, `quiz_ref`, `resources`, `videos`
 * with our form data.
 */
app.post('/', (request, response) => {
  const data = request.body;
  const cardEntity = { name: data.name, image: data.image, description: data.description, statut: data.statut, type_card: data.type_card, date: data.date }
  const resourcesEntity = { text: data.text, type_resource: data.type_resource }
  console.log(resourcesEntity);


  connection.beginTransaction(error => {
    if (error) {
      console.log(error);
      response.status(500).send("Could not execute the transaction");
      throw error;
    }
    connection.query('INSERT INTO resources SET ?', resourcesEntity, (error, results) => {
      if (error) {
        return connection.rollback(() => {
          console.log(error);
          response.status(500).send("Couldn't complete the transaction card");
          throw error;
        });
      }
      response.sendStatus(200)
      // connection.query('INSERT INTO resources; SET ?', resourcesEntity, (error, results) => {
      //   if (error) {
      //     return connection.rollback(() => {
      //       console.log(error);
      //       response.status(500).send("Couldn't complete the questions transaction ");
      //       throw error;
      //     });
      //   }
      // });


    });
  });
});

app.listen(port, (req, res) => {
  console.log("listening on port " + port);
});