import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'
import React from 'react'
import DataTable from 'react-data-table-component'

export const Projects = () => {
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

                            <div className='flex flex-col space-y-2'>
                                <label> Assign employee</label>
                                <Button className='bg-orange-500'>
                                    Assign
                                    </Button>
                                    <Card className='sticky top-[60%]'>
                                        <CardBody>
                                            
                                        </CardBody>
                                    </Card>
                            </div>
                            
                            <div className='col-span-2 space-y-3'>
                                <label> Project Deliverable</label>
                                <textarea
                                placeholder='Project - Deliverable'
                                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                />
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




