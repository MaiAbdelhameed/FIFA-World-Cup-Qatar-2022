const Users = require('../models/users');

const allUsers=(req, res)=> {
    Users.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });

};

module.exports={allUsers};