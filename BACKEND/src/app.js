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
        origin:["https://teamhistoria.netlify.app"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE',"PATCH"],
        credentials:true
    }))


    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://teamhistoria.netlify.app');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    import { userRouter } from "./routes/user.routes.js"
import { postRouter } from "./routes/post.routes.js"
import { eventsRouter } from "./routes/events.routes.js"
import { commentRouter } from "./routes/comments.routes.js"

    app.use("/users",userRouter)
    app.use("/posts",postRouter)
    app.use("/events",eventsRouter)
    app.use("/comments",commentRouter)
    export {app}
