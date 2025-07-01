import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { user } from "../models/user.models.js"

export const rolesHandler = asyncHandler(async(req,res,next)=>{
const userId = req.User
if(!isValidObjectId(userId)) throw new apiError(401,"invalid identity")

    const userDatas = await user.findById(userId)
    if(!userDatas) {throw new apiError(400,"invalid user or not loggedIn!")}
    if(!userDatas?.admin==true) {
       return res.status(401).json(new apiResponse(401,"not a admin"))
    }
    else{
        next()
    }
})
