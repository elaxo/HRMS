import { toast } from "react-toastify"



export const xhrError = (err)=>{

    console.log(err)
    if(err.response?.data?.msg)
    toast.error(err.response?.data?.msg)
    else
    toast.error("Uncaught error")
    

}