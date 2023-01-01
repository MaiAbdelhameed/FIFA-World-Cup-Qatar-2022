const { uniqueId } = require('lodash');
const { Int32 } = require('mongodb');
const mongoose=require('mongoose');

const schema=mongoose.Schema;

const matchSchema= new schema({
    firstTeam: {
        type:String,
        required: true
    },
    secondTeam: {
        type:String,
        required: true
    },
    venue: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        required: true
    },
    time: {
        type:String,
        required: true
    },
    referee: {
        type:String,
        required: true
    },
    firstLinesmen:{
        type:String,
        required: true
    },
    secondLinesmen:{
        type:String,
        required: true
    },
    seating:{
        type:Array,
        required:true
    }
}, {timestamps: true});

const Match=mongoose.model('match', matchSchema);
module.exports=Match;