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

const isPostValid = await post.aggregate([
  {
    $match:{ _id:newPost._id}
  },
  {
    $lookup:{
      from:"users",
      localField:"owner",
      foreignField:"_id",
      as:"ownerDataForPosts",
      pipeline:[
        {
          $project:{
            username:1,
            avatar:1
          } 
      }
      ]
    }
  },
])

if(!Array.isArray(isPostValid) && isPostValid.length<0){

 throw new apiError(400,"user creation failure or userFailiure")
}

return res.status(200).json( new apiResponse(200,{...isPostValid},"post created successfully!"))

})


const updatePost  =asyncHandler(async(req,res)=>{

const {postId} = req.params
const {content,title}= req.body
// console.log(postId)
if( !req.user &&! isValidObjectId(req.User) ) throw new apiError(400,"please login first " )
if(!(content && title)) throw new apiError(400,"content and title not recieved while updating post ")
if(!postId && !isValidObjectId(postId)) throw new apiError(400, 'Invalid post Id to edit for the user ')

const updatedImg = await req.files
if(!updatedImg) throw new apiError(400,"uploading failed during post editing")

const postImg = 
await Promise.all(
  updatedImg.map(async (data)=>{
    let uploadedData = await cloudUploader(data?.path)
    return uploadedData.url
  })
)
const updatedState = await post.findByIdAndUpdate(postId,{
  $set:{
    content:content,
    title:title,
    postImg:postImg
  }
})
return res.status(200).json(new apiResponse(200,updatedState,"post update success"))

})


const deletePost  =asyncHandler(async(req,res)=>{

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

export {createPost,
  updatePost
}