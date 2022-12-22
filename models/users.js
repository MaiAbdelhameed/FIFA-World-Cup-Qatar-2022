const { uniqueId } = require('lodash');
const mongoose=require('mongoose');

const schema=mongoose.Schema;

const usersSchema=new schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    pass: {
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    nationality:{
        type:String,
        required: false
    },
    email: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true
    }
},{timestamps: true});

const Users=mongoose.model('users', usersSchema);
module.exports=Users;