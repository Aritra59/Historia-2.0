import mongoose from "mongoose"
import dotenv from "dotenv"
import {DB_NAME} from "../constants.js"

dotenv.config({
    path:"./.env"
})

async function DB_CONNECT(){
    const connection= await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
    if(!connection){
        throw new Error("problem connecting to mongo DB")
    }
    console.log("connection established successfully with mongo at ",connection.connection.host)
    
}

export {DB_CONNECT}