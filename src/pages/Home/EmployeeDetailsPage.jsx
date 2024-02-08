import React from "react";
import EmployeeDetails from "../../components/Home/EmployeeDetails";
import Navbar from "../Navbar&Footer/Navbar";
import ProfcioFooter from "../Navbar&Footer/FooterPage"
function EmployeeDetailsPage (){
    return (
        <div>
            <Navbar />
            <EmployeeDetails />
            <ProfcioFooter />
        </div>
        
    )
}
export default EmployeeDetailsPage;