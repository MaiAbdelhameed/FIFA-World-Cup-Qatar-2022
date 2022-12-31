const { Int32 } = require('mongodb');
const mongoose=require('mongoose');

const schema=mongoose.Schema;

const reserveSchema = new schema({
    creditCard: {
        type:Number,
        required:true
    },
    PIN: {
        type:Number,
        required:true
    },
    numTickets:{
        type:Number, 
        required:true
    }
    // matchID:{
    //     type:Number
    // }
},{timestamps: true});

const reservations =mongoose.model('reservations', reserveSchema);
module.exports=reservations;