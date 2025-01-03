import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    authState:{
        isUserLoggedIn:false,
        userData:null,
        userStatus:null,
    
    }
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
           state.authState.isUserLoggedIn=true,
           state.authState.userData=action.payload
           state.authState.userStatus="logged In"
        },
        
        logout:(state)=>{
            state.authState.isUserLoggedIn=false,
            state.authState.userData=null
            state.authState.userStatus="logged Out"
        },

        signUp:(state,action)=>{
        state.authState.isUserLoggedIn=true,
           state.authState.userData=action.payload
           state.authState.userStatus="logged In"
        }
    }
})

export default authSlice.reducer

export const {login,logout}= authSlice.actions