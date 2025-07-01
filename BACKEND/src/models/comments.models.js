import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const commentsSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"post"
   },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    content:{
        type:String,
    }
},{timestamps:true})

commentsSchema.plugin(mongooseAggregatePaginate)

export const comments= mongoose.model("comments",commentsSchema)