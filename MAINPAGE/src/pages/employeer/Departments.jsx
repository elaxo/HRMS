
import { xhrError } from '@/configs/ERRORS'
import { URLS } from '@/configs/URLS'
import { EyeIcon, FilmIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Departments = () => {



const userState = useSelector((state)=>state.userState)
const [branches,setBranches] = useState([])
const [myDepartments,setMyDepartmenst] = useState([])
const [department,setDepartment] = useState({
  name:"",
  branch:null,
  productAndService:"",
  isBranch:false
})
const [loading,setLoading] = useState(false)
const [reload,setReload] = useState(false)

useEffect(()=>{
(async ()=>{

  await axios.get(`${URLS.baseURL}/departments/user`,userState.Auth)
  .then((result) => {
    setMyDepartmenst(result.data)
  }).catch((err) => {
    xhrError(err)
  });
  
  if(userState.company?.isBranch)
  await axios.get(`${URLS.baseURL}/branches/user`,userState.Auth)
  .then((result) => {
setDepartment({...department,isBranch:true})
   setBranches(result.data)
  }).catch((err) => {
    xhrError(err)
  });

})()
},[userState.company,reload])



const CREATE = async ()=>{
  if(department.name == "" || (department.isBranch == true && department.branch == null?true:false) || department.productAndService == "")
  toast.warning("Fill all required inputs properly!",{position:"top-center"})
  else 
  {
    setLoading(true)
    await axios.post(`${URLS.baseURL}/department/create`,department,userState.Auth)
    .then((result) => {
      setLoading(false)
      setDepartment({
        name:"",
        branch:null,
        productAndService:"",
        isBranch:false
      })
      setMyDepartmenst([...myDepartments,result.data])
    }).catch((err) => {
      setLoading(false)
      xhrError(err)
    });
  }




}



const DepPage = {
  rowsPerPageText: 'Department per page',
  rangeSeparatorText: 'Departments',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Departments',
  defaultRowsPerPage:10
};

  return (
    <>
    <br />
    <Card className='m-4'>
      <CardHeader className='p-4'>
        <Typography>Create Departments for your company</Typography>
      </CardHeader>
      <CardBody>
        <div className='grid grid-cols-3 gap-3'>
        <Card>
          <CardBody>
          <div className='space-y-2'>
              <label>Department Name</label>
              <Input onChange={e=>setDepartment({...department,name:e.target.value})} value={department.name} type='text' placeholder='Department Name' />
            </div>
            <br />
            {userState.company?.isBranch? 
            <div className='space-y-2'>
              <label>Branch</label>
              <div>
              <select className='p-4 m-2 w-full rounded-md border-none' value={department.branch} onChange={e=>{setDepartment({...department,branch:parseInt(e.target.value)})}}>
                <option className="p-2" value={null}>
                  <Typography>                  
                    Chose Branch
                  </Typography>
                  </option>
                {branches.map((each)=><option value={each?.id}>
                  {each?.name}
                </option>)}
              </select>
              </div>
              <label className='italic text-center'>
              To add a branch, please visit the <Link className='text-blue-400' to="/empr/branches">Branches page.</Link>
              </label>
            </div>
            :<></>}
            <br />
            <div className='space-y-2'>
            <label>Product and service of the department</label>
              <div className='h-52'>
              <Textarea className="h-full" value={department.productAndService} onChange={e=>setDepartment({...department,productAndService:e.target.value})} rows={2} />
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button disabled={loading} onClick={CREATE} className='bg-primary'>
              {loading?".................":"Create Department"}
            </Button>
          </CardFooter>
        </Card>
        <Card className='col-span-2'>
          <CardBody>
          <DataTable 
            data={myDepartments} 
            columns={[
                {name:"Department",selector:row=>row.name},
                {name:"Branch",selector:row=><BranchName id={row.branch} />}
              ]}
              pagination
              paginationComponentOptions={DepPage}
            expandableRows 
            expandableRowsComponentProps={{update:[reload,setReload]}}
            expandableRowsComponent={({data,update})=>{
             
              const [branchDetail,setBranch] = useState(null)
              const [reload,setReload] = update
              const [updates,setUpdates] = useState({
                name:data?.name,
                productService:data?.productService

              })
              const userState = useSelector((state)=>state.userState)
              const [loading,setLoading] = useState(false)
              const [teams,setTeams] = useState([])
              const TeamPage = {
                rowsPerPageText: 'Teams per page',
                rangeSeparatorText: 'Teams',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Teams',
                rowsPerPageOptions: [5, 10],
                defaultRowsPerPage:5
              };
              useEffect(()=>{
                (async ()=>{
                  await axios.get(`${URLS.baseURL}/teams/department?id=${data.id}`,userState.Auth)
                  .then((result) => {
                    setTeams(result.data)
                  }).catch((err) => {
                    xhrError(err)
                  });
                  await axios.get(`${URLS.baseURL}/branch/detail?id=${data.branch}`,userState.Auth)
                  .then((result) => {
                    console.log(result)
                    setBranch(result.data)
                  }).catch((err) => {
                    xhrError(err)
                  });
                })()
              },[])
             
             return <Card className='border-2 border-primary m-2'>
                <CardBody>
                  <Typography variant='h5'>{data.name} {data.isBranch && branchDetail?.name != undefined ? " department in "+branchDetail?.name+" branch":""} </Typography>
                  <hr className='border-2 border-primary m-2' />
                    <Card>
                      <CardBody className='grid grid-cols-3 gap-4'>
                        <div>

                        <div className='space-y-2'>
                            <label>Department name</label>
                            <hr className='border-1 border-primary m-2' />
                            <Input value={updates?.name} onChange={e=>setUpdates({...updates,name:e.target.value})} />
                        </div>
                        <br />
                        <div>
                            <label>Department Description</label>
                            <hr className='border-1 border-primary m-2' />
                           <div className='h-48'>
                           <Textarea className='h-full' value={updates?.productService} onChange={e=>setUpdates({...updates,productService:e.target.value})} />
                           </div>
                        </div>
                        <Button onClick={async ()=>{
                          
                          if(updates.name != "" || updates.productService.length <2)
                          {
                            setLoading(true)
                            await axios.put(`${URLS.baseURL}/department/update?id=${data.id}`,updates,userState.Auth)
                          .then((result) => {
                            setLoading(false)
                            setReload(!reload)
                          }).catch((err) => {
                            setLoading(false)
                            xhrError(err)
                          });
                          }
                          else 
                          toast.warning("Please enter valid information")
                        }} className='bg-primary m-2' disabled={loading}>{loading?"........":"Update Department"}</Button>
                        </div>
                        <Card className='col-span-2 px-2 border-2 border-primary'>
                          <CardBody>
                          <Typography className='font-bold text-primary'>Teams of department</Typography>
                         
                         
                          <DataTable 
                         data={teams}
                         pagination
                         paginationPerPage={TeamPage.defaultRowsPerPage}
                         paginationRowsPerPageOptions={TeamPage.rowsPerPageOptions}
                         paginationComponentOptions={TeamPage}
                         columns={[{name:"Team Name",selector:row=>row.name}]} 
                          noDataComponent={<Typography>No teams found in this department</Typography>} />
                         
                         
                          <Link to="/dashboard/empr/teams">
                            <Typography className='font-bold text-primary underline m-3'>Add teams to {data.name} department</Typography>
                          </Link>
                          </CardBody>
                        </Card>
                      </CardBody>
                    </Card>


                </CardBody>
              </Card>
            }}
            noDataComponent={<Typography>No Departments found
                          <label className='italic text-center'>
                            To add a team <Link className='text-blue-400' to="/empr/teams">Teams page</Link>
                            </label>

            </Typography>}
            />
          </CardBody>
        </Card>
        </div>

      </CardBody>
    </Card>
    </>
  )
}


const BranchName = ({id})=>{

  const [name,setName] = useState("....")
  const userState = useSelector((state)=>state.userState)

  useEffect(()=>{
    (async ()=>{
      await axios.get(`${URLS.baseURL}/branch/detail?id=${id}`,userState.Auth)
      .then((result) => {
        setName(result.data.name)
      }).catch((err) => {
        xhrError(err)
      });
    })()
  },[])

  return <Typography>{name}</Typography>


}



export default Departments