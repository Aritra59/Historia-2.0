import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { isValidObjectId } from "mongoose"
import { apiError } from "../utils/apiError.js"
import { user } from "../models/user.models.js"

export const verifyJWT = asyncHandler(async (req,res,next)=>{
    const {accessToken,refreshToken } = req.cookies
    if(!(accessToken || refreshToken)) throw new apiError(404,"cookies not found as user is not logged In ")
    
        const isCorrect = await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        if(!isCorrect){
            throw new apiError(401,"cookie not valid ! please login ")
        }
        if(!isValidObjectId(isCorrect?._id)){
            throw new apiError("invalid user Id check ")
        }
        const isUserValid = await user.findById(isCorrect?._id)
        if(!isUserValid){
            throw new apiError(400,"user not found while parsing cookies")
        }
        console.log(isUserValid._id)
        req.User  = isUserValid._id
        next()
})
