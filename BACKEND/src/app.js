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

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://glowing-scone-2f6a61.netlify.app/');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
      });
      
    app.use(cors({
        origin:"https://glowing-scone-2f6a61.netlify.app",
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials:true
    }))


    import { userRouter } from "./routes/user.routes.js"
import { postRouter } from "./routes/post.routes.js"
import { eventsRouter } from "./routes/events.routes.js"

    app.use("/users",userRouter)
    app.use("/posts",postRouter)
    app.use("/events",eventsRouter)
    export {app}
