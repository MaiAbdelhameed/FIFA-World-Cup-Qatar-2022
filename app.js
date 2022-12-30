const http = require("http");
const dotenv=require("dotenv");
const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const bp = require('body-parser');
const app= express();
//const bcrypt = require('bcrypt');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const matchRouter = require('./routes/matchRoutes');
//const stadiumRouter = require('./routes/stadiumRoutes');
//const reserveRouter = require('./routes/reserveRoutes');


app.use(express.json());

// Set up Global configuration access
dotenv.config();

let port = process.env.PORT || 3000;
//connect to mongodbs
const db=process.env.NGO_URL_HOSTED;
mongoose.set('strictQuery', true);
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> app.listen(port))
.catch((err)=>console.log('DB connection error',err));


//app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));



//////////////user routes////////////
app.use('/users',userRouter);


/////////////auth routes/////////////
app.use('/auth', authRouter);


/////////////match routes/////////////
app.use('/matches', matchRouter);


/////////////stadiumroutes//////////////
//app.set('/stadium', stadiumRouter);


/////////////reservations routes//////////////
//app.set('/rservations', reservationsRouter);