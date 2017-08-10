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
  var trainerID = parseInt(req.params.id) + 1;
  knex.raw(`select * from trainers where id = ${trainerID}`)
  .then(function(data){
    res.render('singleTrainer', {title: "Trainer", data: data.rows[0], trainerID: trainerID})
  });
});
module.exports = router;
