const mongoose=require('mongoose');

const schema=mongoose.Schema;

const stadiumSchema = new schema({
    venue:{
        type:String,
        required:true
    },
    numRows:{
        type:Number,
        required:true
    },
    numSeats:{
        type: Number,
        required:true
    },
    seating:{
        type:Array,
        required:true
    }
},{timestamps: true});
const stadium = mongoose.model('stadium', stadiumSchema, 'stadium');
module.exports=stadium;

