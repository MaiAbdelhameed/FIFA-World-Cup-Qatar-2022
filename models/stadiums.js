const mongoose=require('mongoose');

const schema=mongoose.Schema;

const stadiumSchema = new schema({
    

    
},{timestamps: true});

const Stadiums =mongoose.model('stadium', stadiumSchema);
module.exports=Stadiums;

