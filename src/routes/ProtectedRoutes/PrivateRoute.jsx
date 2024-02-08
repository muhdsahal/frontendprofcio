import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate,Outlet } from "react-router-dom";
import AdminHome from "../../pages/admin/AdminHome";
import EmployeeHome from "../../pages/employee/EmployeeHome";
import Home from "../../pages/Home/Home";

function PrivateRoute(){
    const token = localStorage.getItem("token")
    
    if(token){
        const decoded = jwtDecode(token);
        if(decoded.user_type === 'employee'){
            return <EmployeeHome/>
        }else if(decoded.user_type === 'user'){
            return <Home />
        }else if(decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminHome />
        }
    }else{
        return <Outlet />
    }
}
export default PrivateRoute