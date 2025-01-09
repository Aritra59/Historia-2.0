import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { user } from "../models/user.models.js";
import { isValidObjectId } from "mongoose";
import { post } from "../models/post.models.js";
import {like} from "../models/like.models.js"

const addALike = asyncHandler(async(req,res)=>{

})

export {addALike}
