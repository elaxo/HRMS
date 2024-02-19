import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, IconButton, Input, Radio, Textarea, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {motion} from 'framer-motion'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { URLS } from '@/configs/URLS';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { xhrError } from '@/configs/ERRORS';
import { useNavigate } from 'react-router-dom';
const CompanyReg = () => {


    const [cardNum,setCardNum] = useState(0)
    const userState = useSelector((state)=>state.userState)
    const [loading,setLoading] = useState(false)
    const [agree,setAgree] = useState(false)
    const navigate = useNavigate()
     const [companyProfile,setProfile] = useState({
        companyName: "",
        industry: "",
        businessDescription: "",
        companySize: "",
        location: "",
        isBranch:false,
        branchs: ["",""]
      });



  return (<>
    {
        
        cardNum == 0?
        <div className='p-4 lg:w-1/2 md:w-full'>
        <Card>
            <CardHeader className='bg-primary p-6'>
                <Typography variant='h4' className='text-white'>
                    Create your company Profile
                </Typography>

            </CardHeader>
            <CardBody className='p-4'>
                <div className='grid grid-cols-2 gap-3'>
                   
                <div className='space-y-4'>
                        <label className='text-primary mb-4'>Company Name</label>
                        <Input placeholder='Company Name' value={companyProfile.companyName} onChange={e=>setProfile({...companyProfile,companyName:e.target.value})} />
                    </div>
                    
                   
                    <div className='space-y-4'>
                        <label className='text-primary mb-4'>Industry</label>
                        <Input placeholder='Industry' value={companyProfile.industry} onChange={e=>setProfile({...companyProfile,industry:e.target.value})} />
                    </div>
                    
                    <div className=' col-span-2'>
                        <label className='text-primary mb-4'>Business Description</label>
                        <Textarea  className="mt-0" value={companyProfile.businessDescription} onChange={e=>setProfile({...companyProfile,businessDescription:e.target.value})}  />
                    </div>
                    <div>
                        <br />    
                    </div><div></div>
                    
                    <div className='space-y-4'>
                        <label className='text-primary mb-4'>Company Size</label>
                        <Input placeholder='Company Name' type='number' value={companyProfile.companySize} onChange={e=>setProfile({...companyProfile,companySize:e.target.value})} />
                    </div>

                    <div className='space-y-4'>
                        <label className='text-primary mb-4'>Location</label>
                        <Input placeholder='Company Name' type='text' value={companyProfile.location} onChange={e=>setProfile({...companyProfile,location:e.target.value})} />
                    </div>                    

                    
                    
                </div>
            </CardBody>
            <CardFooter>
                <Button className='bg-primary text-white' onClick={()=>{
                            if(companyProfile.businessDescription == "" || companyProfile.companyName == "" || companyProfile.companySize == "" || companyProfile.industry == "" || companyProfile.location == "")
                            toast.warning("Please enter all the required input fields")
                            else
                            setCardNum(2)
                        }}>
                    Next
                </Button>
            </CardFooter>
        </Card>
    </div>:

cardNum == 2?
(
    <motion.div key={903}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='p-4 lg:w-1/2 md:w-full'>
<Card>
    <CardHeader className='bg-primary p-6'>
        <Typography variant='h4' className='text-white'>
            Create your company Profile
        </Typography>

    </CardHeader>
    <CardBody className='p-8'>
        <div className='grid grid-cols-2 gap-3'>
           
        <div className='space-y-4 col-span-2'>
            <Typography variant='h5' className=''>
                Does your company have branches?
            </Typography>
            <Radio name='branch' onClick={e=>setProfile({...companyProfile,isBranch:true})} label="Yes" />
            <Radio name='branch' onClick={e=>setProfile({...companyProfile,isBranch:false})} label="No" defaultChecked/>
            </div>
        </div>
        <br /><br />
        <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
    </CardBody>
    <CardFooter>
        <Button
        onClick={()=>{
            if(companyProfile.isBranch)
            setCardNum(3)
            else
            setCardNum(4)
        }}
        className='bg-primary '>
            Next
        </Button>
    </CardFooter>
</Card>
</div></motion.div>)
:   cardNum == 3?
(
    <motion.div key={9093}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='p-4 lg:w-1/2 md:w-full'>
<Card>
    <CardHeader className='bg-primary p-6'>
        <Typography variant='h4' className='text-white'>
            Create your company Profile
        </Typography>

    </CardHeader>
    <CardBody className='p-8'>
        <div className='grid grid-cols-2 gap-3'>
           
        <div className='space-y-4 col-span-2'>
            <Typography variant='h5' className=''>
                Enter names of branches?
            </Typography>
            <label htmlFor="">
                if you have multiple branch press plus button to add more
            </label>
           {companyProfile.branchs.map((each,index)=> 
           <div className='px-32'>
                <div className='flex items-center space-x-2'>
                    {companyProfile.branchs.length > 1?<Typography>
                        
                    </Typography>:<></>}
                <Input label={"Branch "+ (index+1)} value={each}
                onChange={e=>{
                    let oldArray = [...companyProfile.branchs]
                    oldArray[index] = e.target.value 
                    setProfile({...companyProfile,branchs:oldArray})
                }}
                className='rounded-e-none border-primary' />
                { companyProfile.branchs.length == index+1? 
                <IconButton onClick={e=>{
                    let oldArray = [...companyProfile.branchs]
                    oldArray.push("")
                    setProfile({...companyProfile,branchs:oldArray})
                }} className='bg-primary rounded-s-none'>
                
                <PlusIcon className='h-6' />
                </IconButton>
                :
                <IconButton onClick={e=>{
                    let oldArray = [...companyProfile.branchs]
                    oldArray.splice(index,1)
                    setProfile({...companyProfile,branchs:oldArray})
                }} className='bg-orange-800 rounded-s-none'>
                <MinusIcon className='h-6' />
                </IconButton>
                }
                </div>
            </div>)}

            </div>
        </div>
        <br /><br />
        <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
    </CardBody>
    <CardFooter>
        <Button
        onClick={()=>{
            let go = true 
            companyProfile.branchs.map((each)=>{
                if(each == "")
                go = false
            }) 
            if(go)
            setCardNum(4)
            else 
            toast.warning("Empty branch name no allowed")
            
        }}
        className='bg-primary '>
            Next
        </Button>
    </CardFooter>
</Card>
</div></motion.div>)
:
cardNum == 4?
(
    <motion.div key={9093}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='p-4 lg:w-1/2 md:w-full'>
<Card>
    <CardHeader className='bg-primary p-6'>
        <Typography variant='h4' className='text-white'>
            Create your company Profile
        </Typography>

    </CardHeader>
    <CardBody className='p-8'>
    <Card>
   <CardHeader>
       <Typography variant='h5' className='p-6 text-primary'>
       Get in touch with us on telegram
               </Typography>
   </CardHeader>
   <CardBody>
<div className='p-6 flex'>
<div className="">
   <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
   <Typography className='lg:col-span-3 sm:col-span-1 text-primary font-bold'>
   Connect your profile with our telegram bot
   </Typography>
   <div className='space-y-2 '>
       <Typography>It enables you to receive notifications and simplifies getting updates and functionality on telegram</Typography>
       <Button onClick={()=>{
       window.open(`${URLS.botLink}?start=${userState.userDetail?.id}`)
       setTimeout(() => {
        setCardNum(5)
       }, 1000);
       }} className='bg-primary flex space-x-4 items-center'>
       <svg className='h-8 border-2 rounded-full mr-2' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"></circle> <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#37BBFE"></stop> <stop offset="1" stop-color="#007DBB"></stop> </linearGradient> </defs> </g></svg>
         Connect with telegram
       </Button>
   </div>
</div>
       </div>
   </CardBody>
</Card>
    </CardBody>
</Card>
</div></motion.div>)
:
cardNum == 5?
(
    <motion.div key={9093}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='p-4 lg:w-1/2 md:w-full'>
<Card>
    <CardHeader className='bg-primary p-6'>
        <Typography variant='h4' className='text-white'>
            Create your company Profile
        </Typography>

    </CardHeader>
    <CardBody className='p-8'>
    <Card>
   <CardHeader>
       <Typography variant='h5' className='p-6 text-primary'>
       We build Stronger Workplace Connections
               </Typography>
   </CardHeader>
   <CardBody>
<div className='p-6 flex'>
<div className="">
   <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
   <Typography className='lg:col-span-3 mt-4 sm:col-span-1 text-primary font-bold'>
   Terms and conditions
   </Typography>
   <div className='space-y-2 mt-4'>
       <Typography>
       Lorem ipsum dolor, sit amet consectetur adipisicing elit.
         Est voluptates quam cum. Nisi, placeat deleniti officiis blanditiis 
         libero ipsum quas repudiandae facere, iusto corporis non enim distinctio, 
         praesentium quibusdam illo?
         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
         Est voluptates quam cum. Nisi, placeat deleniti officiis blanditiis 
         libero ipsum quas repudiandae facere, iusto corporis non enim distinctio, 
         praesentium quibusdam illo?
         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
         Est voluptates quam cum. Nisi, placeat deleniti officiis blanditiis 
         libero ipsum quas repudiandae facere, iusto corporis non enim distinctio, 
         praesentium quibusdam illo?
        </Typography>
        <Checkbox onChange={e=>setAgree(e.target.checked)} label="I accept terms conditions" /><br />
        <Button onClick={async (e)=>{
            setLoading(true)
            await axios.post(`${URLS.baseURL}/company/create`,companyProfile,userState.Auth)
            .then((result) => {
                setLoading(false)
                console.log(result)
                navigate('/auth')
            }).catch((err) => {
                setLoading(false)
                xhrError(err)
            });

        }} disabled={!agree || loading} className='bg-primary'>
            Submit 
        </Button>
   </div>
</div>
       </div>
   </CardBody>
</Card>
    </CardBody>
</Card>
</div></motion.div>)
:

<>

</>
    

}
    </>)
}

export default CompanyReg


