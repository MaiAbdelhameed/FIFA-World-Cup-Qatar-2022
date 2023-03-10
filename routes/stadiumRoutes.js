const express = require('express');
const stadiumRouter = express.Router();
const stadiumController=require('../controllers/stadiumController');
const auth = require('../middleware/authJwt');

//////////////////post requests//////////////////////
stadiumRouter.post('/add-stadium', auth.managerAuth ,stadiumController.addStadium);


//////////////////get requests//////////////////////
stadiumRouter.get('/all-stadiums', stadiumController.allStadiums);
stadiumRouter.get('/single-stadium/:id', stadiumController.singleStadium);


///////////////////delete requests////////////////////////////////
stadiumRouter.delete('/delete/:id', auth.managerAuth, stadiumController.deleteStadium);


///////////////////put requests////////////////////////////////
stadiumRouter.put('/update/:id', auth.managerAuth, stadiumController.editStadium);


module.exports=stadiumRouter;