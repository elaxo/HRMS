import { configureStore } from "@reduxjs/toolkit";
import userState from "./userState";


export const store = configureStore({
    reducer:{
        userState:userState
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})
