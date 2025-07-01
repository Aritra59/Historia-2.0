import Router from "express"
import { addComments } from "../controllers/comments.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
export const commentRouter = new Router()

commentRouter.route("/addComment").post(verifyJWT,addComments)
