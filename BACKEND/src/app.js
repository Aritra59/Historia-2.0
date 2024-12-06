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

    app.use("/users",userRouter)
    export {app}
