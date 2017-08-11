var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon_db'
  }
});

// Populate Pokemon Page
router.get('/', function(req, res, next) {
  knex.raw(`select * from pokemon;`)
    .then(function(data){
      res.render('pokemon', { title: 'Pokemon', data: data.rows });
    });
});

// Create new pokemon page
router.get('/new', function(req, res, next){
      res.render('newPokemon', {title: 'Create new Pokemon'});
    });

// Post new pokemon

router.post('/new', function(req, res, next){
  knex.raw(`insert into pokemon (name, type, trainer_id) values ('${req.body.name}', '${req.body.type}', '${req.body.trainerID}')`)
    .then(function(data){
      res.redirect('/pokemon')
    });
});

//Edit Pokemon page

router.get('/:id/edit', function(req, res, next){
  var pokeID = req.params.id;
  res.render('editPokemon', {title: 'Edit Pokemon', pokeID: pokeID});
});

//Delete Pokemon page

router.post('/:id/delete', function(req, res, next){
  var pokeID = req.params.id;
  knex.raw(`delete from pokemon where id = ${pokeID}`)
  .then(function(data){
    res.redirect('/pokemon');
  });
});

//Update pokemon

router.post('/:id/edit', function(req, res, next){
  var pokeID = req.params.id;
  knex.raw(`update pokemon set name = '${req.body.name}', type = '${req.body.type}', trainer_id = ${req.body.trainerID} where id = ${pokeID}`)
    .then(function(data){
      res.redirect('/pokemon/')
    });
});


// Individual Pokemon page

router.get('/:id', function(req, res, next){
  var pokeID = req.params.id;
  knex.raw(`select trainers.name AS "trainer_name", trainers.id AS "trainer_id", pokemon.* from pokemon join trainers on pokemon.trainer_id = trainers.id where pokemon.id = ${pokeID}`)
    .then(function(data){
      res.render('singlePokemon', {data: data.rows[0], pokeID: pokeID})
    });
});
module.exports = router;
