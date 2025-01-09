import mongoose from "mongoose"
import {aggregatePaginate}  from "mongoose-aggregate-paginate-v2"

const likeSchema = new mongoose.Schema({
    likedTo:{
        type:mongoose.Types.ObjectId,
        ref:"post"
    },
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    impliedFor:{
        type:mongoose.Types.ObjectId,
        ref:"post"
    }
})
likeSchema.plugin(aggregatePaginate)

export const likes= mongoose.model("like",likeSchema)