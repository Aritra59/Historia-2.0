import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/userAuth.js"
import storage from "redux-persist/lib/storage"
import {persistStore,persistReducer} from "redux-persist"

const persistConfig= {
    key:"root",
    storage
}
const persistedReducer = persistReducer(persistConfig,authSlice)
const globalStore = configureStore({
    reducer:{
        auth:persistedReducer
    }
})
export const persistor = persistStore(globalStore)
export default globalStore