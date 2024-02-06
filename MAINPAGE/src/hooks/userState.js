import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    isLogged:false,
    token:"",
    userDetail:null,
    Auth:{}

}



const userState = createSlice({
    name:"userState",
    initialState,
    reducers:{
        setDetail:(state,action)=>{
                state.userDetail = action.payload
        },
        setUser:  (state,action)=>{
            state.token = action.payload.token 
            state.userDetail = action.payload.detail
            state.isLogged = true
             sessionStorage.setItem("token",action.payload.token)
             state.Auth = {headers:{
                Authorization:`Bearer ${action.payload.token}`
              }}
        },
        clearUser:(state)=>{
                sessionStorage.removeItem('token')
                state.isLogged = false
                state.token = ""
                state.userDetail = null
        },
        startState:  (state)=>{
                        let token = sessionStorage.getItem("token")
            if(token == null)
            state.isLogged = false
            else
            {
                state.token = token
                state.isLogged = true
                state.Auth = {headers:{
                    Authorization:`Bearer ${token}`
                  }}
            }
        }
    }
})





export const {startState,setUser,clearUser} = userState.actions
export default userState.reducer