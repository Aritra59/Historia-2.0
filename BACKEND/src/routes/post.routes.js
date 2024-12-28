import { Router  } from "express";
import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";

const postRouter = Router()

postRouter.route("/addPost").post(upload.array("postImg",2),createPost)

export {postRouter}