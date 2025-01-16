import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

    const app = express()

    app.use(express.json({
        limit:"16kb",

    }))
    app.use(express.urlencoded({
        extended:true,
        limit:"16kb"
    }))
    app.use(cookieParser())
    app.use(cors({
        origin:"https://musical-fox-86f743.netlify.app",
        credentials:true
    }))


    import { userRouter } from "./routes/user.routes.js"
import { postRouter } from "./routes/post.routes.js"
import { eventsRouter } from "./routes/events.routes.js"

    app.use("/users",userRouter)
    app.use("/posts",postRouter)
    app.use("/events",eventsRouter)
    export {app}
