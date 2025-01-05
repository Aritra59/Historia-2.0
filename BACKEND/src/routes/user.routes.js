import Router from "express"
import { signUp,login, logout,getUserProfileData,isUserLoggedIn, sendCookies,clearCookies } from "../controllers/users.controller.js"
import { upload } from "../middlewares/multer.js"
import { verifyJWT} from "../middlewares/auth.middleware.js"



const userRouter= Router()

userRouter.route("/signUp").post(upload.fields([
    {name:"avatar",maxCount:1}
]),signUp)


userRouter.route("/signUp").post(signUp)  
userRouter.route("/login").post(login)  
userRouter.route("/logout").get(verifyJWT,logout)  
userRouter.route("/getUserProfile").get(verifyJWT,getUserProfileData)
userRouter.route("/isUserLoggedIn").get(verifyJWT,isUserLoggedIn)
userRouter.route("/sendCookies/:id").get(sendCookies)
userRouter.route("/clearCookies").get(clearCookies)


export {userRouter }