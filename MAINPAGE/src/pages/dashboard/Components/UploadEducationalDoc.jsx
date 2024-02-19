import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { setProfile } from '@/hooks/userState'
import { DocumentIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UploadEducationalDoc = () => {

    const fileUpload = useRef()
    const userState = useSelector((state)=>state.userState)
    const [loading,setLoading] = useState(false)
    const [uploaded,setUploaded] = useState(false)
    const dispatch = useDispatch()
    
  return (
        <>
          <Card>
                {uploaded?<>
                <Typography className='text-primary p-4'>
                    Document uploaded successfully
                </Typography>
                </>:<CardBody className='flex items-center flex-col'>
                        <DocumentIcon className='h-24 m-2 shadow-lg border-primary rounded-md text-primary' />
                        <input
                        type='file'
                        ref={fileUpload}
                        onChange={async e=>{
                            let file = e.target.files[0]
                            let fd = new FormData()
                            fd.append("document",file)
                            setLoading(true)
                            await axios.post(`${URLS.baseURL}/employee/profile/upload/document`,fd,userState.Auth)
                            .then((result) => {
                               setLoading(false) 
                                console.log(result.data)
                                setUploaded(true)
                                setTimeout(async ()=>{
                                    await axios.get(`${URLS.baseURL}/employee/profile`,userState.Auth)
                                    .then((result) => {  
                                    dispatch(setProfile(result.data))
                                
                                    }).catch((err) => {
                                    xhrError(err) 
                                    });
                                    },2000)    
                            }).catch((err) => {
                                setLoading(false) 
                                err.msg = "Please use the correct file format type"
                                xhrError(err)
                            });
                        }}
                        className='hidden'
                        />
                    <Button disabled={loading} onClick={e=>{
                        fileUpload.current.click()
                    }} className='flex items-center space-x-4 bg-primary'>
                        <PhotoIcon className='h-6 text-white' />
                       <Typography className='text-white font-bold'>
                       { loading?"Loading....":"Upload Educational Documents"}
                       </Typography>
                    </Button>
                    <Typography className='text-primary leading-6 text-center m-2'>
                    Educational documents, such as degree certificates, transcripts, or training certifications,
                     are necessary for compliance with legal and regulatory requirements
                     </Typography>
                </CardBody>}
            </Card>
        </>
    )
}

export default UploadEducationalDoc