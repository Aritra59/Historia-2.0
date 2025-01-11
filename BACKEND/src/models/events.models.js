import mongoose from "mongoose"

const eventsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:"fascinating show"
    },
    membership:{
        type:Boolean,
        default:false
    },
    eventLocation:{
        type:String,
        default:"Kolkata"
    },
    timing:{
        type:String,
        default:"5:00-8:00"
    },
    dateOfEvent:{
        type:String,
        default:"23-Sept-2025"
    },
    eventImage:{
        type:String
    },
    eventDetails:{
        type:String,
        default:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
},{timestamps:true})


export const event = mongoose.model("event",eventsSchema)