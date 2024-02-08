import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import AdminHome from '../../pages/admin/AdminHome';

function EmployeeProtected(){
    
    const token =localStorage.getItem('token');
    const navigate = useNavigate()
    useEffect(() => {
        if(!token){
            navigate("/employee_login/")
        }
    }, [token])

    if(token){
        const decoded = jwtDecode(token);
        if(decoded.user_type === 'user'){
            return <Home />
        }else if(decoded.user_type === 'employee'){
            return <Outlet/>
        }else if(decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminHome />
        }
    }else{
        navigate("/employee_login/")
    }
       
}
export default EmployeeProtected;