import Router from "express"
import { signUp,login, logout,getUserProfileData,isUserLoggedIn, 
    sendCookies,clearCookies,editUser,
    toggleUserAuthorization,findAllUsers,findAdmins,deleteUser } from "../controllers/users.controller.js"
import { upload } from "../middlewares/multer.js"
import { verifyJWT} from "../middlewares/auth.middleware.js"
import { rolesHandler } from "../middlewares/roles.middleware.js"



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
userRouter.route("/editUser/").patch(verifyJWT, upload.single("avatar"),editUser)
userRouter.route("/toggleAdmin/:userId").get(toggleUserAuthorization)

// Admin Previleges
userRouter.route("/getAllUsers/").get(verifyJWT,rolesHandler,findAllUsers)
userRouter.route("/getAllAdmins/").get(verifyJWT,rolesHandler,findAdmins)
userRouter.route("/deleteUser/:userId").delete(verifyJWT,rolesHandler,deleteUser)



export {userRouter }