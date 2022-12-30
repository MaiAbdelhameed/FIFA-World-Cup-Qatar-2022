const { Int32 } = require('mongodb');
const mongoose=require('mongoose');

const schema=mongoose.Schema;

const stadiumSchema = new schema({
    venue:{
        type: String,
        required:true
    },
    numRows:{
        type:Int32,
        required:true
    },
    numSeats:{
        type: Int32,
        required:true
    },
    seating:{
        type:Array,
        required:true
    }
},{timestamps: true});

const Stadiums =mongoose.model('stadium', stadiumSchema);
module.exports=Stadiums;

