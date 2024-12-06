import {DB_CONNECT} from "./db/index.js"
import { app } from "./app.js"


DB_CONNECT().then(()=>{
    app.listen(process.env.PORT,()=>{
        app.on("error",(err)=>{
            throw new Error("some error occured while connecting with express",err)
        })
        console.log("connected with express at port:",process.env.PORT)
    })
})

