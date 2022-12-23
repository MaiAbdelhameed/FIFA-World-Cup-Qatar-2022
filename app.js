const http = require('http');
const dotenv=require('dotenv');
const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const bp = require('body-parser')
const app= express();
const bcrypt = require('bcrypt')
const authRoutes=require('./routes/authRoutes')
const matchRoutes=require('./routes/matchRoutes');


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


//authentiaction routes
app.use(authRoutes);


//user routes
app.use(userRoutes);


//match routes
app.use(matchRoutes);

//reservation routes


//stadium routes


// function getNextSequence(sequenceName){
//     var sequenceDocument = db.Users.findAndModify({
//        query:{_id: sequenceName },
//        update: {$inc:{sequence_value:1}},
//        new:true
//     });
//     return sequenceDocument.sequence_value;
// };