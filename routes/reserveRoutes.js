const express = require('express');
const reserveRouter = express.Router();
const reserveController=require('../controllers/reserveController');
const auth = require('../middleware/authJwt');

//////////////////post requests//////////////////////
reserveRouter.post('/add-reserve/:userID/:matchID', reserveController.addReserve);


//////////////////get requests//////////////////////
reserveRouter.get('/all-reserves', reserveController.allReserves);  //for me
reserveRouter.get('/single-user-reserve/:userID', reserveController.singleReserve);


//////////////////delete requests//////////////////////
reserveRouter.delete('/delete/:userID/:matchID', reserveController.deleteReserve);



module.exports=reserveRouter;