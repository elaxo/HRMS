import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import ChoseUserType from "./pages/choseUserType";
import EmployeeHome from "./pages/dashboard/EmployeeHome";
import EmployeeProfile from "./pages/dashboard/employeeProfile";
import EmployerHome from "./pages/employeer/Employeer";
import Departments from "./pages/employeer/Departments";
import Teams from "./pages/employeer/Teams";
import Employees from "./pages/employeer/Employees";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
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
        icon: <UserGroupIcon {...icon} />,
        name: "Departments",
        path: "/empr/departments",
        element: <Departments />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Departments",
        path: "/empr/teams",
        element: <Teams />,
      },
      {
        icon: <CircleStackIcon {...icon} />,
        name: "Employees",
        path: "/empr/employees",
        element: <Employees />,
      },
      {
        icon:<RectangleStackIcon {...icon}/>,
        name:"userType",
        path:"/user/type",
        element:<ChoseUserType/>
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/empr/home",
        element: <EmployerHome />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/emp/profile",
        element: <EmployeeProfile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
