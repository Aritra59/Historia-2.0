import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        uppercase:true,
        default:"JohnDoe"
    },
    email:{
        type:String
    },
    refreshToken:{
        type:String
    },
    userLocation:{
        type:String
    },
    avatar:{
        type:String,
        required:true,
        default:"https://pixabay.com/vectors/user-avatar-user-icon-account-icon-6380868/"
    },
    likes:{
        type:[mongoose.Types.ObjectId],
        ref:"post"
    },
    admin:{
        type:Boolean,
        default:false
    }
})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       return  next()
    }
    else{
        this.password= await bcrypt.hash(this.password,8)
        next()
    }
})

userSchema.methods.checkPassword= async function(pass){
if(!pass){
    console.error("no password password")
}
try {
    const passData = await bcrypt.compare(pass,this.password)
    return passData
    
} catch (error) {
    console.log(error)
}
}

userSchema.methods.generateAccessToken =  function (){
     return jwt.sign({
        _id:this._id,
        username:this.username,
        password:this.password
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)}


userSchema.methods.generateRefreshToken =  function (){
     return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)}


userSchema.methods.comparePassword = async function(password){
    if(!password){
        throw new Error("no password recieved")
    }
    const isPasswordCorrect= await bcrypt.compare(password,this.password)
    return isPasswordCorrect
}
export const user= mongoose.model("user",userSchema)