const express = require('express');
const authRouter = express.Router();
const authController=require('../controllers/authController');
const passport = require('passport');
const auth = require('../middleware/authJwt');


///////////////////////post requests////////////////////////
authRouter.post('/sign-up',authController.signup);

authRouter.post('/login', authController.login);

authRouter.post("/login", passport.authenticate("local", {

    successRedirect: "/home",
    
    failureRedirect: "/auth/login"
    
    }), function (req, res) {
    
    });



    
// authRouter.get('/sign-up', (req, res)=> {
//     Users.findById('639e5e6249ddd6ebba4e8bc0')
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//         res.status(400).send(err);
//     });
// })

module.exports=authRouter;

