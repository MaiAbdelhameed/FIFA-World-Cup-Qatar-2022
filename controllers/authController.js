const config = require("../config/auth.config");
const Users=require('../models/users');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        //const userID=getNextSequence("userID");
        const username = req.body.username;
        const pass=req.body.pass;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const birthDate=req.body.birthDate;
        const gender= req.body.gender;
        const nationality=req.body.nationality;
        const email = req.body.email;
        const role=req.body.role;
        if (!(username && pass && firstName && lastName && birthDate && gender && email && role)) {
            res.status(400).send("Please fill all required inputs");
            }

        // const saltPassword = await bcrypt.genSalt(12)
        // const securePassword = await bcrypt.hash(request.body.password, saltPassword)

        var oldUser = await Users.findOne({ email });
        if (oldUser) {
            return res.status(409).send("Email already registered. Please login");
            }
        
        var oldUser = await Users.findOne({ username });
        if (oldUser) {
            return res.status(409).send("User already registered. Please login");
            }

        const newUser = new Users({
           // userID,
            username,
            pass,
            firstName, 
            lastName,
            birthDate,
            gender,
            nationality,
            email,
            role
        });

        
        //generating user token
        const token = await Users.generateAuthToken();
        newUser.token=token;
        console.log(token);

        newUser.save()
        .then((result)=>{
            res.send({result, token})
        }).catch((err)=>{
            console.log(err)
        });

        
        }
    catch (err) {
        console.log(err);
    }
};