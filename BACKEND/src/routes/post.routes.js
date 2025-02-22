import { Router } from "express";
import {
    createPost, deletePost, getAllPostData,
    updatePost, updatePostImage, getPostWithLocationName,
    getUserPosts, getPostWithLimitedData,
    getPostBasedOnTitle, getPostsBasedOnId, getALike, fetchLikes,searchPosts
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"


const postRouter = Router()
// postRouter.use(verifyJWT)
postRouter.route("/addPost").post(verifyJWT, upload.array("postImg", 2), createPost)
postRouter.route("/updatePost/:postId").post(upload.array("postImg", 2), updatePost)
postRouter.route("/deletePost/:postId").delete(verifyJWT,deletePost)
postRouter.route("/updatePostImage/:postId").post(upload.array("postImg", 2), updatePostImage)
postRouter.route("/allPosts/").get(getAllPostData)
postRouter.route("/locationBasedPosts/").get(getPostWithLocationName)
postRouter.route("/getUserPosts/").get(verifyJWT, getUserPosts)
postRouter.route("/getPosts/").get(getUserPosts)
postRouter.route("/getLimitedPosts/").get(getPostWithLimitedData)
postRouter.route("/getPostOnTitle/:location").get(verifyJWT, getPostBasedOnTitle)
postRouter.route("/getPostById/:id").get(getPostsBasedOnId)
postRouter.route("/likeSome/:postId").get(verifyJWT, getALike)
postRouter.route("/fetchLikes").get(verifyJWT, fetchLikes)
postRouter.route("/search").get(searchPosts)


export { postRouter }