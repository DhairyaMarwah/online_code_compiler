import React, { useEffect } from "react";
import { Routes, Route,Navigate, useNavigate } from "react-router-dom"; 
 
import Home from "../pages/Home"; 

import Compiler from "../pages/Compiler"; 
import About from "../pages/About";
const routes = [
  {
    path: "/",
    exact: true,
    element : <Home />,
    private : false,
  },
  {
    path: "/compiler",
    exact: true,
    element : <Compiler />,
    private : false,
  },
  
  {
    path: "/about",
    exact: true,
    element : <About />,
    private : false,
  },
  

]


export default function Navigation() {
 
 
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route 
          key={index} 
          path={route.path} 
          element={
           route.element
          } />
      ))}
     
    </Routes>
  );
}
