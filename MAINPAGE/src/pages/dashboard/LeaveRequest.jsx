import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { DocumentArrowUpIcon, DocumentCheckIcon, GiftIcon, ShareIcon } from '@heroicons/react/24/solid'
import { Badge, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Input, Option, Radio, Select, Textarea, Typography } from '@material-tailwind/react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const LeaveRequest = () => {

    const userState = useSelector((state)=>state.userState)
    const [breaks,setBreaks] = useState({ totalDays:0,months:0,remainDays:0})
    const [experienceData,setExperienceData]= useState({})
    const [dayOff,setDayOff] = useState([])
    const [holidays,setHolidays] = useState([])
    const fileUploader = useRef()
    const [fileName,setFilename] = useState("")
    const [reload,setReload] = useState(false)
    const [leaveData,setLeaveData] = useState({
        type:0,
        startDate:"",
        endDate:"",
        additionalType: null,
        reason: "",
        comment:"",
        file:""
    })

    useEffect(()=>{

        (async ()=>{
            await axios.get(`${URLS.baseURL}/employee/dayoff`,userState.Auth)
            .then((result) => {
                let data = result?.data
                if(data != null)
                setDayOff(JSON.parse(data?.dayOff))
            }).catch((err) => {
                xhrError(err)
            });
            await axios.get(`${URLS.baseURL}/calendar/holydays`)
            .then((result) => {
                console.log(result.data)
                let data = result?.data
                if(data != null)
                {
                    data.map((each)=>{
                        setHolidays([...holidays,each.date])
                    })
                }
                
            }).catch((err) => {
                xhrError(err)
            });
        })()

    },[userState])


    useEffect(()=>{

        console.log(holidays)
    },[holidays])

    useEffect(()=>{


        if(leaveData.type == 1)
        {
            let maxBreak = 180;
            if(moment(leaveData.startDate).isBefore(moment()))
            {
                toast.warning("Please provide a date that is after today's date.",{position:"top-center"})
                setLeaveData({...leaveData,startDate:""})
            }
            else if(leaveData.startDate != "" && leaveData.endDate != "")
            {
                const startDate = moment(leaveData.startDate);
                const endDate = moment(leaveData.endDate);
                const startMonth = startDate.month() + 1;
                const endMonth = endDate.month()+1;
                if(startMonth > endMonth)
                toast.warning("Invalid date input",{position:"top-center"})
                else
                {
                const numberOfDays = endDate.diff(startDate, 'days');
                let numberOfDayOff = 0;
                let numberOfHolidays = 0
                for (var date = startDate; date.isSameOrBefore(endDate); date.add(1, 'day')) 
                {
                    dayOff.map((each,index)=>{
                        if (date.weekday() === dayOff[index]) 
                        { 
                            numberOfDayOff++;       
                        }
                    })  
                }
                holidays.map((each)=>{
                    if(moment(each).isBetween(startDate,endDate))
                    numberOfHolidays++
                })

            let  totalDates = numberOfDays-numberOfDayOff-numberOfHolidays
            if(totalDates > maxBreak)
            {
                toast.warning("Possible maximum leave time is 6 month",{position:"top-center"})
                setLeaveData({...leaveData,endDate:""})
            }
            else if(totalDates == 0)
            {    
            toast.warning("Possible minimum leave time is 1 day",{position:"top-center"})
            setLeaveData({...leaveData,endDate:""})
            }
            else if(totalDates < 0)
            {    
            toast.error("The date you entered is invalid. Please ensure that the end date is after the start date.",{position:"top-center"})
            setLeaveData({...leaveData,endDate:""})
            }
            else 
            {
            const startDate1 = moment();
            const endDate1 = startDate1.clone().add(totalDates, 'days');
            const months = endDate1.diff(startDate1, 'months');
            startDate1.add(months, 'months');
            const remainingDays = endDate1.diff(startDate1, 'days');
            setBreaks({months:months,totalDays:totalDates,remainDays:remainingDays})
            }
            }
            }
        }
        else if(leaveData.type == 2)
        {
            let minDays = 150;
            if(moment(leaveData.startDate).isBefore(moment()))
            {
                toast.warning("Please provide a date that is after today's date.",{position:"top-center"})
                setLeaveData({...leaveData,startDate:""})
            }
            else if(moment(leaveData.endDate).isBefore(moment(leaveData.startDate)))
            {
                toast.warning("Please provide a date that is after start date.",{position:"top-center"})
                setLeaveData({...leaveData,endDate:""})
            }
            else if(leaveData.startDate != "" && leaveData.endDate != "")
            {
                    const startDate = moment(leaveData.startDate);
                    const endDate = moment(leaveData.endDate);    
                    const numberOfDays = endDate.diff(startDate, 'days');
                    let numberOfDayOff = 0;
                    let numberOfHolidays = 0
                    for (var date = startDate; date.isSameOrBefore(endDate); date.add(1, 'day')) 
                    {
                        dayOff.map((each,index)=>{
                            if (date.weekday() === dayOff[index]) 
                            { 
                                numberOfDayOff++;       
                            }
                        })  
                    }
                    holidays.map((each)=>{
                        if(moment(each).isBetween(startDate,endDate))
                        numberOfHolidays++
                    })
                   let  totalDates = numberOfDays-numberOfDayOff-numberOfHolidays
                   if(totalDates < 1)
                   {
                    toast.warning("The minimum duration for a leave request is one day")
                    setLeaveData({...leaveData,endDate:""})
                   }
                   else
                   {
                    const startDate1 = moment();
                    const endDate1 = startDate1.clone().add(totalDates, 'days');
                    const months = endDate1.diff(startDate1, 'months');
                    startDate1.add(months, 'months');
                    const remainingDays = endDate1.diff(startDate1, 'days');
                    setBreaks({months:months,totalDays:totalDates,remainDays:remainingDays})
                   }
            }
        }
        else if(leaveData.type == 3)
        {
            if(moment(leaveData.startDate).isBefore(moment()))
            {
                toast.warning("Please provide a date that is after today's date.",{position:"top-center"})
                setLeaveData({...leaveData,startDate:""})
            }
            else if(moment(leaveData.endDate).isBefore(moment(leaveData.startDate)))
            {
                toast.warning("Please provide a date that is after start date.",{position:"top-center"})
                setLeaveData({...leaveData,endDate:""})
            }
            else if(leaveData.startDate != "" && leaveData.endDate != "")
            {
                const startDate = moment(leaveData.startDate);
                const endDate = moment(leaveData.endDate);    
                const numberOfDays = endDate.diff(startDate, 'days');
                let numberOfDayOff = 0;
                let numberOfHolidays = 0
                for (var date = startDate; date.isSameOrBefore(endDate); date.add(1, 'day')) 
                {
                    dayOff.map((each,index)=>{
                        if (date.weekday() === dayOff[index]) 
                        { 
                            numberOfDayOff++;       
                        }
                    })  
                }
                holidays.map((each)=>{
                    if(moment(each).isBetween(startDate,endDate))
                    numberOfHolidays++
                })
               let  totalDates = numberOfDays-numberOfDayOff-numberOfHolidays
               if(totalDates < 1)
               {
                toast.warning("The minimum duration for a leave request is one day")
                setLeaveData({...leaveData,endDate:""})
               }
               else
               {
                const startDate1 = moment();
                const endDate1 = startDate1.clone().add(totalDates, 'days');
                const months = endDate1.diff(startDate1, 'months');
                startDate1.add(months, 'months');
                const remainingDays = endDate1.diff(startDate1, 'days');
                setBreaks({months:months,totalDays:totalDates,remainDays:remainingDays})
               }
            }
        }
        else if(leaveData.type == 4)
        {
            (async()=>{
                await axios.get(`${URLS.baseURL}/employee/my/experience`,userState.Auth)
                .then((result) => {
                    setExperienceData(result.data)
                }).catch((err) => {
                    xhrError(err)
                });
            })()
        }
    },[leaveData])


    const SUBMIT = async (e)=>{
        if(leaveData.type == 0 || 
           leaveData.startDate == "" || 
           leaveData.endDate == "" ||
           leaveData.reason == "")
        toast.warning("Please enter all the required inputs")
        else if(leaveData.type == 2 && leaveData.file == "")
        toast.warning("Medical certificate of maternity required")
        else 
        {
            e.target.disable = true 
            e.target.innerText = "..............."
            await axios.post(`${URLS.baseURL}/leave/request`,leaveData,userState.Auth)
            .then((result) => {
                    console.log(result)                
                    e.target.disable = false 
                    e.target.innerText = "Request"
                    setReload(!reload)
                    setLeaveData({        type:0,
                        startDate:"",
                        endDate:"",
                        additionalType: null,
                        reason: "",
                        comment:"",
                        file:""
                })
        
            }).catch((err) => {
                xhrError(err)
                e.target.disable = false 
                e.target.innerText = "Request"
            });
        }
    }

    const [requests,setRequests] = useState([])
    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/employee/requests/me`,userState.Auth)
            .then((result) => {
                    console.log(result)                
                    setRequests(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[userState,reload])


  return (
    <>
          <div className="relative mt-8 h-24 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card>
        <CardHeader className='p-4'>
                <Typography className=' text-primary' variant='h4'>
                    Leave request form
                </Typography>
        </CardHeader>
        <CardBody>
                <div className='grid grid-cols-2 gap-2 pt-4'>
                    <Card>
                        <CardHeader className='p-4 border-2 border-primary'>
                            {leaveData.type == 0?<Typography>Fill the form carefully</Typography>:""}
                            {leaveData.startDate != ""?<Typography variant='lead' className='text-primary'>
                                Time {breaks.months > 0 ? breaks.months+" month "+breaks.remainDays+" days":breaks.remainDays+" days"}
                            </Typography>:""}
                            {
                               leaveData.type ==1? breaks.months >=2 && breaks.months < 3?<Typography variant='small' className='italic'>1<sup>st</sup> Month with 100% salary, &nbsp;2<sup>nd</sup> Month with 50% of salary </Typography>:
                                breaks.months >=3?<Typography variant='small' className='italic'>1<sup>st</sup> Month with 100% salary, &nbsp;2<sup>nd</sup> Month with 50% of salary,&nbsp; 3<sup>rd+</sup> Month with no salary </Typography>:
                                "":""
                            }

                            {
                            leaveData.additionalType != null?
                            leaveData.additionalType == 1?
                            <Typography>
                                {breaks.remainDays > 3 || breaks.months > 1?"only 3 days with salary":""}
                            </Typography>:"":""
                             }
                             {
                                leaveData.type == 4?(<Typography className='text-primary'>
                                    You have {experienceData?.experience} of experience and you have {experienceData?.availableBreaks} days possible annual leave 
                                </Typography>):""
                             }
                        </CardHeader>
                        <CardBody className='grid grid-cols-2 gap-2'>
                            <div className='space-y-4'>
                                <label className='text-primary'>Leave Type:</label>
                                <Select value={leaveData.type} onChange={e=>setLeaveData({...leaveData,type:e})} label='Leave Type'>
                                    <Option value={0}>Chose:</Option>
                                    <Option value={1}>Health Leave</Option>
                                    <Option value={2}>Birth Leave</Option>
                                    <Option value={3}>Special Leave</Option>
                                    <Option value={4}>Annual Leave</Option>
                                </Select>
                            </div>
                            {leaveData.type == 3?<div className='space-y-4 py-4 border-gray-100 border-2 rounded-md'>
                            <Radio onClick={()=>setLeaveData({...leaveData,additionalType:1})} label="Maternity" name='type'/>
                            <Radio onClick={()=>setLeaveData({...leaveData,additionalType:2})} label="Mortality" name='type'/>
                            <Radio onClick={()=>setLeaveData({...leaveData,additionalType:3})} label="Legal case" name='type'/>
                            <Radio onClick={()=>setLeaveData({...leaveData,additionalType:4})} label="Other" name='type'/>
                            </div>:""}
                            <div className='space-y-4'>
                                <label className='text-primary'>Start date:</label>
                                <Input value={leaveData.startDate} onChange={(e)=>setLeaveData({...leaveData,startDate:e.target.value})} type='date' label='Start date'/>
                            </div>
                            <div className='space-y-4'>
                                <label className='text-primary'>End date:</label>
                                <Input value={leaveData.endDate} onChange={(e)=>setLeaveData({...leaveData,endDate:e.target.value})} type='date' label='Start date'/>
                            </div>
                            <div className='space-y-4'>
                                <label className='text-primary'>Reason for Leave:</label>
                                <Textarea value={leaveData.reason} onChange={(e)=>setLeaveData({...leaveData,reason:e.target.value})} type='text' label='Reason for Leave:'/>
                            </div>
                            <div className='space-y-4'>
                                <label className='text-primary'>Additional Comments:</label>
                                <Textarea className='h-full' value={leaveData.comment} onChange={(e)=>setLeaveData({...leaveData,comment:e.target.value})} type='text' label='Additional comment:'/>
                            </div>
                            <div>
                            </div><div>
                            </div>
                            {leaveData.type == 3?<div>
                            </div>:""}
                            <div>
                                <br />
                            </div>
                            <div className='m-2 flex flex-col space-y-2'>

                                {fileName == ""?<label className={leaveData.type == 2?'text-orange-800':""}>{leaveData.type == 2?"Medical Certificate of Maternity":"Supporting Document"}</label>
                                :<label className={fileName == "Upload error please input appropriate file pdf/Jpeg"?' text-orange-900 ':' text-green-600'}>{fileName}</label>}
                                <input className='hidden' ref={fileUploader} type="file" onChange={async (e)=>{
                                    let file = e.target.files[0]
                                    setFilename("Loading.........")
                                    let fd = new FormData()
                                    fd.append("document",file)
                                    await axios.post(`${URLS.baseURL}/leave/document`,fd,userState.Auth)
                                    .then((result) => {
                                        setLeaveData({...leaveData,file:result.data?.fileName})
                                       setFilename(result.data?.fileName)
                                    }).catch((err) => {
                                        setFilename("Upload error please input appropriate file pdf/Jpeg")
                                        xhrError(err)
                                    });


                                }} id="" />
                                <Button onClick={()=>fileUploader.current.click()} className='bg-orange-500 flex justify-center items-center'>
                                    <DocumentArrowUpIcon className='h-5' />
                                    <b>Upload</b>

                                </Button>
                                <label className='text-gray-700 italic'>

                                    {leaveData.type == 1?
                                    "It is advisable to include the medical document when requesting a health leave"
                                        :
                                    ""
                                }
                                </label>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <hr className='border-2 border-primary'/>
                            <Button onClick={SUBMIT} className='m-2 bg-primary flex'>
                               <ShareIcon className='h-4'/> Send Request
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardBody>
                            <DataTable
                            columns={[
                                {name:<Typography className='text-primary'>Leave</Typography>,selector:(row)=>row.type == 1 ?"Health Leave":row.type == 2 ? "Birth Leave":row.type == 3?"Special Leave":row.type == 4?"Annual leave":"Unknown Leave"},
                                {name:<Typography className='text-primary'>Start Date</Typography>,selector:(row)=>moment(row.startDate).format("DD-MM-YY")},
                                {name:"Status",selector:(row)=>row.status == 0?<Badge color='green' >PENDING</Badge>:""}
                            ]}
                            subHeader
                            subHeaderComponent={<Typography>Previous Requests</Typography>}
                            subHeaderAlign='left'
                            expandableRows
                            expandableRowsComponent={({data})=>{
                                return (<>
                                <Card className='m-2 border-2 border-primary'>
                                    <CardBody>
                                    <CardBody className='p-2'>
                                    <div className='flex space-x-2'>
                                    <div className='p-2 grid grid-cols-1'>
                                        <div className='space-y-2'>
                                        <Typography>Leave Type : {data.type == 1 ?"Health Leave":data.type == 2 ? "Birth Leave":data.type == 3?"Special Leave":data.type == 4?"Annual leave":"Unknown Leave"}</Typography>
                                        <Typography>Start Date : {moment(data.startDate).format('YYYY-MM-DD')}</Typography>
                                        <Typography>End Date : {moment(data.endDate).format('YYYY-MM-DD')}</Typography>
                                        </div>
                                        <div>
                                        <label>Reason</label>
                                            <Typography>{data.reason}</Typography>
                                            <label>Comment</label>
                                            <Typography>{data.comment}</Typography>
                                            <label>Attached document</label>
                                            <Typography as="a" className='text-white flex items-center  p-4 rounded-md bg-blue-500' href={`${URLS.documents}/${data.file}`} >
                                                <DocumentCheckIcon className='h-5'/>
                                            {data.file}
                                            </Typography>
                                        </div>
                                </div>
                                    </div>
                            </CardBody>

                                    </CardBody>
                                    <CardFooter className='border-t-2 border-primary p-1'>
                                        <ButtonGroup>
                                            <Button variant='text' className='text-orange-900 bg-white'>Cancel</Button>
                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                                </>)
                            }}
                            data={requests}
                            noDataComponent={<Typography>No request found</Typography>}
                            />
                        </CardBody>
                    </Card>
                </div>
        </CardBody>
      </Card>
</>
  )
}

export default LeaveRequest

 
