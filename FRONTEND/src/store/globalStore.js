import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/userAuth.js"
const globalStore = configureStore({
    reducer:{
        auth:authSlice
    }
})

export default globalStore