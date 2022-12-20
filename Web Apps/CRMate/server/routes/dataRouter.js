const express = require('express');
const dataRouter = express.Router({mergeParams: true});
const dataController = require('../controllers/dataController');
const upload = require("../utils/multer")
const checkJwt = require('../auth');

/* Defines routes relating to data manipulation */

// Export's a User's Contacts
dataRouter.get('/:id/export', checkJwt, (req, res) => dataController.exportContacts(req, res));
// Imports a User's Contacts
dataRouter.post('/:id/import', checkJwt, upload.single('file'), (req, res) => dataController.importContacts(req, res));

module.exports = dataRouter
