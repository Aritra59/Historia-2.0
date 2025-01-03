import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse } from "../utils/apiResponse.js"
import { cloudUploader } from "../utils/cloudinary.js";
import { user } from "../models/user.models.js";
import { isValidObjectId } from "mongoose";

const signUp= asyncHandler(async(req,res)=>{
    const {username,password,email,userLocation}= req.body
    
    if([username, password, email].some((data)=> data.trim==="")){
        throw new apiError(400,"creds not collected properly on signup")
    }
    if(!email.includes("@")){
        throw new apiError(400,"email invalid")
    }

    const exists= await user.findOne({
        $or:[{username},{email}]
    })

    if(exists){
        throw new apiError(400,"user already exists")
    }
    const avatarImage = req.files?.avatar[0]?.path
    if(!avatarImage){
        throw new apiError(400,"failed to upload avatar images")
    }
    console.log(avatarImage)
     const avatarURL = await cloudUploader(avatarImage)

     if(!avatarURL){
        throw new apiError(400,"avatar image not uploaded")
     }

    const userEntry = await user.create({
        username,
        password,
        email,
        avatar:avatarURL?.url || "noImg",
        userLocation
    })
    if(!userEntry){
        throw new apiError(400,"user entry failed")
    }
    return res.status(200).json(new apiResponse(200,userEntry,"signUP working"))
})

async function generateAccessAndRefreshToken(userId){
    if(!isValidObjectId(userId)) throw new apiError(400, "invalid objectid for the user to generate the JWTs")
    const currentUser =await user.findById(userId)

    const accessToken= await currentUser.generateAccessToken()
    const refreshToken = await currentUser.generateRefreshToken()

    if(!accessToken && !refreshToken){
        throw new apiError(400,"access or refreshToken failure ")
    }

    currentUser.refreshToken= refreshToken
    currentUser.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
}

const login= asyncHandler(async(req,res)=>{
    const{email,password}= req.body
    console.log(email,password)

    if(!(email && password)){
        throw new apiError(400,"email or password not entered properly")
    }
    const exists= await user.findOne(
            {email}
    )
    if(!exists){
        throw new apiError(400,"user not exists.Please sign Up!")
    }

    const isPassword= exists.comparePassword(password)
    if(isPassword ==false) throw new apiError(400, "password not correct!")

    const currentUserData = await user.findById(exists._id).select("-password ")
    if(!currentUserData){
        throw new apiError(400, "cannot find current user .Failed to login")
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(currentUserData._id)

    const Options = {
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .cookie("accessToken",accessToken,Options)
    .cookie("refreshToken",refreshToken,Options)
    .json(new apiResponse(200,currentUserData,"login success!!"))
    
})

const logout = asyncHandler(async(req,res)=>{
    const currentUser = req.User
    console.log(currentUser)
    if(!currentUser && !isValidObjectId(currentUser)){
        throw new apiError("you are not logged in anymore or invalid")
    }
    const isUserValid = await user.findById(currentUser)
    if(!isUserValid) throw new apiError(400,"user not found ")
        
        isUserValid.refreshToken= null
        await isUserValid.save({validateBeforeSave:false})
        
        const Options = {
            httpOnly:true,
            secure:true
        }
    return res.clearCookie("accessToken",Options)
              .clearCookie("refreshToken",Options).json(
                  
                  new apiResponse(200,`logout Successful for ${isUserValid.username}`)
            )

})

const getUserProfileData= asyncHandler(async(req,res)=>{
    const currentUser= req.User

    if(!currentUser && !isValidObjectId(currentUser)) {
        throw new apiError(400,"user Invalid or not logged In")
    }

        const userData = await user.findById(currentUser).select("-password")

    if(!currentUser ) {
        throw new apiError(400,"user does not exist or invalid user")
    }
    return res.status(200).json(new apiResponse(200,userData,"user found successfully"))

})


export {signUp
    ,login,
    logout,
    getUserProfileData
}

