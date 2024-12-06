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
        required:true
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
return await bcrypt.compare(pass,this.password)

}

userSchema.methods.generateAccessToken =  function (){
     return jwt.sign({
        id:this._id,
        username:this.username,
        password:this.password
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)}


userSchema.methods.generateRefreshToken =  function (){
     return jwt.sign({
        id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)}


userSchema.methods.comparePassword = async function(password){
    if(!password)throw new Error(400,"password not found")
        
        const isTrue =  await bcrypt.compare(password,this.password)
        if(!isTrue) throw new Error(400,"password comparison failure")
        
            return isTrue
}
export const user= mongoose.model("user",userSchema)