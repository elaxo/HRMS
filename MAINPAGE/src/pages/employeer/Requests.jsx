import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { EyeIcon } from '@heroicons/react/24/solid'
import { CardBody, Card, CardHeader, Input, Select, Option, Typography, Avatar, CardFooter, Button, ButtonGroup } from '@material-tailwind/react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'

export const Requests = () => {


    const [myCompanyRequests,setRequests] = useState([])
    const userState = useSelector((state)=>state.userState)
    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/company/requests`,userState.Auth)
            .then((result) => {
                    setRequests(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[])

  return (
    <div>
        <>
        <div className="relative mt-8 h-24 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-primary" />
      </div>
      <Card>
        <CardBody className='p-2'>
        <CardHeader className='p-4'>
            <div className='flex space-x-4'>
                <div>
                    <Input />
                </div>
                <div>
                    <Select>
                        <Option>Loop</Option>
                    </Select>
                </div>
                <div>

                </div>
            </div>
        </CardHeader>
        <Card>
            <CardBody>
                <div className='px-6 border-2 rounded-xl shadow-md'>
                <DataTable
                className='m-2 border-2 border-primary p-3 shadow-md'
                title={<Typography className='text-primary'>Requests</Typography>}
                data={myCompanyRequests}
                columns={[
            {name: <Typography className='text-primary'>Employee Name</Typography>,selector:(row)=><Profile id={row.userId} type="full_name" />},
            {name:<Typography className='text-primary'>Position</Typography>,selector:(row)=><Profile id={row.userId} type="Position" />},
            {name:<Typography className='text-primary'>Request Type</Typography>,selector:(row)=>row.type == 1 ?"Health Leave":row.type == 2 ? "Birth Leave":row.type == 3?"Special Leave":row.type == 4?"Annual leave":"Unknown Leave"},
            {name:<Typography className='text-primary'>Start Date</Typography>,selector:(row)=>moment(row.startDate).startOf('day').toString()},
            {name:<Typography className='text-primary'>End Date</Typography>,selector:(row)=>row.endDate},
            {name:<Typography className='text-primary'>Time</Typography>,selector:(row)=>moment(row.createdAt).fromNow()}
            ]}
            noDataComponent={<Typography className='text-primary'>No requests found</Typography>}
            expandableRows
            expandableRowsComponent={({data})=>{
                return (<>
                <Card className='p-2 shadow-md border-2 border-primary m-2'>
                    <CardBody>
                        <Card className='shadow-md rounded-md p-4'>
                            <CardHeader className='p-4'>
                            <Profile id={data.userId} type="more" /> 
                            </CardHeader>
                            <CardBody className='p-2'>
                                    <div className='flex space-x-2'>
                                    <div className='p-2 grid grid-cols-3'>
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
                                            <Typography as="a" className='text-blue-600' href={`${URLS.documents}/${data.file}`} >
                                            {data.file}
                                            </Typography>
                                        </div>
                                </div>
                                    </div>
                            </CardBody>
                            <CardFooter>
                                <ButtonGroup>
                                <Button className='bg-primary'>Accept</Button>
                                <Button className='bg-orange-900'>Reject</Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </CardBody>
                </Card>
                </>)
            }}
        />
                </div>
            </CardBody>
        </Card>
        </CardBody>
      </Card>

        </>
    </div>
  )
}

const Profile = ({id,type})=>{

    const userState = useSelector((state)=>state.userState)
    const [userDetail,setUserDetail] = useState({})
    const [positionDetail,setPositionDetail] = useState({})
    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/employees/profile?id=${id}`,userState.Auth)
            .then((result) => {
                setUserDetail(result.data)
            }).catch((err) => {
                xhrError(err)
            });
            await axios.get(`${URLS.baseURL}/employee/position/detail?id=${id}`,userState.Auth)
            .then((result) => {
                setPositionDetail(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[userState]) 
    if(type == "full_name")
    return(
    <div className="flex items-center space-x-2 space-y-2 p-4">
        <Avatar src={`${URLS.Avatar}/${userDetail?.avatar}`} />
            <Typography>{userDetail?.name}</Typography>

    </div>)
    else if(type == "more")
    return <div className='p-4 grid grid-cols-4'>
        <div className='flex items-center space-x-3'>
        <Avatar src={`${URLS.Avatar}/${userDetail?.avatar}`} />     
        <Typography variant='h5'>{userDetail?.name}</Typography>
        </div>
        <div>
        <div className='p-1 flex'>
        <Typography>Phone number: {userDetail?.phoneNumber}</Typography>            
        </div>
        <div className='p-1 flex'>
        <Typography>Sex: {userDetail?.sex}</Typography>            
        </div>
        <div>
        <Typography>Position : <p className='text-primary'>{positionDetail?.title}</p></Typography>
        </div>
        </div>
    </div>
    else
    return(<Typography>{positionDetail?.title}</Typography>)
    
}