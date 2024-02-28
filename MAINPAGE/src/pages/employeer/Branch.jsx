import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { Button, Card,CardBody, CardHeader, Input, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Branch = () => {
    const [branchName,setBranchName] = useState("")
    const [branches,setBranchs] = useState([])
    const [update,setUpdate] = useState(false)

    const userState = useSelector((state)=>state.userState)
    useEffect(()=>{
        (async ()=>{
            await axios.get(`${URLS.baseURL}/branches/user`,userState.Auth)
            .then((result) => {
                setBranchs(result.data)
            }).catch((err) => {
                xhrError(err)
            });
        })()
    },[update])


    const PageOption = {
        rowsPerPageText: 'Branch per page',
        rangeSeparatorText: 'Branches',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Branches',
      }

      const CREATE = async (e)=>{

        if(branchName != "")
        {
            e.target.disabled = true;
            e.target.innerText = "............."
            await axios.post(`${URLS.baseURL}/branch/create`,{branchName:branchName},userState.Auth)
            .then((result) => {
                let oldData = [...branches]
                oldData.push(result.data)
                setBranchs(oldData)
                e.target.disabled = false;
                e.target.innerText = "Create"    
            }).catch((err) => {
                xhrError(err)
                e.target.disabled = false;
                e.target.innerText = "Create"

            });
        }


      }

  return (
    <div className='p-5'>
        <Card>
            <CardBody>

                <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-2'>
                    <Card>
                        <CardHeader className='p-4'>
                            <Typography variant='h5' className='text-primary'>
                                Company Branches
                            </Typography>
                            </CardHeader>
                            <CardBody>
                                <div className='p-4 px-5'>
                                    <label>Create Branch</label>
                                    <br /><br />
                                    <Input
                                    label='Branch name'
                                    value={branchName}
                                    onChange={(e)=>setBranchName(e.target.value)}
                                    />
                                    <br />
                                    <Button onClick={CREATE} className='bg-primary'>
                                        Create
                                    </Button>
                                </div>
                            </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='p-4'>
                            <Typography>Branches</Typography>
                        </CardHeader>
                        <CardBody>
                            <DataTable 
                            data={branches}
                            columns={[
                                {name:<strong className='font-extrabold text-primary'>Branch name</strong>,selector:(row)=>row.name}
                            ]}
                            noDataComponent={<Typography>No Branches found</Typography>}
                            pagination
                            paginationComponentOptions={PageOption}
                            expandableRows
                            expandableRowsComponentProps={{reload:[update,setUpdate]}}
                            expandableRowsComponent={({data,reload})=>{

                                const [branchName,setBranchName] = useState()
                                const [update,setUpdate] =  reload 
                                useEffect(()=>{
                                    setBranchName(data.name)

                                },[data])
                                return (<>
                                <Card className='m-2 border-2 border-primary'>
                                    <CardBody>
                                        <div className='flex space-x-2'>
                                            <Input value={branchName} onChange={(e)=>setBranchName(e.target.value)} /> 
                                            <Button className='bg-primary'onClick={async ()=>{
                                                await axios.put(`${URLS.baseURL}/branch/update?id=${data.id}`,{branchName:branchName},userState.Auth)
                                            .then((result) => {
                                                setUpdate(!update)
                                                toast.success(result.data.msg)
                                            }).catch((err) => {
                                                xhrError(err)
                                            });
                                            }} >Update</Button>
                                            <Button className='bg-orange-900' onClick={async ()=>{
                                                if(confirm(`Are you sure you went to delete ${data.name} branch?`))
                                                {
                                                    await axios.delete(`${URLS.baseURL}/branch/delete?id=${data.id}`,userState.Auth)
                                                    .then((result) => {
                                                        setUpdate(!update)
                                                    }).catch((err) => {
                                                        xhrError(err)
                                                    });
                                                }
                                                else
                                                {

                                                }
                                            }}>Delete</Button>
                                            
                                        </div>
                                    </CardBody>
                                </Card>
                                </>)
                            }}
                            />
                        </CardBody>
                    </Card>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default Branch