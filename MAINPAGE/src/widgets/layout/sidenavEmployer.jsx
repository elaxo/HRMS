import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EmployeeHome from "@/pages/dashboard/EmployeeHome";
import EmployeeProfile from "@/pages/dashboard/employeeProfile";
import { BanknotesIcon, BuildingOffice2Icon, ChevronDoubleLeftIcon, CircleStackIcon, HomeIcon, ScaleIcon, TagIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import EmployerHome from "@/pages/employeer/Employeer";
import Departments from "@/pages/employeer/Departments";


const icon = {
  className: "w-5 h-5 text-inherit",
};



export function SidenavEmpr({ brandImg, brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [teamPos,setTeampos] = useState("....")
  const userState = useSelector((state)=>state.userState)
  useEffect(()=>{

    let tempos = localStorage.getItem('temapos')
    setTeampos(tempos)

  },[])
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };


  
  const routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/empr/home",
          element: <EmployerHome />,
        },
        {
          icon: <BuildingOffice2Icon {...icon} />,
          name: "Branches",
          path: "/empr/branches",
          element: <EmployeeProfile />,
        },
        {
          icon: <ScaleIcon {...icon} />,
          name: "Departments",
          path: "/empr/departments",
          element: <Departments/>,
        },{
          icon: <UserGroupIcon {...icon} />,
          name: teamPos == null?"Teams":teamPos,
          path: "/empr/teams",
          element: <Departments/>,
        },
        {
          icon: <CircleStackIcon {...icon} />,
          name: "Employees",
          path: "/empr/employees",
          element: <EmployeeProfile />,
        },
        {
          icon: <TagIcon {...icon} />,
          name: "Requests",
          path: "/empr/requests",
          element: <EmployeeProfile />,
        },
        {
          icon: <BanknotesIcon {...icon} />,
          name: "Projects",
          path: "/empr/project",
          element: <EmployeeProfile />,
        },
      ],
    }
  ];
  
  return (
    <aside
      className={`${sidenavTypes[2]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } bg-primary text-white fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 `}
    >
      <div
        className={`relative h-48`}
      >
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h4"
            color={sidenavType === "dark" ? "white" : "white"}
          >
            {userState.company?.companyName}
          </Typography>
        </Link>
        <Typography className="text-center">{userState.userDetail.firstName}</Typography>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4 border-2 border-white rounded-md p-4 h-[60%]">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="h4"
                  
                  className="font-bold uppercase"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "filled" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "white"
                      }
                      className={(isActive?" bg-white text-primary ":" ")+"  flex items-center gap-4 px-4 capitalize"}
                      fullWidth
                    >
                      {icon}
                      <Typography
                        className="font-extrabold capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <Typography className="text-center">
          2024 Inpower HR
        </Typography>

    </aside>
  );
}

SidenavEmpr.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

SidenavEmpr.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SidenavEmpr.displayName = "/src/widgets/layout/sidenavEmployer.jsx";

export default SidenavEmpr;
