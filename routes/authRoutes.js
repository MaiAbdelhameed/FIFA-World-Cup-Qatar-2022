const express = require('express');
const authRouter = express.Router();
const authController=require('../controllers/authController');
const passport = require('passport');


///////////////////////post requests////////////////////////
authRouter.post('/sign-up',authController.signup);

authRouter.post('/login', authController.login);

module.exports=authRouter;

