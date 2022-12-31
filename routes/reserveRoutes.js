const express = require('express');
const reserveRouter = express.Router();
const reserveController=require('../controllers/reserveController');
const auth = require('../middleware/authJwt');

//////////////////post requests//////////////////////
reserveRouter.post('/add-reserve', reserveController.addReserve);


//////////////////get requests//////////////////////
reserveRouter.get('/all-reserves', auth.managerAuth, reserveController.allReserves);
reserveRouter.get('/single-reserve/:id', reserveController.singleReserve);


//////////////////delete requests//////////////////////
reserveRouter.delete('/delete/:id', reserveController.deleteReserve);


//////////////////put requests//////////////////////
reserveRouter.put('/update/:id', reserveController.editReserve);


module.exports=reserveRouter;