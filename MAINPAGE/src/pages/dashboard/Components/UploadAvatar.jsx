import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { setProfile } from '@/hooks/userState'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Avatar, Button, Card, CardBody, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const UploadAvatar = () => {

    const userState = useSelector(state=>state.userState)
    const fileUpload = useRef()
    const [img,setImag] = useState(`${URLS.baseURL}/avatars?file=${userState.profile?.avatar}`)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

  return (
    <>
    <Card>
                <CardBody className='flex items-center flex-col'>
                    {
                    userState.profile.avatar != null?
                    <Avatar
                    crossorigin="anonymous"
                    alt='Avavter'
                    src={img}
                     className='w-24 h-24 border-2 border-primary m-2' />:
                     <Typography>......</Typography>
                     }
                     <input ref={fileUpload}
                     onChange={async e=>{
                        setLoading(true)
                        let file = e.target.files[0]
                        let fd = new FormData();
                        fd.append("avatar",file)

                        await axios.post(`${URLS.baseURL}/employee/profile/upload/avatar`,fd,userState.Auth)
                        .then((result) => {
                            console.log(result.data)
                            setLoading(false)
                            let fr = new FileReader()
                            fr.readAsDataURL(file)
                            fr.addEventListener('load',(result)=>{
                                setImag(result.currentTarget.result)
                                setTimeout(async ()=>{
                                await axios.get(`${URLS.baseURL}/employee/profile`,userState.Auth)
                                .then((result) => {  
                                dispatch(setProfile(result.data))
                                }).catch((err) => {
                                xhrError(err) 
                                });
                                },2000)


                            })
                        }).catch((err) => {
                            setLoading(false)
                            err.msg = "Please use the correct image file format!"
                            xhrError(err)
                        });



                     }}
                     type="file" name="" className='hidden'
                      id="" />
                    {
                       img == `${URLS.baseURL}/avatars?file=${userState.profile?.avatar}`? <Button disabled={loading} onClick={()=>fileUpload.current.click()} className='flex items-center space-x-4 bg-primary'>
                        <PhotoIcon className='h-6 text-white' />
                       <Typography className='text-white font-bold'>
                       {loading?"Loading....":"Upload Profile Photo"}
                       </Typography>
                    </Button>:<>
                    <Typography variant='h6' className='text-primary'>
                        Uploaded Successfully!
                    </Typography>
                    </>}
                   
                    {
                       img == `${URLS.baseURL}/avatars?file=${userState.profile?.avatar}`?                    <Typography className='text-primary leading-6 m-2'>
                    Including a photo in the user profile helps in visually identifying employees within the HRMS.
                     </Typography>:
                     <></>
              
              }
                </CardBody>
            </Card>
    </>
  )
}

export default UploadAvatar