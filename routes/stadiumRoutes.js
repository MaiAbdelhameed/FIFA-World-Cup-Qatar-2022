const express = require('express');
const stadiumRouter = express.Router();
const stadiumController=require('../controllers/stadiumController');
const auth = require('../middleware/authJwt');

//////////////////post requests//////////////////////
stadiumRouter.post('/add-stadium', auth.managerAuth ,stadiumController.addStadium);


//////////////////get requests//////////////////////
stadiumRouter.get('/all-stadiums', auth.managerAuth, stadiumController.allStadiums);
stadiumRouter.get('/single-stadium/:id',auth.managerAuth, stadiumController.singleStadium);


///////////////////delete requests////////////////////////////////
stadiumRouter.delete('/delete/:id', auth.managerAuth, stadiumController.deleteStadium);


///////////////////put requests////////////////////////////////
stadiumRouter.put('/update/:id', auth.managerAuth, stadiumController.editStadium);


module.exports=stadiumRouter;