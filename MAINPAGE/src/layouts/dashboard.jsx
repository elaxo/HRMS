import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SidenavEmployee } from "@/widgets/layout/sidenavEmployee";
import DashboardNavbarEmployee from "@/widgets/layout/dashboard-navbar-employee";
import axios from "axios";
import { URLS } from "@/configs/URLS";
import SidenavEmpr from "@/widgets/layout/sidenavEmployer";
import DashboardNavbarEmployer from "@/widgets/layout/dashboard-navbar-employeer";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const userState = useSelector((state)=>state.userState)



  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {userState?.userDetail?.role == 0?<>
      </>:
      userState?.userDetail?.role == 2?
      <SidenavEmployee
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
    :
    userState?.userDetail?.role == 111?<SidenavEmpr/>:<></>
    }
      <div className="p-4 xl:ml-80">
        { userState?.userDetail?.role == 0?<></>:
        userState.userDetail?.role == 2?
        <DashboardNavbarEmployee />:
        userState?.userDetail?.role == 111?
        <DashboardNavbarEmployer/>:
        <></>
      }
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
