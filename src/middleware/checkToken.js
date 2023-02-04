const errorResponse = require("../helpers/errorResponse");
const {verify} = require('jsonwebtoken')
const createError = require('http-errors');
const User = require("../models/User");

module.exports = async(req,res,next) => {
    try {

        if(!req.headers.authorization){
            throw createError(401,"Se requiere un token");
        }

        const token = req.headers.authorization;
        const decoded = verify(token, process.env.TOKEN);
        req.user = await User.findById(decoded.id).select("name");
        next()
        
    } catch (error) {
        return errorResponse(res,error, "CHECK-TOKEN");
        

    }
}