var express = require('express');
var peopleRouter = express.Router({mergeParams: true});

var peopleController = require('../controllers/peopleController');
var checkJwt = require('../auth');

// GET all user's contacts
peopleRouter.get('/', checkJwt, (req, res) => peopleController.getAll(req, res));

// GET search a contact
peopleRouter.get('/search', checkJwt, (req, res) => peopleController.search(req, res));

// POST add a contact into user's list of contacts
peopleRouter.post('/add', checkJwt, (req, res) => peopleController.add(req, res));

// POST update a contact
peopleRouter.post('/:contactId', checkJwt, (req, res) => peopleController.update(req, res));

// DELETE remove a contact 
peopleRouter.delete('/:contactId', checkJwt, (req, res) => peopleController.remove(req, res));


module.exports = peopleRouter;