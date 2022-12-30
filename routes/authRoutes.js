const express = require('express');
const authRouter = express.Router();
const authController=require('../controllers/authController');


///////////////////////post requests////////////////////////
authRouter.post('/sign-up',authController.signup);

authRouter.post('/login', authController.login);

module.exports=authRouter;

