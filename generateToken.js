const jwt=require('jsonwebtoken');

const generateToken=(payload)=>{
    return jwt.sign({payload}, process.env.JWT_secret, {
        expiresIn:'30d'
    });
};

module.exports=generateToken;