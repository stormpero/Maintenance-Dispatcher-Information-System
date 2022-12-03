import React from 'react';
import {Routes, Route} from "react-router-dom";
import {Requests} from "../pages/Requests";
import {NavbarContainer} from "../pages/Navbar";
import {Orders} from "../pages/Orders";
import {Clients} from "../pages/Clients";
import {Auto} from "../pages/Auto";
import {Workers} from "../pages/Workers";

const AppRouter = () => {
    return (
        <>
            <NavbarContainer/>
            <Routes>
               <Route path="/requests" element={<Requests/>}/>
               <Route path="/orders" element={<Orders/>}/>
               <Route path="/clients" element={<Clients/>}/>
               <Route path="/auto" element={<Auto/>}/>
               {/*<Route path="/workers" element={<Workers/>}/>*/}
            </Routes>
        </>
    );
};

export default AppRouter;

