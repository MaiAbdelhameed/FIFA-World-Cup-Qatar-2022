const express = require('express');
const matchRouter = express.Router();
const matchController=require('../controllers/matchController');
const auth = require('../middleware/authJwt');

//////////////////post requests//////////////////////
matchRouter.post('/add-match', auth.managerAuth, matchController.addMatch);


//////////////////get requests//////////////////////
matchRouter.get('/all-matches', auth.managerAuth, matchController.allMatches);
matchRouter.get('/single-match', auth.managerAuth, matchController.singleMatch);


///////////////////delete requests////////////////////////////////
matchRouter.delete('/match/:id', auth.managerAuth, matchController.deleteMatch);


///////////////////put requests////////////////////////////////
matchRouter.put('/match/:id', auth.managerAuth, matchController.editMatch);


module.exports=matchRouter;