const jwt = require("jsonwebtoken");
const config = require("../auth.config.js");
const auths = {};
const Users = require('../models/users.js');


auths.fanAuth = (req, res, next) => {

  var token
  try {  
      if(req.headers.authorization ||req.session.token){
        if (req.headers.authorization) {
          token = req.headers.authorization.split(" ")[1];
         }
        else if(req.session.token){
          token=req.session.token
         }
        
          if (token) {
              const decodedToken = jwt.verify(token, process.env.JWT_KEY);
              req.userData = decodedToken;
              next();
          } else {
              handleError(null, next);
          }
      } else {
          handleError(null, next);
      }
  } catch (error) {
      handleError(error, next);
  }
};


auths.adminAuth = async (req, res, next) => {
  try {
      if(req.headers.authorization ||req.session.token){
        if (req.headers.authorization) {
          token = req.headers.authorization.split(" ")[1];
         }
        else if(req.session.token){
      
          token=req.session.token
         }
          if (token) {
              const decodedToken = jwt.verify(token, process.env.JWT_KEY);
              req.userData = decodedToken;
              let user=await Users.findById(req.userData._id);
              console.log(user);
              if (user.role != "admin") {
                  throw new Error();
              }
              next();
          } else {
              handleError(null, next);
          }
      } else {
          handleError(null, next);
      }
  } catch (error) {
      handleError(error, next);
  }
};


auths.managerAuth = async (req, res, next) => {
    try {
        if(req.headers.authorization ||req.session.token){
          if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
           }
          else if(req.session.token){
        
            token=req.session.token
           }
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decodedToken;
                let user=await Users.findById(req.userData._id);
                console.log(user);
                if (user.role != "manager") {
                    throw new Error();
                }
                next();
            } else {
                handleError(null, next);
            }
        } else {
            handleError(null, next);
        }
    } catch (error) {
        handleError(error, next);
    }
  };

module.exports = auths

function handleError(error, next) {
  if (error) {
      error.message = 'Auth Failed!!!';
      error.status = 401
      next(error);
  } else {
      const error = new Error();
      error.message = 'Auth Failed!!';
      error.status = 401
      next(error);
  }
}

