
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {JWT_SECRECT_KEY} = require('../constants');
const User = require('../models/userModel');


const hashPassword = (user_cred) => {
    const md5_hash = crypto.createHash('md5');
    const hash_password = md5_hash.update(user_cred).digest('hex')
    return hash_password;
};


const verifyJWT = async (request, response, next) => {
    console.log(request.originalUrl);
    let jwt_token = request.headers.authorization
    if (jwt_token){
        jwt.verify(jwt_token, JWT_SECRECT_KEY, (error, decoded) => {
            if(error){
                console.log(error);
                response.status(401).json({"error": error.message})}
            else{
                const user = User.findById(decoded.id);
                if(user){next();}
                else{
                    response.status(401).json({"error": "UNAUTHORIZED"})
                }
            }
        });
    }
    else{
        response.status(401).json({"error": "UNAUTHORIZED"})
    }
}


const verifySuperUser = async (request, response, next) => {
    console.log(request.originalUrl);
    let jwt_token = request.headers.authorization;
    if (jwt_token){
        jwt.verify(jwt_token, JWT_SECRECT_KEY, (error, decoded) => {
            if(error){
                console.log(error);
                response.status(401).json({"error": error.message})}
            else{
                const isSuperuser = decoded.is_superuser;
                if(isSuperuser){next();}
                else{
                    response.status(401).json({"error": "UNAUTHORIZED"})
                }
            }
        });
    }
    else{
        response.status(401).json({"error": "UNAUTHORIZED"})
    }

}


const openAPI = async (request, response, next) => {
    console.log(request.originalUrl);
    next();
}


module.exports = {
    hashPassword, verifyJWT, verifySuperUser,
    openAPI
};