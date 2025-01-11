import Router from "express"
import {createEvent } from "../controllers/events.controller.js"
import { upload } from "../middlewares/multer.js"
import { verifyJWT} from "../middlewares/auth.middleware.js"



const eventsRouter= Router()

eventsRouter.route("/createEvent").post(verifyJWT,upload.single("eventImage"),createEvent)


export {eventsRouter }