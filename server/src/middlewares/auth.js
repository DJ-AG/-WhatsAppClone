import asyncHandler from "./asyncHandler.js";
import * as config from "../utils/config.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;


    // Check if there is an authorization header and if it starts with "Bearer".
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        // Extract the JWT token from the authorization header.
        token = req.headers.authorization.split(" ")[1]
    }   

    // Check if a token is provided in cookies.
     else if(req.cookies.token){
        token = req.cookies.token
     }



    // Ensure that a token is provided.
    if(!token){
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }

    try{
        // Verify the token using JWT.verify method which will decode it.
        // If token is invalid/not formed correctly, it will throw an error.
        const decoded = jwt.verify(token, config.jwt_secret)

        console.log("this is decoded.id: ", decoded.id)

        // Find user with ID obtained from decoded token and attach user object to the request object.
        req.user = await User.findById(decoded.id)

        // Proceed to the next middleware or route handler.
        next()
    } catch(err){

        console.log("error triggered in protect")
        // Handle any errors that occur during token verification or user fetching.

        return next(new ErrorResponse("Not authorized to access this route", 401))
    }
});

export { protect }