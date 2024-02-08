// import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom'
import Home from '../../pages/Home/Home'
// import AdminHome from '../../pages/admin/AdminHome';
import EmployeeHome from '../../pages/employee/EmployeeHome';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';


function AdminProtected(){
    const token =localStorage.getItem('token');
    const navigate = useNavigate()
    useEffect(() => {
        if(!token){
            navigate("/admin_login")
        }
    }, [token])
    
    if(token){
        const decoded = jwtDecode(token);
        if (decoded.user_type === 'admin' && decoded.is_admin){
            return <Outlet />
        }else if(decoded.user_type === 'user'){
            return <Home />
        }else if(decoded.user_type === 'employee'){
            return <EmployeeHome />
        }
    }else{
        navigate("/admin_login")
    }

   
}
export default AdminProtected;