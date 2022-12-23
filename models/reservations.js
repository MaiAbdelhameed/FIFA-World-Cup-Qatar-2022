const { Int32 } = require('mongodb');
const mongoose=require('mongoose');

const schema=mongoose.Schema;

const reservationsSchema = new schema({
    //username of the person who reserved
    reserve:{
        type:String,
        required: true
    },
    creditCard: {
        type:Int32,
        required:true
    },
    PIN:
    {
        type:Int32,
        required:true
    },
    matchID:{
        type:Int32,
        required:true
    }
},{timestamps: true});

const Reservations =mongoose.model('reservation', reservationsSchema);
module.exports=Reservations;