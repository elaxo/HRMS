import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, IconButton, Input, Option, Radio, Select, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { toast } from 'react-toastify'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import { URLS } from '@/configs/URLS'
import axios from 'axios'
import { xhrError } from '@/configs/ERRORS'
import { useNavigate } from 'react-router-dom'
const ChoseUserType = () => {

    const [cardNum,setCardNum] = useState(0)
    const [userType,setUserType] = useState(0)
    const userState = useSelector(state=>state.userState)
    const [agree,setAgree] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [employee,setEmployee]= useState({
        dateOfBirth:"",
        address:"",
        nationality:"",
        idNumber:"",
        tinNumber:"",
        secondaryPhoneNumber:"",
        BankAccount:{
            BankName:"",
            BankAccountName:"",
            AccountNumber:""
        },
        martialStatus:{
            status:"",
            fullName:""
        },
        children: false,
        emergencyContact:{
            name:"",
            phoneNumber:"",
            secondaryPhoneNumber:"",
            email:"",
            association: ""
        },
        nextOfKeen:{
            name:"",
            phoneNumber:"",
            secondPhoneNumber:"",
            email:"",
            association:""
        },
        workExperience: [{
            employment:"",
            sector:"",
            location:"",
            title:"",
            yourRole:"",
            from:"",
            to:""
        }]
    })


const SUBMIT = async ()=>{

setLoading(true)
await axios.post(`${URLS.baseURL}/employees/create`,employee,userState.Auth)
.then((result) => {
    setLoading(false)
    navigate('/auth')
}).catch((err) => {
    setLoading(false)
    xhrError(err)
});

}

  return (<div className='h-full'>
  {
cardNum == 0?  

(
    <motion.div key={3}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        >
      <div className='pt-32 sm:w-full lg:w-1/2'>
        <Card>
            <CardHeader>
                <Typography variant='h4' className='p-6 text-primary'>
                What are you looking for in this System?
                </Typography>
            </CardHeader>
            <CardBody>
                <div className='p-6 flex'>
     <div className="flex gap-10">
       <Radio name="type" onClick={e=>setUserType(1)} label="I work as an employee" className='text-primary' />
       <Radio name="type" onClick={e=>setUserType(2)} label="I am here to develop the company's HRMS" className='text-primary'   />
     </div>
                </div>
            </CardBody>
        <CardFooter className='border-primary border-t-2 mt-6'>
            <Button onClick={e=>{if(userType == 1)setCardNum(1); else if(userType == 2)setCardNum(2)}} className='px-6 bg-primary'>Next</Button>
        </CardFooter>
        </Card>
    </div>
    </motion.div>
    )
:
cardNum == 1?
(
    <motion.div key={903}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
    <CardHeader>
        <Typography variant='h5' className='p-6 text-primary'>
        Please provide relevant information to complete the employee registration process.
                </Typography>
    </CardHeader>
    <CardBody>
        <div className='p-6 flex'>
<div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-10">
<div className='space-y-2'>
        <Typography>Date of Birth</Typography>
        <div className='flex'>
        <Input value={employee.dateOfBirth} onChange={e=>{
            setEmployee({...employee,dateOfBirth:e.target.value})
        }} type='date' crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>
        </div>
    </div>
    <div className='space-y-2'>
        <Typography>Address</Typography>
        <div className='flex'>
        <Input type='text' value={employee.address} onChange={e=>{
            setEmployee({...employee,address:e.target.value})
        }} crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>
        </div>

    </div>
    <div className='space-y-2'>
        <Typography>Nationality</Typography>
        <div className='flex'>
        <Input value={employee.nationality} onChange={e=>{
            setEmployee({...employee,nationality:e.target.value})
        }} type='text' crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>            
        </div>

    </div>
    <div className='space-y-2'>
        <Typography>TIN Number</Typography>
        <Input type='text' value={employee.tinNumber} onChange={e=>{
            setEmployee({...employee,tinNumber:e.target.value})
        }} crossOrigin="*"/>
    </div>
    <div className='space-y-2'>
        <Typography>ID Number</Typography>
        <div className='flex'>
        <Input type='text'  value={employee.idNumber} onChange={e=>{
            setEmployee({...employee,idNumber:e.target.value})
        }} crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>            
        </div>

    </div>
</div>
        </div>
    </CardBody>
<CardFooter className='border-primary border-t-2 mt-6'>
    <Button className='px-6 bg-primary' 
    onClick={e=>{
        if(employee.dateOfBirth == "" || employee.address == "" 
        || employee.nationality == "" || employee.idNumber == "")
        toast.warning("Please enter the required inputs!",{position:"top-left"})
        else 
        setCardNum(1.1)
    }}
    >Next</Button>
</CardFooter>
</Card>
</div>
</motion.div>
)
:
cardNum == 1.1 ?
(
    <motion.div key={903}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
    <CardHeader>
        <Typography variant='h5' className='p-6 text-primary'>
        Please provide relevant information to complete the employee registration process.
                </Typography>
    </CardHeader>
    <CardBody>
        <div className='p-6 flex'>
<div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-10">
<div className='space-y-2'>
        <Typography>Secondary Phone number</Typography>
        <div className='flex'>
        <Input value={employee.secondaryPhoneNumber} onChange={e=>{
            setEmployee({...employee,secondaryPhoneNumber:e.target.value})
        }} type='text' crossOrigin="*"/>
        </div>
    </div>
    <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
    <Typography className='lg:col-span-3 sm:col-span-1 text-primary font-bold'>
        Bank account
    </Typography>
    <div className='space-y-2'>
        <Typography>Bank name</Typography>
        <div className='flex'>
        <Input type='text' value={employee.BankAccount.BankName} onChange={e=>{
            setEmployee({...employee,BankAccount:{...employee.BankAccount,BankName:e.target.value}})
        }} crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>
        </div>

    </div>
    <div className='space-y-2'>
        <Typography>Bank account name</Typography>
        <div className='flex'>
        <Input value={employee.BankAccount.BankAccountName} onChange={e=>{
            setEmployee({...employee,BankAccount:{...employee.BankAccount,BankAccountName:e.target.value}})
        }} type='text' crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>            
        </div>

    </div>
    <div className='space-y-2'>
        <Typography>Bank account number</Typography>
        <div className='flex'>
        <Input type='number' value={employee.BankAccount.AccountNumber} onChange={e=>{
            setEmployee({...employee,BankAccount:{...employee.BankAccount,AccountNumber:e.target.value}})
        }} crossOrigin="*"/>
                <span className='m-2 text-red-400'>*</span>            
            </div>
    </div>
</div>
        </div>
    </CardBody>
<CardFooter className='border-primary border-t-2 mt-6'>
    <Button className='px-6 bg-primary' 
    onClick={e=>{
        if(employee.BankAccount.BankName == "" || employee.BankAccount.BankAccountName == "" 
        || employee.BankAccount.AccountNumber == "")
        toast.warning("Please enter the required inputs!",{position:"top-left"})
        else 
        setCardNum(1.2)
    }}
    >Next</Button>
</CardFooter>
</Card>
</div>
</motion.div>):

cardNum == 1.2 ?
(
    <motion.div key={904}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
    <CardHeader>
        <Typography variant='h5' className='p-6 text-primary'>
        Please provide relevant information to complete the employee registration process.
                </Typography>
    </CardHeader>
    <CardBody>
        <div className='p-6 flex'>
<div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-10">
<div className='space-y-2'>
        <Typography>Martial Status</Typography>
        <div className='flex sm:col-span-1 lg:col-span-3'>
           <div className='flex'>
            <Select value={employee.martialStatus.status} onChange={e=>{
                setEmployee({...employee,martialStatus:{...employee.martialStatus,status:e}})
            }}>
            <Option value="single">Single</Option>
            <Option value="married">Married</Option>
            </Select>
            <span className='m-2 text-red-400'>*</span>
           </div>

        </div>
    </div>
    {employee.martialStatus.status == "married"?<>
    <div className='space-y-2'>
        <Typography>Full Name</Typography>
        <div className='flex'>
        <Input type='text' value={employee.martialStatus.fullName} onChange={e=>{
            setEmployee({...employee,martialStatus:{...employee.martialStatus,fullName:e.target.value}})
        }} crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>
        </div>
    </div>
    <div className='space-y-2'>
        <Typography>Children?</Typography>
        <div className='flex'>
        <Checkbox value={employee.children} 
        onChange={e=>{
            setEmployee({...employee,children:e.target.checked})
        }}
        label="I have children" />
        </div>
    </div>
    
    </>
    :
    <></>}

    <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
    <Typography className='lg:col-span-3 sm:col-span-1 text-primary font-bold'>
        Emergency contact
    </Typography>
    <div className='space-y-2'>
        <Typography>Full name</Typography>
        <div className='flex'>
        <Input type='text' value={employee.emergencyContact.name} onChange={e=>{
            setEmployee({...employee,emergencyContact:{...employee.emergencyContact,name:e.target.value}})
        }} crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>
        </div>
    </div>
    <div className='space-y-2'>
        <Typography>Phone Number</Typography>
        <div className='flex'>
        <Input value={employee.emergencyContact.phoneNumber} onChange={e=>{
            setEmployee({...employee,emergencyContact:{...employee.emergencyContact,phoneNumber:e.target.value}})
        }} type='text' crossOrigin="*"/>
        <span className='m-2 text-red-400'>*</span>            
        </div>
    </div>
    <div className='space-y-2'>
        <Typography>Secondary Phone number</Typography>
        <div className='flex'>
        <Input type='text' value={employee.emergencyContact.secondaryPhoneNumber} onChange={e=>{
            setEmployee({...employee,emergencyContact:{...employee.emergencyContact,secondaryPhoneNumber:e.target.value}})
        }} crossOrigin="*"/>
            </div>
    </div>
    <div className='space-y-2'>
        <Typography>Email</Typography>
        <div className='flex'>
        <Input type='text' value={employee.emergencyContact.email} onChange={e=>{
            setEmployee({...employee,emergencyContact:{...employee.emergencyContact,email:e.target.value}})
        }} crossOrigin="*"/>
            </div>
    </div>
    <div className='space-y-2'>
        <Typography>Association</Typography>
        <div className='flex'>
        <Input type='text' value={employee.emergencyContact.association} onChange={e=>{
            setEmployee({...employee,emergencyContact:{...employee.emergencyContact,association:e.target.value}})
        }} crossOrigin="*"/>
                <span className='m-2 text-red-400'>*</span>            
            </div>
    </div>
    
</div>
        </div>
    </CardBody>
<CardFooter className='border-primary border-t-2 mt-6'>
    <Button className='px-6 bg-primary' 
    onClick={e=>{
        if(employee.martialStatus == "" || (employee.martialStatus.status == "married" && employee.martialStatus.fullName == "") 
        || employee.emergencyContact.fullName == "" || employee.emergencyContact.phoneNumber == "" || employee.emergencyContact.association == "")
        toast.warning("Please enter the required inputs!",{position:"top-left"})
        else 
        setCardNum(1.3)
    }}
    >Next</Button>
</CardFooter>
</Card>
</div>
</motion.div>)
:
cardNum == 1.3 ? 
(
   <motion.div key={903}
   initial={{ x: -100 }}
   animate={{ x: 0 }}
   exit={{ x: -100 }}
   >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
   <CardHeader>
       <Typography variant='h5' className='p-6 text-primary'>
       Please provide relevant information to complete the employee registration process.
               </Typography>
   </CardHeader>
   <CardBody>
       <div className='p-6 flex'>
<div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-10">
   <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
   <Typography className='lg:col-span-3 sm:col-span-1 text-primary font-bold'>
   Next of keen 
   </Typography>
   <div className='space-y-2'>
       <Typography>Full name</Typography>
       <div className='flex'>
       <Input type='text' value={employee.nextOfKeen.name} onChange={e=>{
           setEmployee({...employee,nextOfKeen:{...employee.nextOfKeen,name:e.target.value}})
       }} crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>
       </div>

   </div>
   <div className='space-y-2'>
       <Typography>Phone number</Typography>
       <div className='flex'>
       <Input value={employee.nextOfKeen.phoneNumber} onChange={e=>{
           setEmployee({...employee,nextOfKeen:{...employee.nextOfKeen,phoneNumber:e.target.value}})
       }} type='text' crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>            
       </div>

   </div>
   <div className='space-y-2'>
       <Typography>Secondary Phone number</Typography>
       <div className='flex'>
       <Input type='text' value={employee.nextOfKeen.secondPhoneNumber} onChange={e=>{
           setEmployee({...employee,nextOfKeen:{...employee.nextOfKeen,secondPhoneNumber:e.target.value}})
       }} crossOrigin="*"/>
               <span className='m-2 text-red-400'>*</span>            
           </div>
   </div>
   <div className='space-y-2'>
       <Typography>Email</Typography>
       <div className='flex'>
       <Input type='email' value={employee.nextOfKeen.email} onChange={e=>{
           setEmployee({...employee,nextOfKeen:{...employee.nextOfKeen,email:e.target.value}})
       }} crossOrigin="*"/>
           </div>
   </div>
   <div className='space-y-2'>
       <Typography>Association</Typography>
       <div className='flex'>
       <Input type='text' value={employee.nextOfKeen.association} onChange={e=>{
           setEmployee({...employee,nextOfKeen:{...employee.nextOfKeen,association:e.target.value}})
       }} crossOrigin="*"/>
               <span className='m-2 text-red-400'>*</span>            
           </div>
   </div>
   
</div>
       </div>
   </CardBody>
<CardFooter className='border-primary border-t-2 mt-6'>
   <Button className='px-6 bg-primary' 
   onClick={e=>{
       if(employee.nextOfKeen.name == "" || employee.nextOfKeen.phoneNumber == "" 
       || employee.nextOfKeen.secondPhoneNumber == "" || employee.nextOfKeen.association == "")
       toast.warning("Please enter the required inputs!",{position:"top-left"})
       else 
       setCardNum(1.4)
   }}
   >Next</Button>
</CardFooter>
</Card>
</div>
</motion.div>)
:
cardNum == 1.4 ? 
(
   <motion.div key={903}
   initial={{ x: -100 }}
   animate={{ x: 0 }}
   exit={{ x: -100 }}
   >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
   <CardHeader>
       <Typography variant='h5' className='p-6 text-primary'>
       Please provide relevant information to complete the employee registration process.
               </Typography>
   </CardHeader>
   <CardBody>
   <div className='space-y-2 sm:co col-span-3'>
    <div className='flex'>
        <Checkbox label="I have no work experience" 
        onChange={e=>{
            if(e.target.checked)
            setEmployee({...employee,workExperience:[]})
            else
            setEmployee({...employee,workExperience:[{
                employment:"",
                sector:"",
                location:"",
                title:"",
                yourRole:"",
                from:"",
                to:""
            }]})
        }}
        />
    </div>
   </div>

     { employee.workExperience.map((each,index)=><div className='p-6 flex'>
<div key={index} className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
   <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
   <Typography className='lg:col-span-3 sm:col-span-1 text-primary font-bold'>
   Work experience {index == 0 ?"":(index+1)}
   </Typography>
   <div className='space-y-2'>
       <Typography>Employment</Typography>
       <div className='flex'>
            <Select 
            value={employee.workExperience[index].employment}
            onChange={e=>{
                let oldArray = [...employee.workExperience]
                oldArray[index] = {...oldArray[index],employment:e}
                setEmployee({...employee,workExperience:oldArray})
            }}>
                <Option value='full-time'>
                    Full-time
                </Option>
                <Option value='part-time'>
                    Part-time
                </Option>
                <Option value='seasonal'>
                Seasonal
                </Option>
                <Option value='temporary'>
                Temporary
                </Option>                
            </Select>
       <span className='m-2 text-red-400'>*</span>
       </div>
   </div>
   <div className='space-y-2'>
       <Typography>Sector</Typography>
       <div className='flex'>
       <Input value={employee.workExperience[index].sector} onChange={e=>{
                    let oldArray = [...employee.workExperience]
                    oldArray[index] = {...oldArray[index],sector:e.target.value}
           setEmployee({...employee,workExperience:oldArray})
       }} 
       type='text' crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>            
       </div>
   </div>
   <div className='space-y-2'>
       <Typography>Title </Typography>
       <div className='flex'>
       <Input
       placeholder='Ex...,  accountant, senior manager, etc.'
       value={employee.workExperience[index].title} onChange={e=>{
        let oldArray = [...employee.workExperience]
        oldArray[index] = {...oldArray[index],title:e.target.value}
        setEmployee({...employee,workExperience:oldArray})
        }}  type='text' crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>            
       </div>
   </div>
   <div className='space-y-2'>
       <Typography>Your role </Typography>
       <div className='flex'>
       <Input
       placeholder=''
       value={employee.workExperience[index].yourRole} onChange={e=>{
        let oldArray = [...employee.workExperience]
        oldArray[index] = {...oldArray[index],yourRole:e.target.value}
        setEmployee({...employee,workExperience:oldArray})
        }}  type='text' crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>            
       </div>
   </div>
   <div className='space-y-2 sm:col-span-1 lg:col-span-3'>
       <Typography>Location </Typography>
       <div className='flex w-2/4'>
       <Input
       placeholder='Ex..., Addis Abeba, etc.'
       value={employee.workExperience[index].location} onChange={e=>{
        let oldArray = [...employee.workExperience]
        oldArray[index] = {...oldArray[index],location:e.target.value}
        setEmployee({...employee,workExperience:oldArray})
        }} 
        type='text' crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>            
       </div>
   </div>
   <div className='space-y-2'>
       <Typography>From </Typography>
       <div className='flex'>
       <Input
       placeholder='Ex...,  Addis Abeba, etc.'
       value={employee.workExperience[index].from} onChange={e=>{

        let oldArray = [...employee.workExperience]
        oldArray[index] = {...oldArray[index],from:e.target.value}
        setEmployee({...employee,workExperience:oldArray})
        }} 
type='date' crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>            
       </div>
   </div>
   <div className='space-y-2'>
       <Typography>To </Typography>
       <div className='flex'>
       <Input
       placeholder='Ex...,  Addis Abeba, etc.'
       value={employee.workExperience[index].to} onChange={e=>{

        let oldArray = [...employee.workExperience]
        oldArray[index] = {...oldArray[index],to:e.target.value}
        setEmployee({...employee,workExperience:oldArray})
        }} 
type='date' crossOrigin="*"/>
       <span className='m-2 text-red-400'>*</span>            
       </div>
   </div>
   <div className='space-y-2 sm:col-span-1 lg:col-span-3'>
  <Checkbox label="I am still working" onChange={e=>{
    if(e.target.checked)
    {
        let oldArray = [...employee.workExperience]
        oldArray[index] = {...oldArray[index],to:"I am still working"}
        setEmployee({...employee,workExperience:oldArray})
    }
  }} />   
   </div>
</div>
       </div>)}
       {employee.workExperience.length > 0?<div className='flex p-4 items-center px-4 space-x-4'>
            <IconButton onClick={e=>{
                let oldArray = [...employee.workExperience]
                oldArray.push({
                    employment:"",
                    sector:"",
                    location:"",
                    title:"",
                    yourRole:"",
                    from:"",
                    to:""
                })
                setEmployee({...employee,workExperience:oldArray})

            }} className='rounded-full bg-white text-black'>
                <PlusIcon className='h-5' />
            </IconButton>
            <Typography>
                Add more experience
            </Typography>
       </div>:<></>}
   </CardBody>
<CardFooter className='border-primary border-t-2 mt-6'>
   <Button className='px-6 bg-primary' 
   onClick={e=>{
    let validate = true
    employee.workExperience.map((each)=>{
        if(each.employment == "" || each.from == "" || each.to == "" || each.location == "" || each.title == "" )
        {
            validate = false
            console.log(each)
        }
    })
    if(validate)
    setCardNum(1.5)
    else 
    toast.warning("Please enter the required inputs!",{position:"top-left"})

}}
   >Next</Button>
</CardFooter>
</Card>
</div>
</motion.div>)
:
cardNum == 1.5 ? 
(
   <motion.div key={903}
   initial={{ x: -100 }}
   animate={{ x: 0 }}
   exit={{ x: -100 }}
   >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
   <CardHeader>
       <Typography variant='h5' className='p-6 text-primary'>
       Get in touch with us on telegram
               </Typography>
   </CardHeader>
   <CardBody>
<div className='p-6 flex'>
<div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
   <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
   <Typography className='lg:col-span-3 sm:col-span-1 text-primary font-bold'>
   Connect your profile with our telegram bot
   </Typography>
   <div className='space-y-2'>
       <Typography>It enables you to receive notifications and simplifies getting updates and functionality on telegram</Typography>
       <Button onClick={()=>{
       window.open(`${URLS.botLink}?start=${userState.userDetail?.id}`)
       setTimeout(() => {
        setCardNum(1.6)
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
</div>
</motion.div>)
:cardNum == 1.6 ? 
(
   <motion.div key={903}
   initial={{ x: -100 }}
   animate={{ x: 0 }}
   exit={{ x: -100 }}
   >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
   <CardHeader>
       <Typography variant='h5' className='p-6 text-primary'>
       We build Stronger Workplace Connections
               </Typography>
   </CardHeader>
   <CardBody>
<div className='p-6 flex'>
<div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
   <hr className='border-2 lg:col-span-3 sm:col-span-1 border-primary'/>
   <Typography className='lg:col-span-3 sm:col-span-1 text-primary font-bold'>
   Terms and condtions
   </Typography>
   <div className='space-y-2'>
       <Typography>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptatum fuga enim quia libero fugit deserunt quisquam repellendus. Numquam ipsam accusantium sapiente sequi architecto repudiandae pariatur id unde saepe eum.
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptatum fuga enim quia libero fugit deserunt quisquam repellendus. Numquam ipsam accusantium sapiente sequi architecto repudiandae pariatur id unde saepe eum.
        </Typography>
        <div className='m-2'>
<Checkbox label="I accept terms and conditions" onChange={e=>{
if(e.target.checked)
setAgree(true)
else
setAgree(false)
}}/>
        </div>
       <Button onClick={SUBMIT} disabled={(!agree || loading)} className='bg-primary flex space-x-4 items-center'>
         {loading?"Loading....":"Submit profile"}
       </Button>
   </div>
</div>
       </div>
   </CardBody>
</Card>
</div>
</motion.div>)
:
<>
</>

}
    </div>
  )
}

export default ChoseUserType