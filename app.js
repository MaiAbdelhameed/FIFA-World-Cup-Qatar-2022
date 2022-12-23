const http = require("http");
const dotenv=require("dotenv");
const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const Users = require('./models/users');
const Match = require('./models/matches');
const bp = require('body-parser')
const app= express();
const bcrypt = require('bcrypt')
const passport = require('passport');
const jwt = require('jsonwebtoken');

app.use(express.json());

// Set up Global configuration access
dotenv.config();

let port = process.env.PORT || 3000;
//connect to mongodb
const db='mongodb+srv://mai101:123hobba@cluster0.mldedku.mongodb.net/FIFA?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> app.listen(port))
.catch((err)=>console.log('DB connection error',err));

app.set('view engine','ejs');
// app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/home', (req, res)=> {
    res.render('home', {title: 'Home'});
});

app.get('/', (req, res)=> {
    res.redirect('/home');
});






//user routes
app.get('/add-user', (req, res)=>{
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


app.put('/user/:id', (req, res)=>{
    const id = req.params.id;

    Users.findByIdAndUpdate(id, req.body)
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
});


app.get('/all-users', (req, res)=> {
    Users.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


app.get('/single-user', (req, res)=> {
    Users.findById()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
}); 


app.post('/auth/sign-up', async (req, res)=> {
    
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

app.get('/auth/sign-up', (req, res)=> {
    Users.findById('639e5e6249ddd6ebba4e8bc0')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})

/* app.post('/auth/login', async (req, res)=> {
    
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

app.post('/auth/login', function (req, res) {
    const username=req.body.username;
    const pass=req.body.pass;
    
	const user = Users.findOne({username}, async function(err,data){
		if(data){ 
            //console.log(data)
            //console.log(data.password)
            //const validPassword = await bcrypt.compare(pass, hashedPassword);
			if(data.pass==pass){
				//console.log("Done Login");
				//req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.json({
                    _id:user.id,
                    username:user.username,
                    email: user.email,
                    token:generateToken(user._id)
                });
				
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



app.post("/auth/login", passport.authenticate("local", {

    successRedirect: "/home",
    
    failureRedirect: "/auth/login"
    
    }), function (req, res) {
    
    });


app.delete('/user/:id', (req,res)=>{
    const id = req.params.id;

    Users.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/users'})
    })
    .catch((err)=>console.log(err));
});




/////////////////////////match routes//////////////////////////////////////

app.get('/add-match', (req, res)=>{
    const newMatch = new Match(req.body);

    newMatch.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
});


app.get('/all-matches', (req, res)=> {
    Match.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


app.get('/single-match', (req, res)=> {
    Match.findById('')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


app.delete('/single-match/:id', (req,res)=>{
    const id = req.params.id;

    Match.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/all-matches'})
    })
    .catch((err)=>console.log(err));
});



const activeToken = async (req, res, next) =>{

    Users.findOne({
        activeToken: req.params.activeToken
        //activeExpires: {$gt: DataTransfer.now()}
    }, function (err, user) {
        if (err) return next(err);

        if (!user) {
            return res.status(404).json({
                sucess:false,
                msg: 'Your activation link is invalid'
            });
        }

        if (user.active == true){
            return res.status(200).json({
                success:true,
                msg :'Your account already activated go and login'
            });
        }

        user.acive=true;
        user.save((err,user)=> {
            if (err) return next(err);

            res.json({
                success:true,
                msg:'Activation sucess'
            });
        });
    })
};