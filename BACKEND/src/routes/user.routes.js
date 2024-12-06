import Router from "express"
import { signUp,login } from "../controllers/users.controller.js"
import { upload } from "../middlewares/multer.js"


const userRouter= Router()

userRouter.route("/signUp").post(upload.fields([
    {name:"avatar",maxCount:1}
]),signUp)


userRouter.route("/login").post(login)  

export {userRouter }