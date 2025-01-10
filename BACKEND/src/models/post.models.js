import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const postSchema  = new mongoose.Schema({
    title:{
        type:String ,
        required:true,
        lowercase :true,
    },
    content:{
        type:String,
        default:"this is just the example post.Please type something here"
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    postImg:{
        type:[String],
        default:"https://cdn1.iconfinder.com/data/icons/ui-icon-part-3/128/image-512.png"
    },
    likes:{
        type:Number,
        default:0
    },
    postLocation:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        
    },
    howToReachContent:{
        type:String,
        default:"you can try to fin this on G-MAPS "
    },
    
},{timestamps:true})

postSchema.plugin(mongooseAggregatePaginate)

export const post= mongoose.model("post",postSchema)