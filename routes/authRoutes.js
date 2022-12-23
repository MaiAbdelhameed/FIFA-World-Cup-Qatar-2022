const express = require('express');

const authRouter = express.Router();
const Users = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');


authRouter.post('/auth/sign-up', async (req, res)=> {
    
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
            return res.status(409).send("User Already Exist. Please Login");
            }
        
        var oldUser = await Users.findOne({ username });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
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

        newUser.save()
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{
            console.log(err)
        });

        //generating user token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: 12,
        }

        const token = jwt.sign(data, jwtSecretKey);
        newUser.token=token;
        res.setHeader();
        res.send(token);
        }
    catch (err) {
        console.log(err);
    }



        // //create token
        // const token = jwt.sign(
        //     { user_id: newUser._id, email },
        //     process.env.TOKEN_KEY,
        //     {
        //         expiresIn: "2h",
        //     }
        //     );

        //     // save user token
        // newUser.token = token;

        // // return new user
        // res.status(201).json(newUser);
        // } 
        // catch (err) {
        //     console.log(err);}

});

authRouter.get('/auth/sign-up', (req, res)=> {
    Users.findById('639e5e6249ddd6ebba4e8bc0')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})

/* authRouters.post('/auth/login', async (req, res)=> {
    
    const email=req.body.email;
    const pass=req.body.pass;
    // const validPassword = await bcrypt.compare(pass, hashedPassword);
    
    const exists = Users.findOne({
        email
    });
    
    if (exists)
        res.json({redirect: '/home'});
    else
        res.send('no');
    
}); */

authRouter.post('/auth/login', function (req, res) {
    const username=req.body.username;
    const pass=req.body.pass;

	Users.findOne({username}, async function(err,data){
		if(data){ 
            //console.log(data)
            //console.log(data.password)
            //const validPassword = await bcrypt.compare(pass, hashedPassword);
			if(data.pass==pass){
				//console.log("Done Login");
				//req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This username Is not regestered!"});
		}
	});

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.get(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
           res.send("Successfully Verified");
        }
        else {
            res.send("not verified");
        }
    } catch (error) {
        // Access Denied
        console.log(error);
    }


});



authRouter.post("/auth/login", passport.authenticate("local", {

    successRedirect: "/home",
    
    failureRedirect: "/auth/login"
    
    }), function (req, res) {
    
    });

module.exports=authRouter;
