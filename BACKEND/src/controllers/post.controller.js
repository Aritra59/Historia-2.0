import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { cloudUploader, cloudDataDeleter } from "../utils/cloudinary.js";
import { user } from "../models/user.models.js";
import { isValidObjectId } from "mongoose";
import { post } from "../models/post.models.js";


const createPost = asyncHandler(async (req, res) => {
  const { title, content, postLocation } = req.body
  const currentUser = req.User

  if (!(title || content ||postLocation)) {
    throw new apiError(400, "cannot find title or content in creatingPost controller")
  }
  const postImgs = await req.files
  // console.log(req.files)
  console.log(postImgs)
  if (!postImgs) {
    throw new apiError(401, "some error occured while getting postImages for posting ")
  }

  const allImgPaths = await Promise.all(
    postImgs.map(async (data) => {
      console.log(`Uploading: ${data.path}`);
      const uploadResult = await cloudUploader(data.path);
      return uploadResult.url;
    })
  );

  if (!allImgPaths.length > 0) {
    throw new apiError(400, "cloudinary data during upload not present")
  }

  const newPost = await post.create({
    title,
    content,
    owner: currentUser,
    postImg: allImgPaths,
    postLocation
  })

  const isPostValid = await post.aggregate([
    {
      $match: { _id: newPost._id }
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDataForPosts",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1
            }
          }
        ]
      }
    },
  ])

  if (!Array.isArray(isPostValid) && isPostValid.length < 0) {

    throw new apiError(400, "user creation failure or userFailiure")
  }

  return res.status(200).json(new apiResponse(200, isPostValid[0], "post created successfully!"))

})

const updatePost = asyncHandler(async (req, res) => {

  const { postId } = req.params
  const { content, title } = req.body

  if (!req.User && !isValidObjectId(req.User)) throw new apiError(400, "please login first ")
  if (!(content && title)) throw new apiError(400, "content and title not recieved while updating post ")
  if (!postId && !isValidObjectId(postId)) throw new apiError(400, 'Invalid post Id to edit for the user ')

  const updatedImg = await req.files
  if (!updatedImg) throw new apiError(400, "uploading failed during post editing")

  const postImg = await Promise.all(
    updatedImg.map(async (data) => {
      let uploadedData = await cloudUploader(data?.path)
      return uploadedData.url
    })
  )
  if (!postImg) throw new apiError(400, "image not uploaded while updating")
  const updatedState = await post.findByIdAndUpdate(postId, {
    $set: {
      content: content,
      title: title,
      postImg: postImg
    }
  })
  return res.status(200).json(new apiResponse(200, updatedState, "post update success"))

})

const deletePost = asyncHandler(async (req, res) => {

  const { postId } = req.params

  if (!req?.User) {
    throw new apiError(400, "not logged in i guess")
  }

  if (!postId && !isValidObjectId(postId)) {
    throw new apiError(400, "no params passed for deleting post")
  }

  const targetPost = await post.findById(postId)
  if (!targetPost) throw new apiError(400, "target post not exists or invalid request to delete")


  // delete associated images with the posts
  const imgDeletionStatus = await Promise.all(targetPost?.postImg.map(async (data) => {

    try {
      let parsedData = data.split("/")[data.split("/").length - 1].split(".")[0]
      const deletedImageStatus = await cloudDataDeleter(parsedData)
      console.log(deletedImageStatus)
      return deletedImageStatus
    } catch (error) {
      throw new apiError(400, error.message)
    }
  }))

  if (!imgDeletionStatus) {
    throw new apiError(400, "delete unsuccessful!")
  }

  const deletedStatus = await post.findByIdAndDelete(targetPost?._id)
  if (!deletedStatus) {
    throw new apiError(400, "delete unsuccessful!")
  }
  return res.status(200).json(new apiResponse(200, imgDeletionStatus, "img deletion success"))

})

const updatePostImage = asyncHandler(async (req, res) => {
  const { postId } = req.params

  if (!req?.User) {
    throw new apiError(400, "not logged in i guess")
  }

  if (!postId && !isValidObjectId(postId)) {
    throw new apiError(400, "no params passed for deleting post")
  }

  const targetPost = await post.findById(postId)
  if (!targetPost) throw new apiError(400, "target post not exists or invalid request to delete")

  const newImage = req?.files
  if (!newImage) throw new apiError(400, "new images not recieved for updating")

  const imageUploadStatus = await Promise.all(
    newImage.map(async (data) => {
      const uploaderStatus = await cloudUploader(data.path)
      return uploaderStatus?.url
    })
  )
  if (!imageUploadStatus) throw new apiError(400, "image upload failure")

  const oldData = targetPost?.postImg

  targetPost.postImg = imageUploadStatus
  await targetPost.save({ validateBeforeSave: false })

  const newUpdate = await post.findById(targetPost._id)
  if (!newUpdate) {
    throw new apiError(200, "post not found")
  }

  return res.status(200).json(new apiResponse(200,
    { oldData: oldData, newData: newUpdate.postImg },
    "post Image update Done!"))
})

const getAllPostData = asyncHandler(async (req, res) => {
const currentUser = req.User
const {pageNo}= req.query
const initialStart= 10

if(!currentUser ){
  throw new apiError(400,"please login to see content")
}

const allData = await post.aggregate([
  {
    $match: {}  
  },
  {
    $sort: {
      createdBy: 1  
    }
  },
  {
    $skip:(pageNo - 1) * initialStart
  },
  {
    $limit: initialStart 
  }
])


return res.status(200).json(new apiResponse(200,allData,"fetched all post Data!"))

})

const getPostWithLocationName = asyncHandler(async (req, res) => {
const {location} = req.query
if(!req.User){
  throw new apiError(401,"user not logged in")
}
if(!location){
  throw new apiError(400,"location not provided")
}
const locationBasedData = await post.aggregate([
   {
    $match:{
      postLocation:location
    }
   }
])

return res.status(200).json(
  new apiResponse(200,locationBasedData,"found")
)

})


const getUserPosts = asyncHandler(async(req,res)=>{ //will paginate later
const currentUser = req.User
const {pageNo}= req.query
// const initialStart= 10

if(!currentUser && !isValidObjectId){
throw new apiError(400,"please login First")
}

const userPosts =await user.aggregate([
  {
    $match:{
      _id:req?.User
    }
  },
    {
      $lookup:{
      from:"posts",
      localField:"_id",
      foreignField:"owner",
      as:"postsData"
    }
  },
  {
    $project:{
      username:1,
      userLocation:1,
      postsData:1
    }
  }
])
return res.status(200).json(new apiResponse(200,userPosts[0]?.postsData,"found")
)
})

const getPostWithLimitedData = asyncHandler(async (req, res) => { //how many u want
  const {count,recent,previous} = req.query
  
  const wantedData = await post.aggregate([
    {
      $limit:parseInt(count)
    },
    {
      $lookup:{
        from:"users",
        localField:"owner",
        foreignField:"_id",
        as:"ownerData",
        pipeline:[
          {
            $project:{
              username:1
            }
          }
        ]
      }
    }
  
  ])
  return res.status(200).json(new apiResponse(200,wantedData,`u got ${count} posts`))
  })

const getRecentPosts = asyncHandler(async (req, res) => {
  const {count} = req.query
  
  const wantedData = await post.aggregate([
    {
      $sort:{
        createdAt:0
      }
    },
    {
      $limit: parseInt(count)
    },
  ])
  return res.status(400).json(new apiResponse(400,wantedData[0],`u got ${count} posts`))
})

const getPostBasedOnTitle = asyncHandler(async(req,res)=>{
  const{location} = req.params

  if(!req.User) throw new apiError(404,"user not logged in or Invalid cookies")
  if(!location) throw new apiError(404,"location invalid or page not found when finding for current location")
  
    const actualPost =await post.find({
      title:location
    })
    if(actualPost.length<1) throw new apiError(404,"page not found")
return res.status(200).json(new apiResponse(200,actualPost,"post found!"))
})

const getPostsBasedOnId= asyncHandler(async(req,res)=>{

  const {id}= req.params
  if(!id) throw new apiError(400,"no id found from params fetched for post")

  if(!isValidObjectId(id)) throw new apiError(400,"not valid object id.Retry !")
  
    const data = await post.findById(id).select("-password")

  return res.status(200).json(new apiResponse(200,data,"post fetched successfully"))

})


export {
  createPost,
  updatePost,
  deletePost,
  updatePostImage,
  getAllPostData,
  getPostWithLocationName,
  getUserPosts,
  getPostWithLimitedData,
  getRecentPosts,
  getPostBasedOnTitle,
  getPostsBasedOnId
}