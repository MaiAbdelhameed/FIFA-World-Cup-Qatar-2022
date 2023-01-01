const { Int32 } = require('mongodb');
const mongoose=require('mongoose');

const schema=mongoose.Schema;

const reserveSchema = new schema({
    numTickets:{
        type:Number, 
        required:true
    },
    matchID:{
         type:String, 
         required:true
    },
    userID:{
        type:String,
        requred:true
    }

},{timestamps: true});

const reservations =mongoose.model('reservations', reserveSchema);
module.exports=reservations;