const express = require('express');
const authRouter = express.Router();
const authController=require('../controllers/authController');
const auth = require('../middleware/authJwt');

///////////////////////post requests////////////////////////
authRouter.post('/sign-up',authController.signup);

authRouter.post('/login', authController.login);

////////////////////////put request////////////////////////
authRouter.put('/sign-up-approve/:id', auth.adminAuth, authController.approveUser);

module.exports=authRouter;

