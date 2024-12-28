import mongoose  from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse } from "../utils/apiResponse.js"
import { cloudUploader } from "../utils/cloudinary.js";
import { user } from "../models/user.models.js";
import { isValidObjectId } from "mongoose";
import { post } from "../models/post.models.js";


const createPost =asyncHandler(async(req,res)=>{
const {title,content} = req.body
const currentUser = req.User
if(!(title || content)){
    throw new apiError(400,"cannot find title or content in creatingPost controller")
}
const postImgs = await req.files
// console.log(req.files)
console.log(postImgs)
if(!postImgs){
    throw new apiError(401,"some error occured while getting postImages for posting ")
}

const allImgPaths = await Promise.all(
    postImgs.map(async (data) => {
      console.log(`Uploading: ${data.path}`);
      const uploadResult = await cloudUploader(data.path);
      return uploadResult.url; 
    })
  );

if(!allImgPaths.length>0){
throw new apiError(400,"cloudinary data during upload not present")
}

const newPost = await post.create({
  title,
  content,
  owner:currentUser,
  postImg:allImgPaths,
})

const isPostValid = post.aggregate([
  {
    $match: newPost._id
  }
])
return res.status(200).json( new apiResponse(200,newPost))

})


const deletePost  =asyncHandler(async(req,res)=>{

})
const updatePost  =asyncHandler(async(req,res)=>{

})
const updatePostImage =asyncHandler(async(req,res)=>{

})
const getAllUserPostData =asyncHandler(async(req,res)=>{

})
const getPostWithLocationName =asyncHandler(async(req,res)=>{
    
})
const getPostWithLimitedData=asyncHandler(async(req,res)=>{

})
const getRecentPosts=asyncHandler(async(req,res)=>{

})

export {createPost}