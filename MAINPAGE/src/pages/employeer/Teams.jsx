import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  

const Teams = () => {

    const [departments,setDepartments] = useState([])
    const userState = useSelector((state)=>state.userState)
    const [loading,setLoading] = useState(false)
    const [team,setTeam] = useState({
        name:"",
        description:"",
        department:null
    })
    const [teams,setTeams] = useState([])

    useEffect(()=>{
        (async()=>{
            
            await axios.get(`${URLS.baseURL}/departments/user`,userState.Auth)
            .then((result) => {
                setDepartments(result.data)
            }).catch((err) => {
                xhrError(err)
            });

            await axios.get(`${URLS.baseURL}/teams/user`,userState.Auth)
            .then((result) => {
                setTeams(result.data)
            }).catch((err) => {
                xhrError(err)
            });


        })()

    },[userState])

    const TeamsPage = {
        rowsPerPageText: 'Teams per page',
        rangeSeparatorText: 'Teams',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Teams',
      };
      

  return (
    <Card className='mt-6'>
        <div className="relative mt-8 h-24 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-primary" />
      </div>
      <CardHeader className='p-6'>
        <Typography>Create team for your company department</Typography>
      </CardHeader>
<Card className='p-4 px-6'>
    <div className='grid grid-cols-3'>
        <Card>
        <div className='p-2 space-y-4'>
            <label>Team name</label>
            <Input value={team.name} onChange={e=>setTeam({...team,name:e.target.value})} placeholder='Enter Team Name' />
        </div>
        <div className='p-2 space-y-4'>
            <label>Team Description</label>
            <Textarea value={team.description} onChange={e=>setTeam({...team,description:e.target.value})} placeholder='Enter Team Description' className='h-[40%]'/>
        </div>
        <br />
        <div className='p-2 space-y-4 px-4'>
        <label>
            Chose Department:
        </label>
        <select value={team.department} onChange={e=>setTeam({...team,department:isNaN(e.target.value)?null:parseInt(e.target.value)})} className='p-4 rounded-md w-full'>
            <option value={null}>Chose department:</option>
            {
              departments.map((each)=><option value={each.id}>{each.name}</option>)
            }
        </select>
        </div>
        


        <br />
        <Button className='bg-primary' disabled={loading} onClick={async  e=>{
            if(team.department == null || team.description == "" || team.name == "")
            toast.warning("Please enter all the required fields!")
            else 
            {
                setLoading(true)
                await axios.post(`${URLS.baseURL}/team/create`,team,userState.Auth)
                .then((result) => {
                    setLoading(false)
                    setTeams([...teams,result.data])
                }).catch((err) => {
                    setLoading(false)
                    xhrError(err)
                    
                });
            }
        }}>
            {loading?".............":"Create team"}
        </Button>
        <br /><br /><br />
        </Card>
        <Card className='border-2 border-primary m-2 col-span-2 p-4'>
            <DataTable
            columns={[
                {name:"Team Name",selector:row=>row.name},
                {name:"Department",selector:row=><DepartmentName id={row.department} />}
            ]}
            pagination
            paginationComponentOptions={TeamsPage}
            data={teams}
            noDataComponent={<Typography className='text-blue-400'>No team found</Typography>}
            expandableRows
            expandableRowsComponent={({data})=>{

                const [updates,setUpdates] = useState({
                    name:data?.name,
                    description:data?.description
                })
                const userState = useSelector((state)=>state.userState)
                const [loading,setLoading] = useState(false)
                const [position,setPosition] = useState({
                    title:"",
                    description:"",
                    responsibility: "",
                    salary:null,
                    team:data?.id
                })
                const [open, setOpen] = React.useState(false);
                const handleOpen = () => setOpen(!open);
                const [positions,setPositions] = useState([])

                useEffect(()=>{

                   (async ()=>{
                    await axios.get(`${URLS.baseURL}/positions/team?id=${data?.id}`,userState.Auth)
                    .then((result) => {
                        setPositions(result.data)
                        
                    }).catch((err) => {
                        console.log("Lol",err)
                        xhrError(err)
                    });
                   })()

                },[data])
               
                const PosPage = {
                    rowsPerPageText: 'Positions per page',
                    rangeSeparatorText: 'Positions',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Positions',
                  };

                return (<Card className='border-2 border-primary m-2'>
                    <CardBody className='grid grid-cols-3'>
                        <div>
                        <Typography variant='h6' className='font-bold'>Team {data.name}</Typography>
                        <hr className='border-1 border-primary m-2'/>
                        <div>
                        <Input value={updates.name} label='Name of team' onChange={e=>setUpdates({...updates,name:e.target.value})} placeholder='Enter Team Name' />
                        <div className='p-3 h-36'>

                        <Textarea className='h-full' label='Description' value={updates.description} onChange={e=>setUpdates({...updates,description:e.target.value})} />
                        </div>
                        <Button className='bg-primary'>
                            Update
                        </Button>
                        </div>
                        </div>
                        <Card className='col-span-2 m-2 border-2 border-primary'>
                            <CardHeader className='p-4'>
                                <Button onClick={handleOpen} className='bg-primary'>Create Position</Button>
                                <div>
                                <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Create position for team - {data.name}</DialogHeader>
        <DialogBody>
            <ToastContainer />
                <Card className='grid grid-cols-2 gap-4 p-4 border-2 border-primary'>
                    
                    <div className='space-y-4'>
                        <label>Position title</label>
                        <br />
                        <Input value={position.title} onChange={e=>setPosition({...position,title:e.target.value})} label='Title' />
                    </div>
                    <div>
                    <br />
                    </div>

                    <div className='space-y-2 h-36'>
                        <label>Description</label>
                        <br />
                        <Textarea value={position.description} onChange={e=>setPosition({...position,description:e.target.value})} className='h-full' label='Description' />
                    </div>

                    <div className='space-y-4 h-32'>
                        <label>Responsibilities</label>
                        <br />
                        <Textarea value={position.responsibility} onChange={e=>setPosition({...position,responsibility:e.target.value})} className='h-full' label='Responsibilities' />
                    </div>
                    <div><br /></div>                    <div><br /></div>
                    <div className='space-y-2'>
                        <label>Salary</label>
                        <Input value={position.salary} onChange={e=>setPosition({...position,salary:e.target.value})} label='Salary'  type='number'/>
                    </div>
                </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 border-primary"
          >
            Cancel
          </Button>
          <Button variant="filled" disabled={loading} className='bg-primary' onClick={async()=>{
            if(position.description == "" || position.responsibility == "" || position.salary == null || position.title == "")
            toast.error("Please enter required value")
            else 
            {
                setLoading(true)
                await axios.post(`${URLS.baseURL}/position/create`,position,userState.Auth)
                .then((result) => {
                    setLoading(false)
                    setPositions([...positions,result.data])
                    setOpen(false)
                }).catch((err) => {
                    setLoading(false)
                    xhrError(err)
                });
            }


          }}>
            <span>{loading?"..........":"Create"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <DataTable
                                pagination
                                paginationComponentOptions={PosPage}
                                 subHeaderAlign='left'
                                 subHeader
                                 subHeaderComponent={<Typography>Positions of team {data.name}</Typography>}
                                 data={positions}
                                  columns={[
                                    {name:"Position Name",selector:row=>row.title},
                                    {name:"Description",selector:row=>row.description},
                                ]}
                                expandableRows
                                expandableRowsComponent={({data})=>{


                                    const [updates,setUpdates] = useState(data)



                                    return <>
                                    <Card className='m-2 border-2 border-primary'>
                                        <CardBody>
                                            <Typography variant='h5' className='m-2'>Position {data?.title}</Typography>
                                            <hr className='border-2 m-2 border-primary' />
                                        <div className='space-y-2 px-4'>
                                                <label>Title</label>
                                                <Input value={updates?.title} onChange={e=>{
                                                    setUpdates({...updates,title:e.target.value})
                                                }} />
                                            </div>
                                            <div className='space-y-2 px-4'>
                                                <label>Description</label>
                                                <div className='h-28'>
                                                <Textarea className='h-full' value={updates?.description} onChange={e=>{
                                                    setUpdates({...updates,description:e.target.value})
                                                }} />
                                                </div>
                                            </div>
                                            <div className='space-y-2 px-4'>
                                                <label>Responsibility</label>
                                                <Textarea value={updates?.responsibility} onChange={e=>{
                                                    setUpdates({...updates,responsibility:e.target.value})
                                                }} />
                                            </div>
                                            <div className='space-y-2 px-4'>
                                                <label>Salary</label>
                                                <Input value={updates?.salary} onChange={e=>{
                                                    setUpdates({...updates,salary:e.target.value})
                                                }} />
                                            </div>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={async e=>{

                                                
                                            }} className='bg-primary'>Update</Button>
                                        </CardFooter>
                                    </Card>
                                    </>
                                }}
                                />
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>)
            }}
            />
        </Card>
    </div>
</Card>
    </Card>
  )
}




const DepartmentName = ({id})=>{


    const [name,setName] = useState("......")
    const userState = useSelector((state)=>state.userState)
    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/department/detail?id=${id}`,userState.Auth)
            .then((result) => {
                setName(result.data?.name)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[])

    return <Typography>{name}</Typography>
}

export default Teams