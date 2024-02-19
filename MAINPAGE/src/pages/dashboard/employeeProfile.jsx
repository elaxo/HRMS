import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  EyeIcon,
  PhoneArrowDownLeftIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { URLS } from "@/configs/URLS";

export function EmployeeProfile() {

  const userState = useSelector((state)=>state.userState)
  const [Profile,setProfile] = useState({})
  useEffect(()=>{

    if(userState.profile != null)
    setProfile(userState.profile)

  },[userState.profile])

  return (
    <>
      <div className="relative mt-8 h-24 w-full overflow-hidden rounded-xl bg-cover	bg-center">

        <div className="absolute inset-0 h-full w-full bg-primary" >
          <Typography className="text-white m-4" variant="h4"></Typography>
          </div>
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={URLS.Avatar+Profile?.avatar}
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {Profile.name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  You are not currently employed by any company.
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <EyeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    View
                  </Tab>
                  <Tab value="message">
                    <PencilIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Update
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-2 px-4 lg:grid-cols-4 xl:grid-cols-4">
            <ProfileInfoCard
              title="Profile Information"
              description=""
              details={{
                "Full name": Profile?.name,
                mobile: Profile?.phoneNumber+" /"+Profile?.secondaryPhoneNumber,
                email: userState.userDetail?.email,
                location: Profile.address,
                Sex:Profile?.sex,
                Nationality:Profile?.nationality,
                "Birth Date":Profile?.dateOfBirth,
                "ID Number":Profile?.idNumber,
                "TIN Number":Profile?.tinNumber
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />


<div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Additional Information
              </Typography>
              <div className="flex flex-col gap-6">

              <div>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      Bank Information
                    </Typography>
                    <div className="flex flex-col gap-4">
                    <label className="text-sm font-normal text-blue-gray-500">
                         Bank Name : &nbsp;<b>{Profile?.BankAccount?.BankName}</b>
                        </label>
                        <label className="text-sm font-normal text-blue-gray-500">
                         Account type : &nbsp;<b>{Profile?.BankAccount?.BankAccountName}</b>
                        </label>
                        <label className="text-sm font-normal text-blue-gray-500">
                         Account Number : &nbsp;<b>{Profile?.BankAccount?.AccountNumber}</b>
                        </label>
                    </div>
                  </div>

                  <div>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      Marriage
                    </Typography>
                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-normal text-blue-gray-500">
                         <b>{Profile?.martialStatus?.status}</b>
                        </label>
                        {Profile?.martialStatus?.status != "single"?
                        <>
                        <label className="text-sm font-normal text-blue-gray-500">
                         Full name : &nbsp;<b>{Profile?.martialStatus?.fullName}</b>
                        </label>
                        <label className="text-sm font-normal text-blue-gray-500">
                         Number of children : &nbsp;<b>{Profile?.martialStatus?.fullName}</b>
                        </label>
                        </>
                        :<></>}
                    </div>
                  </div>

                  <div>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      Emergency Contact
                    </Typography>
                    <div className="flex flex-col gap-4">
                    <label className="text-sm font-normal text-blue-gray-500">
                        Name : <b>{Profile?.emergencyContact?.name}</b>
                        </label>

                        <label className="text-sm font-normal text-blue-gray-500">
                        Email : <b>{Profile?.emergencyContact?.email}</b>
                        </label>
                        
                        <label className="text-sm font-normal text-blue-gray-500">
                        Association : <b>{Profile?.emergencyContact?.association}</b>
                        </label>
                        
                        <label className="text-sm font-normal text-blue-gray-500">
                        Phone Number : <b>
                          {Profile?.emergencyContact?.phoneNumber} / 
                          {Profile?.emergencyContact?.secondaryPhoneNumber}
                          </b>
                        </label>
                        

                    </div>
                  </div>
                  

              </div>
            </div>




            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
              Essential information
              </Typography>
              <Typography className="font-bold">Next Of Keen</Typography>
              <div className="px-4">
              <Typography>Full Name : <b>{Profile?.nextOfKeen?.name}</b></Typography>  
              <Typography>Association : <b>{Profile?.nextOfKeen?.association}</b></Typography>  
              <Typography>Phone : <b>{Profile.nextOfKeen?.phoneNumber} / {Profile?.nextOfKeen?.secondPhoneNumber}</b></Typography>  
              <Typography>Email : <b>{Profile.nextOfKeen?.email}</b></Typography>  
              
              <Typography as="a" href="/" variant="h6" color="blue-gray" className="flex items-center">
              <DocumentTextIcon className="h-5" /> Educational document
              </Typography>
              </div>
              </div>

              <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
              Work experience
              </Typography>
              {
                Profile?.workExperience?.map((each)=>{

                })
              }
     
              </div>


          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Architects design houses
            </Typography>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default EmployeeProfile;
