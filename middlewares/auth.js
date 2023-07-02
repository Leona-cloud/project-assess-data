const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/User');

async function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied');

        try {
            const decoded = jwt.verify(token, process.env.jwtPrivateKey, { expiresIn: '1h'});
            const user = await User.findOne({_id: decoded._id});
            if(user){
                req.user = user;
                next();
            }else{
                return res.status(401).json({
                  success: false,
                  message: 'User access forbidden'
                })
              }
            
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token or Token expired'
              })
        };
    
};

module.exports = auth;