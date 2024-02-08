import React from "react";
import EmployeeList from "../../components/Home/EmployeeList";
import Navbar from "../Navbar&Footer/Navbar";
import ProfcioFooter from "../Navbar&Footer/FooterPage"

function EmployeeListUser (){
    return(
        <div>
            <Navbar />
            <EmployeeList className="flex flex-wrap gap-14"/>
            <ProfcioFooter />
        </div>
    )
}
export default EmployeeListUser