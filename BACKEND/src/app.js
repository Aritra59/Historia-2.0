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
        origin:"*"
    }))


    import { userRouter } from "./routes/user.routes.js"
import { postRouter } from "./routes/post.routes.js"
import { eventsRouter } from "./routes/events.routes.js"
import { commentRouter } from "./routes/comments.routes.js"

    app.use("/users",userRouter)
    app.use("/posts",postRouter)
    app.use("/events",eventsRouter)
    app.use("/comments",commentRouter)
    export {app}
