var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon_db'
  }
});

//Populate trainers page
router.get('/', function(req, res, next) {
  knex.raw(`select * from trainers;`)
    .then(function(data){
      res.render('trainers', { title: 'Trainers', data: data.rows });
    })
});


//Create new trainer page
router.get('/new', function(req, res, next){
      res.render('newTrainer', {title: 'Create new Trainer'});
    });

//Post new trainer
router.post('/new', function(req, res, next){
  knex.raw(`insert into trainers (name) values ('${req.body.name}')`)
    .then(function(data){
      res.redirect('/trainers')
    });
});


// Individual trainers page
router.get('/:id', function(req, res, next){
  var trainerID = req.params.id;
  knex.raw(`select pokemon.name AS "pokemon_name", pokemon.id AS "pokeNum", trainers.* from trainers join pokemon on pokemon.trainer_id = trainers.id where trainers.id = ${trainerID}`)
  .then(function(data){
    res.render('singleTrainer', {title: "Trainer", data: data.rows, trainerID: trainerID})
  });
});
module.exports = router;

//Edit Trainers Page

router.get('/:id/edit', function(req, res, next){
  var trainerID = req.params.id;
  res.render('editTrainer', {title: "Edit a Trainer", trainerID: trainerID})
});

//Update Trainer

router.post('/:id/edit', function(req, res, next){
  var trainerID = req.params.id;
  knex.raw(`update trainers set name = '${req.body.name}' where id = ${trainerID}`)
    .then(function(data){
      res.redirect('/trainers')
    });
});


//Delete a trainerID
router.post('/:id/delete', function(req, res, next){
  var trainerID = req.params.id;
  knex.raw(`delete from trainers where id = ${trainerID}`)
    .then(function(data){
      res.redirect('/trainers')
    });
});
