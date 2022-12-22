const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const Users = require('./models/users');
const Match = require('./models/matches');
const bp = require('body-parser')
const app= express();
const bcrypt = require('bcrypt')
const passport = require('passport');


const port = 10000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });
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

app.get('http://fifaqatarworldcup.com/home', (req, res)=> {
    res.render('home', {title: 'Home'});
});

app.get('http://fifaqatarworldcup.com/', (req, res)=> {
    res.redirect('/home');
});






//user routes
app.get('http://fifaqatarworldcup.com/add-user', (req, res)=>{
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


app.get('http://fifaqatarworldcup.com/all-users', (req, res)=> {
    Users.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


app.get('http://fifaqatarworldcup.com/single-user', (req, res)=> {
    Users.findById()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
}); 


app.post('http://fifaqatarworldcup.com/auth/sign-up', async (req, res)=> {
    
    const username = req.body.username;
    const pass=req.body.pass;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDate=req.body.birthDate;
    const gender= req.body.gender;
    const nationality=req.body.nationality;
    const email = req.body.email;
    const role=req.body.role;

    // const saltPassword = await bcrypt.genSalt(12)
    // const securePassword = await bcrypt.hash(request.body.password, saltPassword)


    const newUser = new Users({
        username,
        securePassword,
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
});

app.get('http://fifaqatarworldcup.com/auth/sign-up', (req, res)=> {
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

app.post('http://fifaqatarworldcup.com/auth/login', function (req, res) {
    const email=req.body.email;
    const pass=req.body.pass;

	Users.findOne({email}, async function(err,data){
		if(data){ 
            console.log(data)
            console.log(data.password)
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
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});



app.post("http://fifaqatarworldcup.com/auth/login", passport.authenticate("local", {

    successRedirect: "/home",
    
    failureRedirect: "/auth/login"
    
    }), function (req, res) {
    
    });


app.delete('http://fifaqatarworldcup.com/:id', (req,res)=>{
    const id = req.params.id;

    Users.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/users'})
    })
    .catch((err)=>console.log(err));
});




//match routes

app.get('http://fifaqatarworldcup.com/add-match', (req, res)=>{
    const newMatch = new Match(req.body);

    newMatch.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
});


app.get('http://fifaqatarworldcup.com/all-matches', (req, res)=> {
    Match.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


app.get('http://fifaqatarworldcup.com/single-match', (req, res)=> {
    Match.findById('')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


app.delete('http://fifaqatarworldcup.com/single-match/:id', (req,res)=>{
    const id = req.params.id;

    Match.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/all-matches'})
    })
    .catch((err)=>console.log(err));
});


