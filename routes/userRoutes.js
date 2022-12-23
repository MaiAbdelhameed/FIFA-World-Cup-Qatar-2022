const express = require('express');
const userRouter = express.Router();
const Users = require('../models/users');
const userController=require('../controllers/userController');

userRouter.get('/add-user', (req, res)=>{
    const user0= new Users({
        username: 'maiii',
        pass: '1234',
        firstName: 'Maii',
        lastName: 'Abdelhameed',
        birthDate: "2001-01-28",
        gender: 'Female',
        email: 'mai@gmail.com',
        role: 'manager'
    });
    user0.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
});

//for administrator
userRouter.get('/all-users', userController.allUsers);


userRouter.get('/single-user', (req, res)=> {
    Users.findById()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
}); 


userRouter.delete('/users/:id', (req,res)=>{
    const id = req.params.id;

    Users.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/users'})
    })
    .catch((err)=>console.log(err));
});


userRouter.put('/users/:id', (req, res)=>{
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body)
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
});


module.exports=userRouter;