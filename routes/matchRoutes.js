const express = require('express');

const matchRouter = express.Router();
const Match = require('../models/matches');


matchRouter.get('/add-match', (req, res)=>{
    const newMatch = new Match(req.body);

    newMatch.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
});


matchRouter.get('/all-matches', (req, res)=> {
    Match.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


matchRouter.get('/single-match', (req, res)=> {
    Match.findById('')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
});


matchRouter.delete('/single-match/:id', (req,res)=>{
    const id = req.params.id;

    Match.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/all-matches'})
    })
    .catch((err)=>console.log(err));
});


module.exports=matchRouter;