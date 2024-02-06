import { URLS } from "@/configs/URLS";
import { clearUser, setUser } from "@/hooks/userState";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { Cube, Dots, Lines, Planets } from "react-preloaders";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export function Auth() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userValue = searchParams.get('payload');
  const from = searchParams.get('from');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    (async ()=>{
      if(userValue != null)  
      await axios.post(`${URLS.baseURL}/users/verify`,{payload:userValue})
        .then((result) => {
          dispatch(setUser({token:userValue,detail:result.data}))
          if(result?.data?.role == 0)
          navigate('/dashboard/user/type')
          else 
          alert("Define where to ga")

        }).catch((err) => {
          console.log(err)
           window.location.href = URLS.backURL
        });
      else 
      {
        let token = sessionStorage.getItem("token")
        if(token == null)
        window.location.href = URLS.backURL
        else
        await axios.post(`${URLS.baseURL}/users/verify`,{payload:token})
        .then((result) => {
          dispatch(setUser({token:token,detail:result.data}))
          if(result?.data?.role == 0)
          navigate('/dashboard/user/type')
          else 
          navigate('/dashboard')

        }).catch((err) => {
          dispatch(clearUser())
          console.log(err)
           window.location.href = URLS.backURL
        });

      }
    })()
  },[userValue])

  return (
    <div className="m-auto block py-[20%] px-[20%]">

<Card className="bg-blue-gray-50 lg:w-1/2 sm:w-full">
<CardBody>
  <Dots color={'#00b050'} customLoading={true} />
</CardBody>
</Card>

    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
