import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { cloudUploader, cloudDataDeleter } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";
import { user } from "../models/user.models.js";
import { event } from "../models/events.models.js";
import { post } from "../models/post.models.js";


const createEvent= asyncHandler(async(req,res)=>{
    const {title,eventLocation,timing,dateOfEvent,eventDetails}= req.body
    if([title,eventLocation,timing,dateOfEvent,eventDetails].some((data)=>data?.trim=="")) throw new apiError(400,"something is missing in posts")
    
    const eventImage = req.file
    console.log(eventImage)
    if(!eventImage) throw new apiError(400,"eventImage not found in events")

    const cloudUploadUrl = await cloudUploader(eventImage.path)
    if(!cloudUploader) throw new apiError(400,"cloud uploading failure in addEvents")
    
    const eventsModel = await event.create({
        title,
        eventLocation,
        timing,
        dateOfEvent,
        eventImage:cloudUploadUrl?.url,
        eventDetails
    })
    if(!eventsModel) throw new apiError(400,"event model not created!")
    
        return res.status(200).json(new apiResponse(200,eventsModel,"events created successfully!"))
})

const fetchEventWithId = asyncHandler(async(req,res)=>{
    const {eventId} = req.params

    if(!eventId) throw new apiError(400,"event id not provided")
    if(!isValidObjectId(eventId)) throw new apiError(400,"event id not valid")
        
        const eventData =await event.findById(eventId)

    if(!eventData) throw new apiError(400,"event id not valid")
    
        return res.status(200).json(new apiResponse(200,eventData,"event fetched successfully!"))

})

const fetchAllEvents= asyncHandler(async (req,res)=>{
    const allData = await event.find({})
    if(!allData) throw new apiError(400,"no data or events available")
        return res.status(200).json(new apiResponse(200,allData,"all data fetched!"))
})

const deleteEventWithId= asyncHandler(async(req,res)=>{
    const {eventId} = req.params

    if(!eventId) throw new apiError(400,"event id not provided to delete")
    if(!isValidObjectId(eventId)) throw new apiError(400,"event id not valid")
        
        const eventData =await event.findByIdAndDelete(eventId)

    if(!eventData) throw new apiError(400,"event id not deleted")
    
        return res.status(200).json(new apiResponse(200,eventData,"event deleted successfully!"))

   
})

export {
    createEvent,
    // editEvent,
    deleteEventWithId,
    fetchEventWithId,
    fetchAllEvents,
    
}