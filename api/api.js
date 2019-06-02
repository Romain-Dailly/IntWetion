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

// ROOT ROUTE
app.get('/', (request, response) => {
  connection.query('SELECT * FROM card', (error, results) => {
    if (error) {
      response.status(500).send('Erreur lors de la récupération des movies');
    } else {
      response.send(results);
    }
  });
});

// ROOT ROUTE
app.post('/', (request, response) => {
  const formData = request.body;
  console.log(formData);
  connection.query('INSERT INTO card SET ?', card, (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).send("Erreur lors de la sauvegarde de nom de la carte");
    } else {
      connection.query('INSERT INTO video SET ?',
        [formData.url, formData.type_video, formData.id_card], (error, results) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de la sauvegarde de nom de la carte");
          } else {
            response.sendStatus(200);
          }
        });
    }
  });

});

app.listen(port, (req, res) => {
  console.log("listening on port " + port);
});