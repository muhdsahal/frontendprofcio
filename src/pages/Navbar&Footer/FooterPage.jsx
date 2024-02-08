import React from "react";
import ProfcioFooter from "../../components/Navbar&Footer/Footer";
import { LinearProgress } from "@mui/material";

function FooterPage() {
    return (
        <div>
            <LinearProgress
                variant="determinate"
                value={100}  
            />            
            <ProfcioFooter />
        </div>
    )
}
export default FooterPage