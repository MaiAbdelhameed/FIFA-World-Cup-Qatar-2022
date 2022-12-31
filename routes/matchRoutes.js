const express = require('express');
const matchRouter = express.Router();
const matchController=require('../controllers/matchController');
const auth = require('../middleware/authJwt');

//////////////////post requests//////////////////////
matchRouter.post('/add-match', auth.managerAuth, matchController.addMatch);


//////////////////get requests//////////////////////
matchRouter.get('/all-matches', matchController.allMatches);
matchRouter.get('/single-match/:id', matchController.singleMatch);


//////////////////delete requests//////////////////////
matchRouter.delete('/delete/:id', auth.managerAuth, matchController.deleteMatch);


//////////////////put requests//////////////////////
matchRouter.put('/update/:id', auth.managerAuth, matchController.editMatch);


module.exports=matchRouter;