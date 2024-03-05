import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import userState from '@/hooks/userState'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Input, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'

export const Projects = () => {


    const userState = useSelector((state)=>state.userState)
    const [query,setQuery] = useState("")
    const [searchResult,setResult] = useState([])






  return (
    <div>
        <Card className='mt-6'>
            <CardHeader className='p-4 bg-primary'>
                <Typography variant='h5' className='text-white'>Projects </Typography>
            </CardHeader>
            <CardBody>
                <div className='grid grid-cols-2'>
                    <Card>
                    <CardBody className='grid grid-cols-2 gap-2'>
                            <div className='col-span-2 space-y-3'>
                                <label>Project - Name</label>
                                <Input placeholder='Project Name' />
                            </div>

                            <div className='flex flex-col col-span-2 space-y-3'>
                            <label>Project - Description</label>
                            <textarea
                            placeholder='Project - description'
                            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            />
                            </div>

                            <div>
                                <label>Project - Manager</label>
                                <Input placeholder='Project Manager' />
                            </div>

                            <div className='flex flex-col col-span-2 space-y-3'>
                            <label>Project - scop detail</label>
                            <textarea
                            placeholder='Project - scop detail'
                            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            />
                            </div>

                            <div>
                                <label>Project timeline - From</label>
                                <Input type='date' placeholder='Project Manager' />
                            </div>
                            <div>
                                <label> To</label>
                                <Input type='date' placeholder='Project Manager' />
                            </div>

                            <div className='flex flex-col col-span-2 space-y-3'>
                            <label>Project - Goals and objective</label>
                            <textarea
                            placeholder='Project - goals'
                            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            />
                            </div>

                            <div>
                                <label> Project budget</label>
                                <Input type='number' placeholder='Project Manager' />
                            </div>
                            <div className='col-span-2 space-y-3'>
                                <label> Project Deliverable</label>
                                <textarea
                                placeholder='Project - Deliverable'
                                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                />
                            </div>
                            <div className='col-span-2'>
                            <br />
                            </div>

                            <div className='flex col-span-2 flex-col space-y-2'>
                                    <Card className='m-2'>
                                        <CardHeader className='p-6'>
                                        <div className="relative flex w-full max-w-[24rem]">
                            <Input
                            value={query}
                            onChange={(e)=>setQuery(e.target.value)}
                                type="text"
                                label="Search employee"
                                className="pr-20"
                                containerProps={{
                                className: "min-w-0",
                                }}
                            />
                            <Button
                            onClick={async (e)=>{
                                e.target.disable = true 
                                await axios.get(`${URLS.baseURL}/search/employee?q=${query}`,userState.Auth)
                                .then((result) => {
                                    e.target.disable = false 
                                    setResult(result.data)
                                    console.log(result.data)
                                }).catch((err) => {
                                    e.target.disable = false 
                                    xhrError(err)
                                    
                                });

                            }}
                                size="sm"
                                className="!absolute right-1 top-1 rounded bg-primary"
                            >
                                Search
                            </Button>
                                </div>
                                        </CardHeader>
                                        <CardBody>

                                            <Card className="w-96">
                                            <List>
                                                <ListItem>
                                                <ListItemPrefix>
                                                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                                                </ListItemPrefix>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">
                                                    Tania Andrew
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                    Software Engineer @ Material Tailwind
                                                    </Typography>
                                                </div>
                                                <ListItemSuffix>
                                                    <IconButton className='bg-primary rounded-full'>
                                                        <PlusCircleIcon className='h-6' />
                                                    </IconButton>
                                                </ListItemSuffix>

                                                </ListItem>
                                            </List>
                                            <hr className='border-2 border-primary' />
                                            <Typography className='p-2 text-primary'>
                                                            Assigned employees
                                            </Typography>
                                            <List>
                                                <ListItem>
                                                <ListItemPrefix>
                                                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                                                </ListItemPrefix>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">
                                                    Tania Andrew
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                    Software Engineer @ Material Tailwind
                                                    </Typography>
                                                </div>
                                                </ListItem>
                                                <ListItem>
                                                <ListItemPrefix>
                                                    <Avatar variant="circular" alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg" />
                                                </ListItemPrefix>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">
                                                    Alexander
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                    Backend Developer @ Material Tailwind
                                                    </Typography>
                                                </div>
                                                </ListItem>
                                                <ListItem>
                                                <ListItemPrefix>
                                                    <Avatar variant="circular" alt="emma" src="https://docs.material-tailwind.com/img/face-3.jpg" />
                                                </ListItemPrefix>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">
                                                    Emma Willever
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                    UI/UX Designer @ Material Tailwind
                                                    </Typography>
                                                </div>
                                                </ListItem>
                                            </List>
                                            
                                            </Card>
                                        </CardBody>
                                    </Card>
                            </div>
                            
                    </CardBody>
                    <CardFooter className='p-4 border-t-2 border-primary'>
                        <Button className='bg-primary'>
                            Create Project
                        </Button>
                    </CardFooter>
                    </Card>
                    <Card className='p-4 border-2 border-primary'>
                        <DataTable noDataComponent={<Typography className='text-primary'>No Project Found</Typography>} />
                    </Card>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}




