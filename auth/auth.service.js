require('dotenv').config()
const { findOneUser } = require('../api/user/user.service');
const compose = require ('composable-middleware');
const jsonWebToken = require('jsonwebtoken');


function isAuth(){
    return compose().use(async(req, res, next)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'No token provided'});
        }
        const token = authHeader.split(' ')[1];
        const payload = await verifyToken(token);
        if(!payload){
            return res.status(401).json({message: 'Invalid token'});
        }
        const user = await findOneUser({username: payload.username});
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        req.user = user;
        req.body.username = req.user.username;
        next();
    });
}

function hasRole(allowedRoles = []){
    return compose().use(isAuth()).use(async(req, res, next)=>{
        const { role } = req.user;
        if(!allowedRoles.includes(role)){
            return res.status(401).json({message: 'User not authorized'});
        }
        next();
        return null;
    });
}

async function verifyToken(token){
    try{
        return await jsonWebToken.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return null;
    }
}

function signToken(payload){
    const token = jsonWebToken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
    return token;
}

module.exports = {
    isAuth,
    hasRole,
    signToken,
    verifyToken
};
