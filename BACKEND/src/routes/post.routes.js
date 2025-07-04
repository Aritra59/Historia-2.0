import { Router } from "express";
import {
    createPost, deletePost, getAllPostData,
    updatePost, updatePostImage, getPostWithLocationName,
    getUserPosts, getPostWithLimitedData,
    getPostBasedOnTitle, getPostsBasedOnId, getALike, fetchLikes,searchPosts,fetchAllComments
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"


const postRouter = Router()
// postRouter.use(verifyJWT)
postRouter.route("/addPost").post(verifyJWT, upload.array("postImg", 3), createPost)
postRouter.route("/updatePost/:postId").post(upload.array("postImg", 3), updatePost)
postRouter.route("/deletePost/:postId").get(verifyJWT,deletePost)
postRouter.route("/updatePostImage/:postId").post(upload.array("postImg", 2), updatePostImage)
postRouter.route("/allPosts").get(verifyJWT,getAllPostData)
postRouter.route("/locationBasedPosts/:postId").get(getPostWithLocationName)
postRouter.route("/getUserPosts/").get(verifyJWT, getUserPosts)
postRouter.route("/getPosts/").get(getUserPosts)
postRouter.route("/getLimitedPosts/").get(getPostWithLimitedData)
postRouter.route("/getPostOnTitle/:location").get(verifyJWT, getPostBasedOnTitle)
postRouter.route("/getPostById/:id").get(getPostsBasedOnId)
postRouter.route("/likeSome/:postId").get(verifyJWT, getALike)
postRouter.route("/fetchLikes").get(verifyJWT, fetchLikes)
postRouter.route("/searchPost").get(searchPosts)


postRouter.route("/allComments/:postId").get(verifyJWT,fetchAllComments)


export { postRouter }