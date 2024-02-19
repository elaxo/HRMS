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
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Home, Profile } from "@/pages/dashboard";
import EmployeeHome from "@/pages/dashboard/EmployeeHome";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import EmployeeProfile from "@/pages/dashboard/employeeProfile";

const icon = {
  className: "w-5 h-5 text-inherit",
};


const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/emp/home",
        element: <EmployeeHome />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/emp/profile",
        element: <EmployeeProfile />,
      },
    ],
  }
];

export function SidenavEmployee({ brandImg, brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };



  const userState = useSelector((state)=>state.userState)

  useEffect(()=>{

    console.log(userState)
  },[])

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 `}
    >
      <div
        className={`relative `}
      >
        <Link to="/dashboard/emp/home" className="py-6 px-8 text-primary text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "primary"}
            className="font-extrabold border-primary border-2 m-2 rounded-md"
          >
            {userState.userDetail.firstName+" - "+userState.userDetail.lastName}
          </Typography>
        </Link>
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
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  className="font-black uppercase opacity-75"
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
                      variant={isActive ? "" : "text"}
                      onClick={() => setOpenSidenav(dispatch, false)}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "primary"
                      }
                      className={(isActive?" bg-primary text-white ":" text-primary ")+" flex items-center gap-4 px-4 capitalize"}
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
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
    </aside>
  );
}

SidenavEmployee.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Inpowerhr Employee page",
};

SidenavEmployee.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SidenavEmployee.displayName = "/src/widgets/layout/sidnave.jsx";

export default SidenavEmployee;
