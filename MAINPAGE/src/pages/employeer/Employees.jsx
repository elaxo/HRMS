import { MagnifyingGlassCircleIcon, TvIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { Avatar, Badge, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Input, Option, Select, Tooltip, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import axios from 'axios';
import { URLS } from '@/configs/URLS';
import { useSelector } from 'react-redux';
import { xhrError } from '@/configs/ERRORS';
import { ToastContainer, toast } from 'react-toastify';

const Employees = () => {
    const [openDialog,setOpenDialog] = useState(false)
    const [phone,setPhone] = useState('')
    const [searchQuery,serSearchQuery] = useState("")
    const [queryResult,setQueryResult] = useState([])

    const [employee,setEmployee] = useState({
        firstName:"",
        lastName:"",
        email:"",
        sex:"",
        phone:null,
        address:"",
        position:null,
        startDate:""
})
    const userState = useSelector((state)=>state.userState)
    const [positions,setPositions] = useState([])
    const [reload,setReload] = useState(false)
    useEffect(()=>{

        setEmployee({...employee,phone:"+251"+phone})

    },[phone])
    useEffect(()=>{

        (async()=>{
            await axios.get(`${URLS.baseURL}/positions/user`,userState.Auth)
            .then((result) => {
                setPositions(result.data)
                console.log(result)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[reload])

    const [show,setShow] = useState(false)
    const [currentDetail,setDetail] = useState(null)
    const ViewDetail= async (row)=>{

        
            await axios.get(`${URLS.baseURL}/employees/profile?id=${row?.userId}`,userState.Auth)
            .then((result) => {
                setDetail(result.data)
                setShow(true)                
            }).catch((err) => {
                xhrError(err)
            });
        

    }


  return (
  <>
 <Dialog open={show} size='xl' className='overflow-y-scroll h-[95%]'>
    <DialogHeader className='rounded-md shadow-lg p-2 flex justify-between items-center bg-primary'>
            <Typography variant='h5' className='p-2 text-white'>Profile Detail - {currentDetail?.name}</Typography>
            <IconButton onClick={()=>setShow(false)} className='bg-white rounded-full border-none'>
                <XCircleIcon className='h-6 text-primary' />
            </IconButton>
        </DialogHeader>
        <hr  className='border-2 border-primary'/>
        <DialogBody className='p-4 w-full'>
            <div className='grid grid-cols-5 gap-3'>
                <div>
                    <Card className='p-2 w-40 h-40 shadow-md'>
                        <img className='rounded-md' src={`${URLS.Avatar}/${currentDetail?.avatar}`} />
                    </Card>
                </div>
                <div className='space-y-1'>
                    <Typography variant='h3' className=' font-bold  border-primary pl-2'>{currentDetail?.name}</Typography>
                    <Typography className=' capitalize font-bold  border-primary pl-2'>{currentDetail?.sex}</Typography>
                </div>
                <div className='space-y-1 col-span-3'>
                    <Typography variant='h5' className=' font-bold  border-primary pl-2'>Current position</Typography>
                    <UserPositionDetail userId={currentDetail?.userId} />
                </div>
                
            </div>
            <Card className='grid grid-cols-3 shadow-lg gap-3 m-2 border-t-2 border-primary'>
            <div className='p-4'>
                    <Typography variant='h5' className='font-bold'>Contact</Typography>
                    <div className='px-2'>
                    <Typography>Phone: <br /> {currentDetail?.phoneNumber}/{currentDetail?.secondaryPhoneNumber}</Typography>
                    <Typography>Address: <br/> {currentDetail?.address}</Typography>
                                    </div>
                </div>
                <div className='p-4'>
                    <Typography variant='h5' className='font-bold'>Information</Typography>
                    <div className='px-2'>
                    <Typography>Birth Date: <br /> {currentDetail?.dateOfBirth}</Typography>
                    <Typography>Nationality: <br/> {currentDetail?.nationality}</Typography>
                    <Typography>ID Number: <br/> {currentDetail?.idNumber}</Typography>
                    </div>
                </div>
                <div className='p-4'>
                    <Typography variant='h5' className='font-bold'>Extra Information</Typography>
                    <div className='px-2'>
                    <Typography>ID Number: <br/> {currentDetail?.idNumber}</Typography>
                    <Typography>TIN Number: <br/> {currentDetail?.tinNumber}</Typography>
                    </div>
                </div>
            </Card>
            <Card className='grid grid-cols-3 shadow-lg gap-3 m-2 border-t-2 border-primary'>
            <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Bank information</Typography>
                    <Typography>Bank : {currentDetail?.BankAccount?.BankName}</Typography>
                    <Typography>Account type: : {currentDetail?.BankAccount?.BankAccountName}</Typography>
                    <Typography>Account Number : {currentDetail?.BankAccount?.AccountNumber}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Martial status</Typography>
                    <Typography>Status : {currentDetail?.martialStatus?.status}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Emergency contact</Typography>
                    <Typography>Full name : {currentDetail?.emergencyContact?.name}</Typography>
                    <Typography>Phone number : {currentDetail?.emergencyContact?.phoneNumber}</Typography>
                    <Typography>Email : {currentDetail?.emergencyContact?.email}</Typography>
                    <Typography>Association name : {currentDetail?.emergencyContact?.association}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Next of Keens</Typography>
                    <Typography>Full name : {currentDetail?.nextOfKeen?.name}</Typography>
                    <Typography>Phone number : {currentDetail?.nextOfKeen?.phoneNumber}</Typography>
                    <Typography>Email : {currentDetail?.nextOfKeen?.email}</Typography>
                    <Typography>Association name : {currentDetail?.nextOfKeen?.association}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Documents</Typography>
                    <Typography>Educational Document : 
                        <Typography className='text-blue-500' as="a" target='_blank' href={`${URLS.documents}${currentDetail?.educationalDocument}`}>
                        {currentDetail?.educationalDocument}
                        </Typography>
                        </Typography>
                    <Typography>Certification : {currentDetail?.certification}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Work Experience</Typography>
                </Card>                
           </Card>
        </DialogBody>
        <hr  className='border-2 border-primary'/>
        <DialogFooter>
            <Button variant='text' onClick={()=>setShow(false)}>OK</Button>
        </DialogFooter>
    </Dialog>
    
  <Card className='mt-8'>
    <CardHeader>
    <div className="relative mt-8 h-24 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full flex items-center justify-start pl-10 text-white w-full bg-primary" >
            <Typography variant='h3' className=' font-bold'>Employs</Typography>
            </div>
      </div>
    </CardHeader>
    <CardBody>
            <div className='grid grid-cols-4 gap-3'>
                <div className='col-span-3'>
                <div>
                    <Card>
                        <CardBody>
                            <div className='space-y-3'>
                                <label>Search employee</label>
                            <div className='flex items-center'>
                            <Input value={searchQuery} onChange={(e)=>serSearchQuery(e.target.value)} placeholder='Search' className='rounded-e-none border-primary outline-primary'/>
                            <Button onClick={async (e)=>{
                                if(searchQuery != "")
                                {
                                    e.target.disabled = true
                                    await axios.get(`${URLS.baseURL}/employees/search?q=${searchQuery}`,userState.Auth)
                                .then((result) => {
                                    console.log(result.data)
                                    e.target.disabled = false
                                    setQueryResult(result.data)
                                }).catch((err) => {
                                    e.target.disabled = false
                                    xhrError(err)
                                });}
                                else
                                setQueryResult([])

                            }} className='rounded-s-none bg-primary text-white'><MagnifyingGlassCircleIcon className='h-6'/></Button>
                            </div>
                            </div>
                            <div>
<Dialog open={openDialog} >
    <ToastContainer/>
    <DialogHeader className='flex flex-col justify-start shadow-md'>
        <Typography variant='h5' className='text-primary text-left m-2'>Create employee</Typography>
    </DialogHeader>
    <DialogBody>
        <Card className='border-2 border-primary rounded-md'>
            <CardBody>
                
                <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                        <label className='text-primary'>First Name</label>
                        <Input value={employee.firstName} onChange={e=>setEmployee({...employee,firstName:e.target.value})} placeholder='First Name' />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-primary'>Last Name</label>
                        <Input value={employee.lastName} onChange={e=>setEmployee({...employee,lastName:e.target.value})} placeholder='Last Name' />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-primary'>Email</label>
                        <Input value={employee.email} placeholder='Email' onChange={e=>setEmployee({...employee,email:e.target.value})} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-primary'>Phone</label>
                        <label className='italic opacity-70'>&nbsp;Ex.. 933555555</label>
                        <div className='flex items-center  border-gray-500 rounded-md px-2'>
                        <p className='border-2 border-gray-400 py-[5px] px-1 rounded-s-md'>+251</p>
                        <Input className='rounded-none w-full'  type='number' value={phone} placeholder='955......' onChange={e=>setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label className='text-primary'>Sex</label>
                        <Select value={employee.sex} onChange={e=>setEmployee({...employee,sex:e})}>
                        <Option value="">
                                Chose:
                            </Option>
                            <Option value="male">
                                Male
                            </Option>
                            <Option value="female">
                                Female
                            </Option>
                        </Select>
                    </div>
                    <div className='space-y-2'>
                        <label className='text-primary'>Address</label>
                        <Input value={employee.address} placeholder='Address' onChange={e=>setEmployee({...employee,address:e.target.value})} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-primary'>Position</label>
                        <Tooltip content="">
                          <select value={employee.position} onChange={e=>setEmployee({...employee,position:e.target.value})} className='p-4 w-full rounded-lg'>
                            <option value={null}>Chose position:</option>
                            {positions.map(each=>
                            <option className='p-4' value={each.id}>{each.title}</option>
                            )}
                        </select>
                        </Tooltip>
                    </div>
                    <div className='space-y-2'>
                        <label className='text-primary'>Starting Date:</label>
                        <Input type='date' value={employee.startDate} onChange={(e)=>setEmployee({...employee,startDate:e.target.value})}/>
                    </div>
                </div>
            </CardBody>
        </Card>
    </DialogBody>
    <DialogFooter className='space-x-3'>
        <Button variant='text' className='' onClick={()=>setOpenDialog(false)}>
            Cancel
        </Button>
        <Button variant='filled' onClick={async (e)=>{
           if(employee.firstName == "" ||
            employee.lastName == "" ||
             employee.email == "" || employee.position == null
             || employee.address == "" || employee.sex == "" || employee.phone == null || employee.startDate == "")
           toast.warning("Please enter all the required inputs")
           else
           {
            e.target.disabled = true;
            e.target.innerText = "..................."
            await axios.post(`${URLS.baseURL}/pending/employee/create`,employee,userState.Auth)
            .then((result) => {
                setReload(!reload)
                e.target.disabled = false;
                setOpenDialog(false)
                setEmployee({
                    firstName:"",
                    lastName:"",
                    email:"",
                    sex:"",
                    phone:null,
                    address:"",
                    email:"",
                    position:null,
                })
                e.target.innerText = "Create"
            }).catch((err) => {
                e.target.disabled = false;
                e.target.innerText = "Create"
                xhrError(err)
            });}
        }} className='bg-primary'>
            Create
        </Button>
    </DialogFooter>
</Dialog>

                                <DataTable
                                subHeaderAlign='left'
                                subHeader
                                noDataComponent={<></>}
                                subHeaderComponent={
                                    
                                    <div className='border-primary border-t-2 border-b-2 p-4 w-full'>
                                <Button onClick={()=>setOpenDialog(true)} className='bg-primary'>Create Employee</Button>
                                    </div>}
                                 
                                data={queryResult}
                                columns={[
                                    {
                                        name:"Search Result",
                                        selector:row=><div onClick={()=>ViewDetail(row)}  className=' cursor-pointer flex items-center space-x-1 m-2'><Avatar className='w-12 h-12' src={URLS.Avatar+row.avatar} /><Typography>{row.name}</Typography></div>
                                    }
                                ]}
                                expandableRows
                                expandableIcon={<TvIcon  className='h-4'/>}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </div>
                
                    <AllEmployees />
                </div>
                <div>
                    <Card className='m-2'>
                        <CardHeader className='p-4'>
                            <Typography className='text-primary'>Pending Employees</Typography>
                        </CardHeader>
                        <CardBody className='p-2'>
                                <PendingUsers updates={[reload,setReload]}/>
                        </CardBody>
                    </Card>
                </div>
            </div>
    </CardBody>
  </Card>
  </>
  )
}


const PendingUsers = ({updates})=>{

    const [pUsers,setPUsers] = useState([])
    const userState = useSelector((state)=>state.userState)
    const [loading,setLoading] = useState(false)
    const [reload,setReload] = updates
  
    
    useEffect(()=>{

        (async ()=>{
            setLoading(true)
            await axios.get(`${URLS.baseURL}/pending/employee/user`,userState.Auth)
            .then((result) => {
                setLoading(false)
                let oldData = []
                result?.data?.map((each)=>{
                   if(each?.isRegistered == 0)
                   oldData.push(each)
                })
                setPUsers(oldData)
//                
            }).catch((err) => {
                setLoading(false)
                xhrError(err)
            });
        })()        
    },[userState,reload])
    

    return (<>
    <Card>
        <CardBody>
           {loading? <Typography>Loading...</Typography>:
           <>
           <DataTable
           data={pUsers}
           noDataComponent={<Typography>No Pending Employees</Typography>}
           expandableRows
           expandableRowsComponent={({data})=>{

            return (<>
            <Card className='px-2 py-4 border-2 border-primary m-2'>
                <Typography className='px-4'>Full name</Typography>
                <label className='italic text-sm p-2 rounded-md shadow-md m-2'>
                {data.firstName+" "+data.lastName}
                </label>
                <Typography className='px-4'>Sex</Typography>
                <label className='italic text-sm p-2 shadow-md  rounded-md m-2'>{data.sex}</label>
                <Typography className='px-4'>Address</Typography>
                <label className='italic text-sm  rounded-md p-2 shadow-md m-2'>{data.address}</label>
                <Typography className='px-4'>Email</Typography>
                <label className='italic text-sm  rounded-md p-2 shadow-md m-2'>{data.email}</label>
                <Typography className='px-4'>Phone</Typography>
                <label className='italic text-sm p-2  rounded-md shadow-md m-2'>{data.phone}</label>
                <Typography className='px-4'>Position</Typography>
                <PositionDetail position={data.position} />
                <CardFooter className='border-t-2 border-primary'>
                    <Button onClick={async (e)=>{
                        e.target.disabled = true
                        if(confirm("Are you sure you went to cancel user?"))
                        await axios.delete(`${URLS.baseURL}/cancel/employee?id=${data.id}`,userState.Auth)
                        .then(async (result) => {
                           // setReload(!reload)
                            let oldData = [...pUsers]
                            let index = oldData.indexOf(data)
                            oldData.splice(index,1)
                            setPUsers(oldData)
                        }).catch((err) => {
                            xhrError(err)
                        }) 
                    }} className='bg-orange-900'>Cancel</Button>
                </CardFooter>
            </Card>
            </>)           }}
           columns={[
            {name:"Full Name",selector:row=>row.firstName+"-"+row.lastName}
           ]}
           />
           </>}
        </CardBody>
    </Card>
    </>)

}


const PositionDetail = ({position})=>{

    const userState = useSelector((state)=>state.userState)
    const [positionDetail,setPosition] = useState(null)

    useEffect(()=>{

        (async()=>{
            await axios.get(`${URLS.baseURL}/position/detail?id=${position}`,userState.Auth)
            .then((result) => {
                setPosition(result.data)
            }).catch((err) => {
                xhrError(err)
            });

        })()

    },[position])

    return (
    <>
    <Typography className='px-4 border-2 border-primary rounded-lg m-2 text-primary'>{positionDetail?.title}</Typography>
    </>)

}


const AllEmployees = ({})=>{


    const userState = useSelector((state)=>state.userState)
    const [employees,setEmployees] = useState([])
    const [branch,setBranch] = useState([])
    const [department,setDepartment] = useState([])
    const [team,setTeam] = useState([])
    const [query,setQuery] = useState({
        branch:null,
        department:null,
        team:null
    })



    useEffect(()=>{
        (async()=>{
            if(userState.isLogged)
            await axios.get(`${URLS.baseURL}/company/employees`,userState.Auth)
            .then((result) => {
                setEmployees(result.data)
            }).catch((err) => {
                xhrError(err)
            });


            await axios.get(`${URLS.baseURL}/departments/user`,userState.Auth)
            .then((result) => {
                setDepartment(result.data)
            }).catch((err) => {
                xhrError(err)
            });
            


            await axios.get(`${URLS.baseURL}/teams/user`,userState.Auth)
            .then((result) => {
                setTeam(result.data)
            }).catch((err) => {
                xhrError(err)
            });


            await axios.get(`${URLS.baseURL}/branches/user`,userState.Auth)
            .then((result) => {
          setBranch(result.data)
            }).catch((err) => {
              xhrError(err)
            });

        })()
    },[userState])


    useEffect(()=>{
        (async()=>{
            if(query.branch == null && query.department == null && query.team == null)
            await axios.get(`${URLS.baseURL}/company/employees`,userState.Auth)
            .then((result) => {
                setEmployees(result.data)
            }).catch((err) => {
                xhrError(err)
            });
            else
            await axios.post(`${URLS.baseURL}/employees/filter`,query,userState.Auth)
            .then((result) => {
                setEmployees(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[query])

    const EmpPage = {
        rowsPerPageText: 'Employees per page',
        rangeSeparatorText: 'Employees',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Employees',
      }
    const [show,setShow] = useState(false)
    const [currentDetail,setDetail] = useState(null)
    const ViewDetail= async (row)=>{

        
            await axios.get(`${URLS.baseURL}/employees/profile?id=${row?.profileId}`,userState.Auth)
            .then((result) => {
                setDetail(result.data)
                setShow(true)                
            }).catch((err) => {
                xhrError(err)
            });
        

    }

    return (
    <>

    <Dialog open={show} size='xl' className='overflow-y-scroll h-[95%]'>
    <DialogHeader className='sticky top-0 z-50 rounded-md shadow-lg p-2 flex justify-between items-center bg-primary'>
            <Typography variant='h5' className='p-2 text-white'>Profile Detail - {currentDetail?.name}</Typography>
            <IconButton onClick={()=>setShow(false)} className='bg-white rounded-full border-none'>
                <XCircleIcon className='h-6 text-primary' />
            </IconButton>
        </DialogHeader>
        <ToastContainer/>

        <hr  className='border-2 border-primary'/>
        <DialogBody className='p-4 w-full'>
            <div className='grid grid-cols-5 gap-3'>
                <div>
                    <Card className='p-2 w-40 h-40 shadow-md'>
                        <img className='rounded-md' src={`${URLS.Avatar}/${currentDetail?.avatar}`} />
                    </Card>
                </div>
                <div className='space-y-1'>
                    <Typography variant='h3' className=' font-bold  border-primary pl-2'>{currentDetail?.name}</Typography>
                    <Typography className=' capitalize font-bold  border-primary pl-2'>{currentDetail?.sex}</Typography>
                </div>
                <div className='space-y-1 col-span-3'>
                    <Typography variant='h5' className=' font-bold  border-primary pl-2'>Current position</Typography>
                    <UserPositionDetail userId={currentDetail?.userId} />
                </div>
                
            </div>
            <Card className='grid grid-cols-3 shadow-lg gap-3 m-2 border-t-2 border-primary'>
            <div className='p-4'>
                    <Typography variant='h5' className='font-bold'>Contact</Typography>
                    <div className='px-2'>
                    <Typography>Phone: <br /> {currentDetail?.phoneNumber}/{currentDetail?.secondaryPhoneNumber}</Typography>
                    <Typography>Address: <br/> {currentDetail?.address}</Typography>
                                    </div>
                </div>
                <div className='p-4'>
                    <Typography variant='h5' className='font-bold'>Information</Typography>
                    <div className='px-2'>
                    <Typography>Birth Date: <br /> {currentDetail?.dateOfBirth}</Typography>
                    <Typography>Nationality: <br/> {currentDetail?.nationality}</Typography>
                    <Typography>ID Number: <br/> {currentDetail?.idNumber}</Typography>
                    </div>
                </div>
                <div className='p-4'>
                    <Typography variant='h5' className='font-bold'>Extra Information</Typography>
                    <div className='px-2'>
                    <Typography>ID Number: <br/> {currentDetail?.idNumber}</Typography>
                    <Typography>TIN Number: <br/> {currentDetail?.tinNumber}</Typography>
                    </div>
                </div>
            </Card>
            <Card className='grid grid-cols-3 shadow-lg gap-3 m-2 border-t-2 border-primary'>
            <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Bank information</Typography>
                    <Typography>Bank : {currentDetail?.BankAccount?.BankName}</Typography>
                    <Typography>Account type: : {currentDetail?.BankAccount?.BankAccountName}</Typography>
                    <Typography>Account Number : {currentDetail?.BankAccount?.AccountNumber}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Martial status</Typography>
                    <Typography>Status : {currentDetail?.martialStatus?.status}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Emergency contact</Typography>
                    <Typography>Full name : {currentDetail?.emergencyContact?.name}</Typography>
                    <Typography>Phone number : {currentDetail?.emergencyContact?.phoneNumber}</Typography>
                    <Typography>Email : {currentDetail?.emergencyContact?.email}</Typography>
                    <Typography>Association name : {currentDetail?.emergencyContact?.association}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Next of Keens</Typography>
                    <Typography>Full name : {currentDetail?.nextOfKeen?.name}</Typography>
                    <Typography>Phone number : {currentDetail?.nextOfKeen?.phoneNumber}</Typography>
                    <Typography>Email : {currentDetail?.nextOfKeen?.email}</Typography>
                    <Typography>Association name : {currentDetail?.nextOfKeen?.association}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Documents</Typography>
                    <Typography>Educational Document : 
                        <Typography className='text-blue-500' as="a" target='_blank' href={`${URLS.documents}${currentDetail?.educationalDocument}`}>
                        {currentDetail?.educationalDocument}
                        </Typography>
                        </Typography>
                    <Typography>Certification : {currentDetail?.certification}</Typography>
                </Card>
                <Card className='p-4'>
                    <Typography variant='h5' className='font-bold'>Work Experience</Typography>
                </Card>                
           </Card>
        </DialogBody>
        <hr  className='border-2 border-primary'/>
        <DialogFooter>
            <Button variant='text' onClick={()=>setShow(false)}>OK</Button>
        </DialogFooter>
    </Dialog>

    <Card className='mt-4'>
        <CardHeader className='p-2'>
            <div className='flex space-x-2 justify-center'>
            <div className='flex flex-col w-full'>
                        <label>Branch</label>
                        <select className="m-2 p-2 rounded-md" value={query.branch} onChange={(e)=>{
                            if(e.target.value == "All")
                            setQuery({...query,branch:null})
                            else
                            setQuery({...query,branch:e.target.value})
                            }}>
                            <option value={null}>All</option>
                            {branch.map(each=><option value={each.id} className="">{each.name}</option>)}
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Department</label>
                        <select className="m-2 p-2 rounded-md" value={query.department} onChange={(e)=>{
                            if(e.target.value == "All")
                            setQuery({...query,department:null})
                            else
                            setQuery({...query,department:e.target.value})}
                            }>
                        <option value={null}>All</option>
                            {department.map(each=><option value={each.id} className="">{each?.name}</option>)}
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Team</label>
                        <select value={query.team} onChange={(e)=>{
                            if(e.target.value == "All")
                            setQuery({...query,team:null})
                            else
                            setQuery({...query,team:e.target.value})
                            }} className="m-2 p-2 rounded-md">
                        <option value={null}>All</option>
                            {team.map(each=><option value={each.id} className="">{each?.name}</option>)}
                        </select>
                    </div>
            </div>
        </CardHeader>
        <CardBody>
            <Card>
            <DataTable
            data={employees}
            noDataComponent={<Typography>No employees</Typography>}
            columns={[
                {name:"Employee",selector:(row)=><UserAvatar user={row} />},
                {name:"Full Name",selector:(row)=> <UserFullName user={row} />},
                {name:"Position",selector:(row)=> <UserPosition user={row} />},
                {name:"",selector:(row)=> <Button onClick={()=>ViewDetail(row)} className='bg-primary'>View Detail</Button>}
            ]}
            pagination
            paginationComponentOptions={EmpPage}
            />
            </Card>
        </CardBody>
    </Card>
    </>)
}



const UserAvatar = ({user})=>{

    const [Profile,setProfile] = useState({})

    const userState = useSelector((state)=>state.userState)

    useEffect(()=>{
        (async()=>{
            await axios.get(`${URLS.baseURL}/employees/profile?id=${user?.profileId}`,userState.Auth)
            .then((result) => {
                setProfile(result.data)                
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[user])


    return (
        <div>
            <Avatar src={`${URLS.Avatar}/${Profile?.avatar}`} className='border-2 border-primary m-2' />
        </div>
    )
}


const UserFullName = ({user})=>{


    const [Profile,setProfile] = useState({})

    const userState = useSelector((state)=>state.userState)

    useEffect(()=>{
        (async()=>{
            await axios.get(`${URLS.baseURL}/employees/profile?id=${user?.profileId}`,userState.Auth)
            .then((result) => {
                setProfile(result.data)                
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[user])


    return (
        <div>
            <Typography>{Profile?.name}</Typography>
        </div>
    )
}


const UserPosition = ({user})=>{

    const userState = useSelector((state)=>state.userState)
    const [positionDetail,setPosition] = useState(null)

    useEffect(()=>{

        (async()=>{
            await axios.get(`${URLS.baseURL}/position/detail?id=${user.position}`,userState.Auth)
            .then((result) => {
                setPosition(result.data)
            }).catch((err) => {
                xhrError(err)
            });

        })()

    },[user])

    

    return (
        <>
            {positionDetail?.title}
        </>
    )

}


const UserPositionDetail = ({userId})=>{
    

    const [userPositionDetail,setPositionDetail] = useState(null)
    const [otherDetails,setDetails] = useState({})
    const [positions,setPositions] = useState([])
    const [update,setUpdate] = useState(false)
    const userState = useSelector((state)=>state.userState)

    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/positions/user`,userState.Auth)
            .then((result) => {
                setPositions(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[userState])

    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/position/user/detail?id=${userId}`,userState.Auth)
            .then((result) => {
                setPositionDetail(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[update])

    useEffect(()=>{
        (async ()=>{

            let newValue = {} 

            await axios.get(`${URLS.baseURL}/branch/detail?id=${userPositionDetail?.branch}`,userState.Auth)
            .then((result) => {
                setDetails({...otherDetails,branch:result.data})
                newValue.branch = result.data
            }).catch((err) => {
                xhrError(err)
            });

            await axios.get(`${URLS.baseURL}/department/detail?id=${userPositionDetail?.department}`,userState.Auth)
            .then((result) => {
               // setDetails({...otherDetails,department:result.data})
               newValue.department = result.data
            }).catch((err) => {
                xhrError(err)
            });

            await axios.get(`${URLS.baseURL}/team/detail?id=${userPositionDetail?.team}`,userState.Auth)
            .then((result) => {
                newValue.team = result.data
            }).catch((err) => {
                xhrError(err)
            });

            setDetails(newValue)
        })()
    },[userPositionDetail,update])

    const [updateValue,setUpdateValue] = useState(userPositionDetail?.id)

    useEffect(()=>{

        setUpdateValue(userPositionDetail?.id)

    },[userPositionDetail])




    
    return <Card className='grid grid-cols-2 gap-2'>
    <Card className='px-4 p-5'>
    <Typography>Branch:<strong className='font-extrabold px-4'>{otherDetails.branch?.name}</strong></Typography>
    <Typography>Department: <strong className='font-extrabold'>{otherDetails.department?.name}</strong></Typography>
    <Typography>Team:<strong className='font-extrabold px-4'>{otherDetails.team?.name}</strong></Typography>
    <Typography>Position: <strong className='font-extrabold px-4'>{userPositionDetail?.title}</strong></Typography>
    </Card>
    <Card className='px-4 p-2'>
        <div className='p-2'>
            <label>Update Position</label>
            <select value={updateValue} onChange={(e)=>setUpdateValue(e.target.value)} className='w-full rounded-md p-2 shadow-sm'>
                {positions.map(each=><option value={each.id}>{each.title}</option>)}
            </select>
            <Button onClick={async (e)=>{
                if(updateValue != userPositionDetail?.id)
                {
                    e.target.disabled = true;
                    e.target.innerText = "............"
                    await axios.put(`${URLS.baseURL}/position/update?id=${userId}`,{position:updateValue},userState.Auth)
                    .then((result) => {
                        setUpdate(!update)
                        e.target.disabled = false;
                        e.target.innerText = "Update"
                        toast.success("Position updated!")                            
                    }).catch((err) => {
                        e.target.disabled = false;
                        e.target.innerText = "Update"
                        xhrError(err)
                        
                    });
                }

            }} className='m-2 bg-primary'>Update</Button>
        </div>
    </Card>
    </Card>
}


export default Employees