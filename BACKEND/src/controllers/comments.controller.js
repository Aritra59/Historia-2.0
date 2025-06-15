import mongoose, { isValidObjectId } from "mongoose"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import {comments} from "../models/comments.models.js"
import { post } from "../models/post.models.js";


const addComments = asyncHandler(async(req,res)=>{
    const {content ,postId} = req.body
    const currentUser = req.User

    if(!currentUser) throw new apiError(401,"user not logged in to comment")
    if(!postId && !content && !isValidObjectId(postId) ) throw new apiError(400,"comment data not included")
    
        const commentRes = await comments.create({
            postId,
        userId: currentUser,
            content
        })
        if(!commentRes) throw new apiError(400,"comment object creation unsuccessful!")

        const postIdUpdate = await post.findById(postId)
        
        postIdUpdate.comments.push(commentRes._id)
        await postIdUpdate.save({validateBeforeSave:false})

        const postIdUpdateNew  = await post.findById(postId)
        return res.status(200).json(new apiResponse(200,postIdUpdate,"post and comments created successfully"))
 
    
})

// const fetchAllComments = asyncHandler(async(req,res)=>{
//     const {commentId} = req.body
//     if(!isValidObjectId(commentId)) throw new apiError(400,"invalid commentID ")
    
// })
export {addComments}