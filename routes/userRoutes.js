const express = require('express');
const userRouter = express.Router();
const userController=require('../controllers/userController.js');
const auth = require('../middleware/authJwt');


/////////////////////////get requests//////////////////////////
userRouter.get('/all-users', auth.adminAuth, userController.allUsers);

userRouter.get('/single-user',auth.adminAuth ,userController.singleUser); 


/////////////////////////delete requests//////////////////////////
userRouter.delete('/:id', auth.adminAuth, userController.deleteUser);


/////////////////////////put requests//////////////////////////
userRouter.put('/:id', auth.fanAuth,userController.editUser);


module.exports=userRouter;