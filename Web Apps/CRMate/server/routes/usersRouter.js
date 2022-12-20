var express = require('express');
var usersRouter = express.Router();

var peopleRouter = require('./peopleRouter');

var usersController = require('../controllers/usersController');

// The below two get method should be removed at deployment. 
// Left for testing purposes

// GET all users
usersRouter.get('/', (req, res) => usersController.getAllUsers(req, res));

// GET user by id
usersRouter.get('/:id', (req, res) => usersController.getOneUser(req, res));

// POST add new user
usersRouter.post('/', (req, res) => usersController.addUser(req, res));

// forward /people requests to people router
usersRouter.use('/:id/people', peopleRouter);

module.exports = usersRouter;
