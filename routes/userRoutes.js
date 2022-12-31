const express = require('express');
const userRouter = express.Router();
const userController=require('../controllers/userController.js');
const auth = require('../middleware/authJwt');


/////////////////////////get requests//////////////////////////
userRouter.get('/all-users', auth.adminAuth, userController.allUsers);

userRouter.get('/single-user/:id',userController.singleUser); 


/////////////////////////delete requests//////////////////////////
userRouter.delete('/delete/:id', auth.adminAuth, userController.deleteUser);


/////////////////////////put requests//////////////////////////
userRouter.put('/update/:id', auth.fanAuth,userController.editUser);


module.exports=userRouter;