const jwt = require('jsonwebtoken')
const User = require('../model/User')
const config = require('config')

const requireAuth = (req, res, next) => {
    // Get token
    const token = req.cookies.jwt
    console.log(token);

    // check if jwt exists and is verified
    if(token){
        jwt.verify(token, config.get('jwtSecret'), (err, decodedToken) =>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Token is available");
                // console.log(decodedToken);
                next();
            }
        })
    }else {
        console.log("Token is not available");
        return res.send('Token is not available')
    }
}


// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, config.get('jwtSecret'), async (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.locals.user = null
            }else{
                // console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user
                next()
            }
        })
        console.log("Token is for the current user");
    }else {
        res.locals.user = null;
        next();
        console.log("Token is not for this user");
    }
}

module.exports = { requireAuth, checkUser };