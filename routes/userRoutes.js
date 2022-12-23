const express = require('express');
const userRouter = express.Router();
const Users = require('../models/users');



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
userRouter.get('/all-users', (req, res)=> {
    Users.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


userRouter.get('/single-user', (req, res)=> {
    Users.findById()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
}); 


userRouter.delete('/users', (req,res)=>{
    const id = req.params.id;

    Users.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/users'})
    })
    .catch((err)=>console.log(err));
});


module.exports=userRouter;