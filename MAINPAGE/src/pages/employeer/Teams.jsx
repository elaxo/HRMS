import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Input, Radio, Select, Textarea, Typography } from '@material-tailwind/react'
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
import { useNavigate } from 'react-router-dom'
  

const Teams = () => {

    const [departments,setDepartments] = useState([])
    const userState = useSelector((state)=>state.userState)
    const [allPositions,setPositions] = useState([])
    const [loading,setLoading] = useState(false)
    const location = useNavigate()
    const [team,setTeam] = useState({
        name:"",
        description:"",
        department:null
    })
    const [teams,setTeams] = useState([])
    const [teamPos,setTeampos] = useState(null)
    useEffect(()=>{
        let teampos = localStorage.getItem('temapos')
        setTeampos(teampos)
    },[location])

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

    useEffect(()=>{
            (async ()=>{
                await axios.get(`${URLS.baseURL}/positions/user`,userState.Auth)
                .then((result) => {
                    setPositions(result.data)
                }).catch((err) => {
                    xhrError(err)
                });
            })()
    },[])

    const TeamsPage = {
        rowsPerPageText: 'Teams per page',
        rangeSeparatorText: 'Teams',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Teams',
      };

      const [positionData,setPositionData] = useState({
        title:"",
        description:"",
        responsibility: "",
        salary:null,
        department:null,
        dayOff:[0],
        annualLeave:16,
        benefit:""
      })

    
      

  return (<>
    {
       teamPos == null? 
       <>
       <Card className=' border-primary'>
        <CardBody>
            <div className='pt-4'>
                <Card  className='border-2 border-primary'>
                    <CardBody className='p-3'>
                            <Typography variant='h5'>
                                Does your company have team in branch department?
                            </Typography>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup>
                        <Button onClick={()=>{
                            localStorage.setItem("temapos","Teams")
                            setTeampos("Teams")
                        }} className='bg-primary'>Yes</Button>
                        <Button  onClick={()=>{
                            localStorage.setItem("temapos","Position")
                            setTeampos("Position")
                        }}  className='bg-orange-900'>No</Button>
                        </ButtonGroup>
                    </CardFooter>

                </Card>

            </div>
        </CardBody>
       </Card>
       </>:
       teamPos == "Teams"?
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
            expandableRowsComponentProps={{Positions:[positionData,setPositionData]}}
            expandableRowsComponent={({data})=>{
                const [updates,setUpdates] = useState({
                    name:data?.name,
                    description:data?.description
                })
                const [positionData,setPositionData] = useState({
                    title:"",
                    description:"",
                    responsibility: "",
                    salary:null,
                    department:null,
                    dayOff:[0],
                    annualLeave:16,
                    benefit:"",
                    team:data.id
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
                                <Dialog open={open} className='h-full overflow-scroll' handler={handleOpen}>
        <DialogHeader>Create position for team - {data.name}</DialogHeader>
        <DialogBody>
            <ToastContainer />
                {/* <Card className='grid grid-cols-2 gap-4 p-4 border-2 border-primary'>
                    
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
                 */}

<Card>
            <div className='w-full'>
                <Card className='grid grid-cols-3 gap-3 border-2 border-primary p-4'>
                <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position title:</label>
                                      <Input 
                                        label='Position title'
                                        value={positionData.title}
                                        onChange={(e)=>{
                                            setPositionData({...positionData,title:e.target.value})
                                        }}
                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position Description:</label>
                                      <Textarea 
                                        label='Description'
                                        className='h-fit'
                                        value={positionData.description}
                                        onChange={(e)=>setPositionData({...positionData,description:e.target.value})}

                                      />
                                    </div>

                                    <div className='space-y-2 px-4 h-fit'>
                                      <label className='text-primary'>Position Responsibility:</label>
                                    <Textarea 
                                        label='Responsibility'
                                        className='h-full'
                                        value={positionData.responsibility}
                                        onChange={(e)=>setPositionData({...positionData,responsibility:e.target.value})}

                                      />
                                    </div> 
                                    <div></div><div></div><div></div>          
                                    <div></div><div></div><div></div>
                                   <div className='space-y-2 px-4 h-fit '>
                                      <label className='text-primary'>Position benefit:</label>
                                    <Textarea 
                                        label='Benefit'
                                        className='h-fit'
                                        value={positionData.benefit}
                                        onChange={(e)=>setPositionData({...positionData,benefit:e.target.value})}
                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position Salary:</label>
                                    <Input 
                                        label='Salary'
                                        type='number'
                                        value={positionData.salary}
                                        onChange={(e)=>setPositionData({...positionData,salary:e.target.value})}

                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                    </div>

                                    <div className='space-y-2 px-4 m-2'>
                                      <label className='text-primary'>Number of day off in week:</label>
                                    <Input 
                                        label='Day offs'
                                        type='number'
                                        value={positionData.dayOff.length}
                                        onChange={(e)=>{
                                            if(e.target.value < 7 && e.target.value > 1)
                                            for(let i = 0; i < e.target.value; i++)
                                            {
                                                let oldArray = [...positionData.dayOff]
                                                oldArray.push(i)
                                                setPositionData({...positionData,dayOff:oldArray})
                                            }
                                            else 
                                            {
                                                setPositionData({...positionData,dayOff:[0]})
                                            }
                                        }}
                                        min={1} 
                                        max={6}
                                      />
                                    </div>
                                    

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Annual Leave:</label>
                                    <Input 
                                        label='Annual Leave'
                                        type='number'
                                        min={16} 
                                        max={300}
                                        value={positionData.annualLeave}
                                        onChange={(e)=>setPositionData({...positionData,annualLeave:e.target.value})}
                                      />
                                    </div>
                                        <div></div>
                                    <div>
                                    {
                                   positionData.dayOff.map( (each,index)=><div className='space-y-2 px-4 rounded-md m-2'>
                                    <label className='text-primary'>Chose Day {positionData.dayOff.length>1?" in day of "+(index+1):"" }:</label>
                                    <div className='flex'>
                                    <Radio  onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 0
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Sunday" />
                                    
                                    <Radio                                    
                                    onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 1
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Monday" />
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 2
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Tuesday" />
                                    </div>
                                    <div>
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 3
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Wednesday" />
                                        
                                    </div>
                                    <div className='flex'>
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 4
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Thursday" />
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 5
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Friday" />
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 6
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Saturday" />
                                    </div>
                                    </div>)
                                    }
                                    </div>
</Card>
{/* <CardFooter className='space-y-2'>
    <hr className='border-2 border-primary' />
    <Button onClick={async (e)=>{

        if(positionData.title == "" || positionData.salary == null 
        || positionData.responsibility == "" ||
         positionData.description == "" || positionData.department == null || positionData.annualLeave == null)
         toast.warning("Please enter all the required inputs",{position:"top-center"})
        else 
        {
            e.target.disabled = true;
            e.target.innerText = "..............";
            await axios.post(`${URLS.baseURL}/position/create/department`,positionData,userState.Auth)
            .then((result) => {
                e.target.disabled = false;
                e.target.innerText = "Create";
                setPositions([...allPositions,result.data])                    
            }).catch((err) => {
                xhrError(err)
                e.target.disabled = false;
                e.target.innerText = "Create";
            });
        }
  
 
  
    }}   className='bg-primary'>Create</Button>
    </CardFooter>                                     */}

                                    

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
            if(positionData.description == "" || positionData.responsibility == "" || positionData.salary == null || positionData.title == "")
            toast.error("Please enter required value")
            else 
            {
                setLoading(true)
                await axios.post(`${URLS.baseURL}/position/create/team`,positionData,userState.Auth)
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
:<>
<Card>
<div className="relative mt-8 h-24 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-primary" />
      </div>
      <CardHeader className='p-6'>
        <Typography>Create Positions for your company department</Typography>
      </CardHeader>
    <CardBody>
        <Card>
            <div className='grid grid-cols-2'>
                <Card className='border-2 border-primary p-4'>
                <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position title:</label>
                                      <Input 
                                        label='Position title'
                                        value={positionData.title}
                                        onChange={(e)=>setPositionData({...positionData,title:e.target.value})}
                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position Description:</label>
                                      <Textarea 
                                        label='Description'
                                        className='h-fit'
                                        value={positionData.description}
                                        onChange={(e)=>setPositionData({...positionData,description:e.target.value})}

                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position Responsibility:</label>
                                    <Textarea 
                                        label='Responsibility'
                                        className='h-fit'
                                        value={positionData.responsibility}
                                        onChange={(e)=>setPositionData({...positionData,responsibility:e.target.value})}

                                      />
                                    </div> 
                                   <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position benefit:</label>
                                    <Textarea 
                                        label='Benefit'
                                        className='h-fit'
                                        value={positionData.benefit}
                                        onChange={(e)=>setPositionData({...positionData,benefit:e.target.value})}

                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position Salary:</label>
                                    <Input 
                                        label='Salary'
                                        type='number'
                                        value={positionData.salary}
                                        onChange={(e)=>setPositionData({...positionData,salary:e.target.value})}

                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Position Department:</label>
                                      <select value={positionData.department}                                        
                                       onChange={(e)=>setPositionData({...positionData,department:e.target.value})}
                                       className='w-full border-2 border-gray-500 rounded-md p-2'
                                       >
                                        <option value={null}>Chose department</option>
                                       {departments.map((each=><option value={each.id}>{each.name}</option>))}                                         
                                      </select>
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Number of day off in week:</label>
                                    <Input 
                                        label='Day offs'
                                        type='number'
                                        value={positionData.dayOff.length}
                                        onChange={(e)=>{
                                            if(e.target.value < 7 && e.target.value > 1)
                                            for(let i = 0; i < e.target.value; i++)
                                            {
                                                let oldArray = [...positionData.dayOff]
                                                oldArray.push(i)
                                                setPositionData({...positionData,dayOff:oldArray})
                                            }
                                            else 
                                            {
                                                setPositionData({...positionData,dayOff:[0]})
                                            }
                                        }}
                                        min={1} 
                                        max={6}
                                      />
                                    </div>

                                    <div className='space-y-2 px-4'>
                                      <label className='text-primary'>Annual Leave:</label>
                                    <Input 
                                        label='Annual Leave'
                                        type='number'
                                        min={16} 
                                        max={300}
                                        value={positionData.annualLeave}
                                        onChange={(e)=>setPositionData({...positionData,annualLeave:e.target.value})}

                                      />
                                    </div>


                                    {
                                   positionData.dayOff.map( (each,index)=><div className='space-y-2 px-4 border-2 border-gray-400 rounded-md m-2'>
                                    <label className='text-primary'>Chose Day {positionData.dayOff.length>1?" in day of "+(index+1):"" }:</label>
                                    <div className='flex'>
                                    <Radio  onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 0
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Sunday" />
                                    
                                    
                                    <Radio 
                                   
                                    onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 1
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Monday" />
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 2
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Tuesday" />
                                    </div>
                                    <div>
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 3
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Wednesday" />
                                        
                                    </div>
                                    <div className='flex'>
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 4
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Thursday" />
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 5
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Friday" />
                                    <Radio onClick={(e)=>{
                                        let oldArray = [...positionData.dayOff]
                                        oldArray[index] = 6
                                        setPositionData({...positionData,dayOff:oldArray}) 
                                    }} name={'dayOff'+index} label="Saturday" />
                                    </div>
                                    </div>)
                                    }

<CardFooter className='space-y-2'>
    <hr className='border-2 border-primary' />
    <Button onClick={async (e)=>{

        if(positionData.title == "" || positionData.salary == null 
        || positionData.responsibility == "" ||
         positionData.description == "" || positionData.department == null || positionData.annualLeave == null)
         toast.warning("Please enter all the required inputs",{position:"top-center"})
        else 
        {
            e.target.disabled = true;
            e.target.innerText = "..............";
            await axios.post(`${URLS.baseURL}/position/create/department`,positionData,userState.Auth)
            .then((result) => {
                e.target.disabled = false;
                e.target.innerText = "Create";
                setPositions([...allPositions,result.data])                    
            }).catch((err) => {
                xhrError(err)
                e.target.disabled = false;
                e.target.innerText = "Create";
            });
        }
  
 
  
    }}   className='bg-primary'>Create</Button>
    </CardFooter>                                    

                                    

                </Card>
                <Card>
                    <CardBody className='border-2 border-primary rounded-md m-2'>
                        <DataTable
                        data={allPositions}
                        columns={[
                            {name:<Typography className='font-bold text-primary'>Title</Typography>,selector:(row)=>row.title},
                            {name:<Typography className='font-bold text-primary'>Department</Typography>,selector:(row)=>row.department},
                        ]}
                        noDataComponent={<Typography>No position found</Typography>}
                        expandableRows
                        expandableRowsComponent={({data})=>{
                            return (<Card>
                                <CardBody>
                                    <ButtonGroup>
                                        <Button className='bg-primary'>Update</Button>
                                        <Button className='bg-orange-800'>Delete</Button>
                                    </ButtonGroup>
                                </CardBody>
                            </Card>)
                        }}
                        />
                    </CardBody>
                </Card>
            </div>
        </Card>
    </CardBody>
</Card>
</>    
}</>
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