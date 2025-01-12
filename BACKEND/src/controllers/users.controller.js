import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { cloudUploader } from "../utils/cloudinary.js";
import { user } from "../models/user.models.js";
import { isValidObjectId } from "mongoose";

const signUp = asyncHandler(async (req, res) => {
    const { username, password, email, userLocation } = req.body

    if ([username, password, email].some((data) => data.trim === "")) {
        throw new apiError(400, "creds not collected properly on signup")
    }
    if (!email.includes("@")) {
        throw new apiError(400, "email invalid")
    }

    const exists = await user.findOne({
        $or: [{ username }, { email }]
    })

    if (exists) {
        throw new apiError(400, "user already exists")
    }
    const avatarImage = req.files?.avatar[0]?.path
    if (!avatarImage) {
        throw new apiError(400, "failed to upload avatar images")
    }
    console.log(avatarImage)
    const avatarURL = await cloudUploader(avatarImage)

    if (!avatarURL) {
        throw new apiError(400, "avatar image not uploaded")
    }

    const userEntry = await user.create({
        username,
        password,
        email,
        avatar: avatarURL?.url || "noImg",
        userLocation
    })
    if (!userEntry) {
        throw new apiError(400, "user entry failed")
    }
    const isUserSignedUp = await user.findById(userEntry._id)
    if (!isUserSignedUp) throw new apiError(400, "sign up failed")
    return res.status(200).json(new apiResponse(200, isUserSignedUp, "signUP working"))
})

async function generateAccessAndRefreshToken(userId) {
    if (!isValidObjectId(userId)) throw new apiError(400, "invalid objectid for the user to generate the JWTs")
    const currentUser = await user.findById(userId)

    const accessToken = await currentUser.generateAccessToken()
    const refreshToken = await currentUser.generateRefreshToken()

    if (!accessToken && !refreshToken) {
        throw new apiError(400, "access or refreshToken failure ")
    }

    currentUser.refreshToken = refreshToken
    currentUser.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
}

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    if (!(email && password)) {
        throw new apiError(400, "email or password not entered properly")
    }
    const exists = await user.findOne(
        { email }
    )
    if (!exists) {
        throw new apiError(400, "user not exists.Please sign Up!")
    }

    const isPassword = await exists.comparePassword(password)
    console.log(isPassword)
    if (isPassword == false) throw new apiError(400, "password not correct!")

    const currentUserData = await user.findById(exists._id).select("-password ")
    if (!currentUserData) {
        throw new apiError(400, "cannot find current user .Failed to login")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(currentUserData._id)

    const Options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, { ...Options, maxAge: process.env.ACCESS_TOKEN_EXPIRY_S })
        .cookie("refreshToken", refreshToken, { ...Options, maxAge: process.env.REFRESH_TOKEN_EXPIRY_S })
        .json(new apiResponse(200, currentUserData, "login success!!"))

})

const logout = asyncHandler(async (req, res) => {
    const currentUser = req.User
    console.log(currentUser)
    if (!currentUser && !isValidObjectId(currentUser)) {
        throw new apiError("you are not logged in anymore or invalid")
    }
    const isUserValid = await user.findById(currentUser)
    if (!isUserValid) throw new apiError(400, "user not found ")

    isUserValid.refreshToken = null
    await isUserValid.save({ validateBeforeSave: false })

    const Options = {
        httpOnly: true,
        secure: true
    }
    return res.clearCookie("accessToken", Options)
        .clearCookie("refreshToken", Options).json(

            new apiResponse(200, {}, `logout Successful for ${isUserValid.username}`)
        )

})

const getUserProfileData = asyncHandler(async (req, res) => {
    const currentUser = req.User

    if (!currentUser && !isValidObjectId(currentUser)) {
        throw new apiError(400, "user Invalid or not logged In")
    }

    const userData = await user.findById(currentUser).select("-password")

    if (!currentUser) {
        throw new apiError(400, "user does not exist or invalid user")
    }
    return res.status(200).json(new apiResponse(200, userData, "user found successfully"))

})

const isUserLoggedIn = asyncHandler(async (req, res) => {
    const currentUser = req.User
    if (!currentUser) {
        return res.status(200).json(new apiResponse(200, { userAuthorized: false }, "user logged in"))
    }
    return res.status(200).json(new apiResponse(200, { userAuthorized: true }, "user logged in"))
})

const sendCookies = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id) && !id) throw new apiError(400, "bad id to throw cookies to")

    const validity = await user.findById(id)
    if (!validity) throw new apiError(400, "invalid id to fetch data from and send cookies")

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(validity._id)
    const Options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, { ...Options, maxAge: process.env.ACCESS_TOKEN_EXPIRY_S })
        .cookie("refreshToken", refreshToken, { ...Options, maxAge: process.env.REFRESH_TOKEN_EXPIRY_S }).json(new apiResponse(200, "cookies fetched successfully"))
})

const clearCookies = asyncHandler(async (req, res) => {
    const Options = {
        httpOnly: true,
        secure: true,

    }
    return res.status(200).clearCookie("accessToken", Options).clearCookie("refreshToken", Options).json(new apiResponse(200, "cookies removed successfully"))
})



const editUser = asyncHandler(async (req, res) => {

    const { username,fullname,email,userLocation } = req.body

    if (!req.User && !isValidObjectId(req.User)) throw new apiError(400, "please login first ")

    if ([username,fullname,email,userLocation ].some((data)=>data?.trim()=="")) {
        throw new apiError(400, "username,fullName,Email,Location are needed atleast")
    }

    const updatedImg =  req.file
    console.log(updatedImg)
    if (!updatedImg) throw new apiError(400, "uploading failed during post editing")

const uploaderStatus = await cloudUploader(updatedImg.path)
    console.log(uploaderStatus.url)
    if (!uploaderStatus) throw new apiError(400, "image not uploaded while updating")

    const updatedState = await user.findByIdAndUpdate(req.User, {
        $set: {
            username,fullname,email,userLocation,avatar:uploaderStatus?.url ||"https://pixabay.com/vectors/user-avatar-user-icon-account-icon-6380868/"
        }
    }).select("-password")

    if(!updatedState) throw new apiError(400,"updating failure!")
    
    
    return res.status(200).json(new apiResponse(200, updatedState, "user update success"))

})

const toggleUserAuthorization = asyncHandler(async(req,res)=>{
    const {userId} = req.params
    if(!isValidObjectId(userId)) throw new apiError(400,"invalid userid to authorize")
    
    const userData = await user.findById(userId)
    if(!userData) throw new apiError(400,"user does not exist to authorize")
        
        if(userData.admin!==true)
            userData.admin=true
        else{
            userData.admin=false
        }
        await userData.save({validateBeforeSave:false})
        
        const updatedSettings=await user.findById(userData._id).select("-password -accessToken -refreshToken -likes")
        if(!updatedSettings) throw new apiError(400,"didnt find user after authorization")

        
return res.status(200).json(new apiResponse(200,updatedSettings,"admin permission toggled"))
})

export {
    signUp
    , login,
    logout,
    getUserProfileData,
    isUserLoggedIn,
    sendCookies,
    clearCookies,editUser,toggleUserAuthorization
}

