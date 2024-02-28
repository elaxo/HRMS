import { xhrError } from "@/configs/ERRORS";
import { URLS } from "@/configs/URLS";
import userState, { clearUser, setCompany, setProfile, setUser } from "@/hooks/userState";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { Cube, Dots, Lines, Planets } from "react-preloaders";
import { useDispatch, useSelector } from "react-redux";
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

      if(userValue != null && from != "email")  
      await axios.post(`${URLS.baseURL}/users/verify`,{payload:userValue})
        .then(async (result) => {
          dispatch(setUser({token:userValue,detail:result.data}))
          console.log(result?.data?.role)
          if(result?.data?.role == 0)
          navigate('/dashboard/user/type',{state:{card:2}})
          else if(result?.data?.role == 2)
          {
              (async ()=>{
                await axios.get(`${URLS.baseURL}/employee/profile`,
                {headers:{
                  Authorization:`Bearer ${userValue}`
                }}
                )
                .then((result) => {                  
                  dispatch(setProfile(result.data))
                }).catch((err) => {
                   xhrError(err) 
                });
              })()          
            navigate('/dashboard/emp/home')
          }  
          else if(result?.data?.role == 111)
          {
           await axios.get(`${URLS.baseURL}/company/user`,{headers:{
            Authorization:`Bearer ${userValue}`
          }})
            .then((result) => {
              dispatch(setCompany(result.data))
              navigate('/dashboard/empr/home')
            }).catch((err) => {
              xhrError(err)
            });          
          }        
        }).catch((err) => {
          console.log(err)
         window.location.href = URLS.backURL
        });
      
        else if(userValue != null && from == "email")
        {
          await axios.post(`${URLS.baseURL}/users/verify/email`,{payload:userValue})
          .then((result) => {
            let token = result.data.token
            sessionStorage.setItem("token",token)
            const newURL = window.location.origin + window.location.pathname
            window.location.href = newURL  
          }).catch((err) => {
          console.log(err)
          //  window.location.href = URLS.backURL
          });

        }
        else 
      {
        let token = sessionStorage.getItem("token")
        if(token == null)
        window.location.href = URLS.backURL
        else
        await axios.post(`${URLS.baseURL}/users/verify`,{payload:token})
        .then(async (result) => {
          dispatch(setUser({token:token,detail:result.data}))
          console.log(result.data)
          if(result?.data?.role == 0)
          navigate('/dashboard/user/type',{state:{card:2}})
          else if(result?.data?.role == 1)
          navigate('/dashboard/user/type',{state:{card:1}})
          else if(result?.data?.role == 2)
          {
              (async ()=>{
                await axios.get(`${URLS.baseURL}/employee/profile`,
                {headers:{
                  Authorization:`Bearer ${token}`
                }})
                .then((result) => {
                  dispatch(setProfile(result.data))
                }).catch((err) => {
                   xhrError(err) 
                });
              })()          
            navigate('/dashboard/emp/home')
          }
          else if(result?.data?.role == 111)
          {
            await axios.get(`${URLS.baseURL}/company/user`,{headers:{
              Authorization:`Bearer ${token}`
            }})
            .then((result) => {
              console.log(result)
              dispatch(setCompany(result.data))
              navigate('/dashboard/empr/home')
            }).catch((err) => {
              xhrError(err)
            });          

          
          }          

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
