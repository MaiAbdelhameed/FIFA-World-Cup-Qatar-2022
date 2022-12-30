const { uniqueId } = require('lodash');
const { Int32 } = require('mongodb');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');

const schema=mongoose.Schema;

const usersSchema=new schema({
    // userID: {
    //     type:Int32,
    //     required: true,
    //     unique: true
    // },
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
        type: Date,
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


usersSchema.statics.findByCredentials = async function(username,pass) {

    const user = await Users.findOne({username})

    if(!user) {
        throw new Error ('No Such User Exists')
    }

    if(pass!== user.pass) {
        throw new Error ('Incorrect Password !')
    } else {
        return user
    }
}

usersSchema.methods.generateAuthToken = async function(){
    const user = this    
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY, {
        expiresIn: "24h", // expires in 365 days
      });
    return token
}



const Users=mongoose.model('users', usersSchema);
module.exports=Users;