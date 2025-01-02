import { Router  } from "express";
import { createPost, deletePost, getAllPostData, 
    updatePost, updatePostImage,getPostWithLocationName,
    getUserPosts
 } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT} from "../middlewares/auth.middleware.js"


const postRouter = Router()
postRouter.use(verifyJWT)
postRouter.route("/addPost").post(upload.array("postImg",2),createPost)
postRouter.route("/updatePost/:postId").post(upload.array("postImg",2),updatePost)
postRouter.route("/deletePost/:postId").get(deletePost)
postRouter.route("/updatePostImage/:postId").post(upload.array("postImg",2),updatePostImage)
postRouter.route("/allPosts/").get(getAllPostData)
postRouter.route("/locationBasedPosts/").get(getPostWithLocationName)
postRouter.route("/getUserPosts/").get(getUserPosts)

export {postRouter}