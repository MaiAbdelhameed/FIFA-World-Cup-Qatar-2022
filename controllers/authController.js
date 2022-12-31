//const config = require("../config/auth.config");
const Users=require('../models/users');
const jwt = require("jsonwebtoken");
//var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const user = await Users.create({ ...req.body});
        if (!(user.username && user.pass && user.firstName && user.lastName && user.birthDate && user.gender && user.email && user.role)) {
            res.status(400).send("Please fill all required inputs");
        }
        
        return res.json(user);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
      }
};



exports.login =  async (req, res) => {
    try {
        let user
        if(req.body.username ){
        user = await Users.findOne({ username: req.body.username });

        if (!user) {
            throw new Error("User is not found");
          }

          if (req.body.pass !== user.pass) {
            throw new Error("Password is incorrect");
          }
      
          const token = await user.generateAuthToken();
      
          return res.json({ token, user });
        }
    }
    catch(err){
        return res.status(400).json({ message: err.message });
    }
}


