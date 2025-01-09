import { Router  } from "express";
import { createPost, deletePost, getAllPostData, 
    updatePost, updatePostImage,getPostWithLocationName,
    getUserPosts,getPostWithLimitedData,
    getPostBasedOnTitle,getPostsBasedOnId
 } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT} from "../middlewares/auth.middleware.js"


const postRouter = Router()
// postRouter.use(verifyJWT)
postRouter.route("/addPost").post(verifyJWT,upload.array("postImg",2),createPost)
postRouter.route("/updatePost/:postId").post(upload.array("postImg",2),updatePost)
postRouter.route("/deletePost/:postId").get(deletePost)
postRouter.route("/updatePostImage/:postId").post(upload.array("postImg",2),updatePostImage)
postRouter.route("/allPosts/").get(getAllPostData)
postRouter.route("/locationBasedPosts/").get(getPostWithLocationName)
postRouter.route("/getUserPosts/").get(verifyJWT,getUserPosts)
postRouter.route("/getPosts/").get(getUserPosts)
postRouter.route("/getLimitedPosts/").get(getPostWithLimitedData)
postRouter.route("/getPostOnTitle/:location").get(verifyJWT,getPostBasedOnTitle)
postRouter.route("/getPostById/:id").get(getPostsBasedOnId)


export {postRouter}