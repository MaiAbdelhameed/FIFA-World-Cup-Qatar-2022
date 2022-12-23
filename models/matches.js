const { uniqueId } = require('lodash');
const { Int32 } = require('mongodb');
const mongoose=require('mongoose');

const schema=mongoose.Schema;

const matchSchema= new schema({
    // matchID: {
    //     type:Int32,
    //     required: false,
    //     unique:true
    // },
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
    dateTime: {
        type:Date,
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
    }
}, {timestamps: true});

const Match=mongoose.model('match', matchSchema);
module.exports=Match;