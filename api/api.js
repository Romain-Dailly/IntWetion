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

// ROUTE GET cards pour recuperer les ids, noms, images 
// et descriptions des cartes
app.get('/cards/', (request, response) => {
  connection.query('SELECT id, name, image, description FROM card', (error, results) =>{
    if (error) {
      response.status(500).send('Erreur lors de la récupération des cartes');
    }
    response.status(200).send(results);
  });
});

// ROUTE card
app.route('/card/')
  //POST 
  .post((request, response) => {
    const data = request.body;
    //On definit les objets à insérer dans chaques tables
    const dataContentVideos = data.videos;
    const dataContentQuestions = data.questions;
    const cardData = data.card;
    //On insere le contenu de la table card
    connection.query('INSERT INTO card SET ?', cardData, (error, resultCard) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de l'ajout de la carte");
      }
      //On poste les videos(tableau d'objets) en injectant pour chacune   
      // notre id généré par l'ajout de la carte
      dataContentVideos.map(dataContentVideo => {
        connection.query(`INSERT INTO videos SET id_card ='${resultCard.insertId}', ?`,
        dataContentVideo, (error, resultVideo) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de l'ajout de la vidéo");
          }
        });
      });
      //On insere les questions dans la table questions une à une 
      // en récupérant chaque id dans le resultResource
      dataContentQuestions.map(dataContentQuestion => {
        // On récupère l'objet resources de la question dans une variable
        let resources = dataContentQuestion.resources;
        connection.query(`INSERT INTO questions SET 
        id_card ='${resultCard.insertId}',
        number_question = '${dataContentQuestion.number_question}',
        text_question = "${dataContentQuestion.text_question}",
        image_question = "${dataContentQuestion.image_question}",
        type_response = '${dataContentQuestion.type_response}',
        has_comment = '${dataContentQuestion.has_comment}'`,
        (error, resultQuestion) => {
            if (error) {
              console.log(error);
              response.status(500).send("Erreur lors de l'ajout de la question");
            }
            // Pour une question, on insere les ressources correspondantes 
            // en injectant l'id de la question(resultQuestion) 
            resources.map((resource) => {
              connection.query(`INSERT INTO resources SET 
              id_question='${resultQuestion.insertId}', ?`,
              resource, (error, resultResource) => {
                if (error) {
                  console.log(error);
                  response.status(500).send("Erreur lors de l'ajout de la resource");
                }
              });
            });
        });
      });
      response.sendStatus(200);
    });
  })
  //GET 
  .get((request, response) => {
    // exemple de fetch : axios.get('http://localhost:8080/card/', { params: { id: 1 } })
    // On recupère l'id de la card envoyé en paramètre du fetch en front
    let idCard = request.query.id;
    // On récupère le contenu de la table card grâce à l'id
    connection.query(`SELECT * FROM card WHERE id=${idCard}`, (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la récupération de la carte");
      }
      // Puis le contenu de la table vidéo correspondant à l'id
      connection.query(`SELECT * FROM videos WHERE id_card=${idCard}`, 
      (error, resultVideos) => {
        if (error) {
          console.log(error);
          response.status(500).send("Erreur lors de la récupération des vidéos");
        }
        // Celui de la table questions lié à l'id
        connection.query(`SELECT * FROM questions WHERE id_card=${idCard}`, (error, resultQuestions) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de la récupération des questions");
          }
          //On récupère les ids des questions dans un tableau
          const idQuestions = resultQuestions.map(question => question.id); 
          //Que l'on utilise pour récupérer les ressources associées
          connection.query(`SELECT * FROM resources WHERE id_question IN ('${idQuestions}')`,
          (error, resultResources) => {
            if (error) {
              console.log(error);
              response.status(500).send("Erreur lors de la récupération des ressources");
            }
            // On redéfinit le contenu de resultQuestions en y insérant les ressources 
            const questions = resultQuestions.map(question => {
            return  {
              number_question : question.number_question,
              text_question : question.text_question,
              image_question : question.image_question,
              type_response : question.type_response,
              has_comment : question.has_comment,
              resources : resultResources.filter(resource => resource.id_question === question.id)
            }
          });
            //On créée un objet contenant les resultats des queries sur chaques tables : 
            //{card : {}, videos : [{}, {}, {}], questions : [{resources:[{},{}]},...]...}
            const data = {
              card: result[0],
              videos: resultVideos,
              questions: questions
            };
            //Et on l'envoie en réponse
            response.status(200).send(data);
          }) 
        });
      });
    });
  })
  //DELETE (id à envoyer en request)
  .delete((request, response) => {
    // On recupère l'id de la card envoyé en paramètre du fetch en front
    let idCard = request.query.id
    // On supprime le contenu de la table card grâce à l'id 
    // et celui des autres tables en cascade(défini en bdd)
    connection.query(`DELETE FROM card WHERE id=${idCard}`, (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la suppression de la carte");
      }
      response.sendStatus(200);
    });
  })
  // PUT (id de la carte à ajouter en front dans la request dans card:{})
  .put((request, response) => {
    const data = request.body;
    let idCard = request.query.id;
    // On definit les objets à modifier dans chaques tables
    const dataContentVideos = data.videos;
    const dataContentQuestions = data.questions;
    const cardData = data.card;
    //On met à jour le contenu de la carte dans la table card grâce à son id
    connection.query(`UPDATE card SET ? WHERE id=${idCard}`, 
    cardData, (error, resultCard) => {
      if (error) {
        console.log(error);
        response.status(500).send("Erreur lors de la modification de la carte");
      }
      //Puis les 3 videos correspondant à notre id de la carte et au type_video à modifier
      dataContentVideos.map(dataContentVideo => {
        connection.query(`UPDATE videos SET ? WHERE id_card ='${idCard}' AND
        type_video='${dataContentVideo.type_video}'`, 
        dataContentVideo, (error, resultVideo) => {
          if (error) {
            console.log(error);
            response.status(500).send("Erreur lors de la modification de la vidéo");
          }
        });
      });
      // On supprime les anciennes questions et ressources (ON DELETE CASCADE)
      connection.query(`DELETE FROM questions WHERE id_card=${idCard}`, 
      (error, result) => {
        if (error) {
          console.log(error);
          response.status(500).send("Erreur lors de la suppression des anciennes questions et ressources");
        }
      });
      // On insere les nouvelles questions une à une (tableau d'objets)
      // en récupérant chaque id dans le resultQuestion
      dataContentQuestions.map(dataContentQuestion => {
        let resources = dataContentQuestion.resources;
        connection.query(`INSERT INTO questions SET
          id_card ='${idCard}',
          number_question = '${dataContentQuestion.number_question}',
          text_question = "${dataContentQuestion.text_question}",
          image_question = "${dataContentQuestion.image_question}",
          type_response = '${dataContentQuestion.type_response}',
          has_comment = '${dataContentQuestion.has_comment}'`,
          (error, resultQuestion) => {
            if (error) {
              console.log(error);
              response.status(500).send("Erreur lors de l'ajout de la question");
            }
          // Pour une question, on insere les ressources correspondantes 
          // en injectant l'id de la question(resultQuestion) 
            resources.map((resource) => {
              connection.query(`INSERT INTO resources SET id_question='${resultQuestion.insertId}', ?`,
                resource, (error, resultResource) => {
                  if (error) {
                    console.log(error);
                    response.status(500).send("Erreur lors de l'ajout de la resource");
                  }
                });
            });
          });
        });
      });
    response.sendStatus(200);
  });

  app.get('/test/',(req, res) => {
    connection.query('SELECT * FROM `intwetion`.`card` INNER JOIN `intwetion`.`questions` on `questions`.`id_card` = `card`.`id` INNER JOIN `resources` ON `resources`.`id_question`= `questions`.`id`;', (err, resu)=>{
      if (err) {
        res.status(500).send('Erreur!');
      }
      res.json(resu);
    })
  });
app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
