import Router from "express"
import {createEvent ,fetchEventWithId,fetchAllEvents} from "../controllers/events.controller.js"
import { upload } from "../middlewares/multer.js"
import { verifyJWT} from "../middlewares/auth.middleware.js"



const eventsRouter= Router()

eventsRouter.route("/createEvent").post(verifyJWT,upload.single("eventImage"),createEvent)
eventsRouter.route("/fetchEvent/:eventId").get(fetchEventWithId)
eventsRouter.route("/fetchAllEvent/").get(fetchAllEvents)
eventsRouter.route("/deleteEventWithId/").delete(fetchAllEvents)


export {eventsRouter }