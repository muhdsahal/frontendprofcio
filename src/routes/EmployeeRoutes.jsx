import React from "react";
import EmployeeHome from "../pages/employee/EmployeeHome";
import { Route,Routes } from "react-router-dom";
import EmployeeProtected from "./ProtectedRoutes/EmployeeProtected";
import EmployeeSignupPage from "../pages/signup/EmployeeSignupPage";
import EmployeeLoginPage from "../pages/login/EmployeeLoginPage";
import EmployeeProfilePage from "../pages/employee/EmployeeProfilePage";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ForgotPassword from "../pages/ForgotPassWord";
import ResetPassword from "../pages/ResetPassword";
import BookingListPage from "../pages/employee/BookingListPage";
import ChatPageEmployee from "../pages/employee/ChatPageEmployee";
import CustomerPage from "../pages/employee/CustomerPage";
// import SalesReport from "../components/empolyee/SalesReport";
import SalesReportPage from "../pages/employee/SalesReportPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

function EmployeeRoutes(){
    return(
        <Routes>
            
            <Route exact element={<PrivateRoute />}>
                <Route path="/employee_signup" element={<EmployeeSignupPage />} />
                <Route path="/employee_login" element={<EmployeeLoginPage />} />
                <Route path="/password_reset/" element={<ForgotPassword />} />
                <Route path="/reset_password/:uid/:token" element={<ResetPassword />} />

            </Route>

            

            <Route exact element={<EmployeeProtected />}>
                <Route path="/" element={<EmployeeHome />} />
                <Route path="/profile" element={<EmployeeProfilePage />} />
                <Route path="/booking_list" element={<BookingListPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/chat" element={<ChatPageEmployee />} />
                <Route path="/sales_report" element={<SalesReportPage />} />
            </Route>
            <Route element={<ErrorPage />} path='/*' />
        </Routes>
    )
}
export default EmployeeRoutes;