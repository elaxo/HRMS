import { URLS } from '@/configs/URLS'
import { CheckCircleIcon, DocumentIcon, PhotoIcon, TrophyIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { Avatar, Button, Card, CardBody, CardHeader, Input, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UploadAvatar from './Components/UploadAvatar'
import UploadEducationalDoc from './Components/UploadEducationalDoc'
import axios from 'axios'
import { xhrError } from '@/configs/ERRORS'
import moment from 'moment'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar'

const EmployeeHome = () => {


    const userState = useSelector((state)=>state.userState)
    const [percent,setPercent] = useState(70)
    const [myBreak,setBreaks] = useState(null)

    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/employee/breaks/my`,userState.Auth)
            .then((result) => {
                setBreaks(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[])


    useEffect(()=>{
    
        if(userState.profile?.avatar == "default.png" && userState.profile?.educationalDocument != null)
        setPercent(percent+30)
        if(userState.profile?.avatar != "default.png")
        {
            setPercent(percent+15)
        if(userState.profile?.educationalDocument != null)
        setPercent(percent+15)
    }
    
    
    
    },[userState.profile])

  return (
<>
<div className="relative mt-8 h-24 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-primary" />
      </div>
      <Card>
        <CardHeader className='p-6'>
            <Typography variant='h6' className='text-primary'>
           {userState.profile?.name} your employee profile is now {percent}% complete.
            </Typography>
        </CardHeader>
        <CardBody className='p-4'>
{myBreak == null?        <div className='grid lg:grid-cols-3 md:grid-cols-1 pt-6 gap-3'>
        <Card>               
             <CardHeader className='p-4 bg-primary'>
                    <Typography variant='h5' className='text-white'>
                        User account
                    </Typography>
                </CardHeader>

                <CardBody>
                    <List>
                    <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                User account creation
                                </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                Email verification
                                </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                Phone verification
                                </Typography>
                        </ListItem>
                        {
                            userState.profile != null && userState.profile.avatar == "default.png"?
                            <ListItem>
                        <ListItemPrefix>
                            <XCircleIcon className='h-8 text-orange-700'/>
                        </ListItemPrefix>
                            <Typography variant='h6' className='text-orange-700'>
                            User Profile Photo
                            </Typography>
                    </ListItem>:
                            <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                User Profile Photo
                                </Typography>
                        </ListItem>
                        
                        
                        }
                        
                    </List>
                </CardBody>
            </Card>
           
           
            <Card>
                <CardHeader className='p-4 bg-primary'>
                    <Typography variant='h6' className='text-white'>
                        Telegram
                    </Typography>
                </CardHeader>
                <CardBody>
                    <List>
                        <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                Connect To Telegram
                                </Typography>
                        </ListItem>
                    </List>
                </CardBody>
            </Card>


            <Card>
                <CardHeader className='p-4 bg-primary'>
                    <Typography variant='h6' className='text-white'>
                        Employee Profile
                    </Typography>
                </CardHeader>
                <CardBody>
                    <List>
                    <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                Basic employee profile
                                </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                Emergency contact
                                </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <CheckCircleIcon className='h-8 text-primary'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-primary'>
                                Next Keen
                                </Typography>
                        </ListItem>
                        {
                            userState.profile?.educationalDocument == null?
                            <ListItem>
                            <ListItemPrefix>
                                <XCircleIcon className='h-8 text-orange-700'/>
                            </ListItemPrefix>
                                <Typography variant='h6' className='text-orange-700'>
                                Necessary Documents
                                </Typography>
                        </ListItem>
                    :    
                    <ListItem>
                    <ListItemPrefix>
                        <CheckCircleIcon className='h-8 text-primary'/>
                    </ListItemPrefix>
                        <Typography variant='h6' className='text-primary'>
                        Necessary Documents
                        </Typography>
                </ListItem>
            }
                        
                    </List>
                </CardBody>
            </Card>
        </div>:
        <Card>
            <CardBody className='p-4 flex flex-col items-center justify-center space-y-3'>
            <CircularProgressbar className='w-44 border-primary' background="#00b050" value={Math.abs(moment().diff(moment(myBreak?.endDate), 'days'))*100/Math.abs(moment(myBreak?.endDate).diff(moment(myBreak?.startDate),'days'))} text={`${-1*moment().diff(moment(myBreak?.endDate), 'days')} days`} />
                <Typography variant='h5' className='text-primary'>{userState?.profile?.name} Your break will end in {moment(myBreak?.endDate).fromNow()}</Typography>
            </CardBody>
        </Card>
}        </CardBody>
      </Card>
      <Card>
        <CardBody className='grid grid-cols-3 gap-3'>

 {userState.profile != null && userState.profile?.avatar == "default.png"?<UploadAvatar />:<></>}          
 {userState.profile != null && userState.profile?.educationalDocument == null? <UploadEducationalDoc />
 :
 <></>
 }
   </CardBody>
      </Card>

</>
    )
}

export default EmployeeHome
