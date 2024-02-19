import { toast } from "react-toastify"



export const xhrError = (err)=>{

    console.log(err)
    if(err?.response?.status == 403)
        if(confirm("Session expired you must re-login to the system?"))
            window.location.reload()
    if(Boolean(err.response?.data?.msg))
    toast.error(err.response?.data?.msg)
    else if(err?.msg != "" || err?.msg != null)
    toast.error(err.msg)
    else
    toast.error("Uncaught error")

}