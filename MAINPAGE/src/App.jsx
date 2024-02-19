import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startState } from "./hooks/userState";
import AllRoutes from "./AllRoutes";

function App() {


  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(startState())

  },[])

  return (<>
<AllRoutes />
</>
    );
}

export default App;
