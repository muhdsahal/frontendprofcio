import React from "react";
import UserProfile from "../../components/Home/UserProfile";
import Navbar from '../../pages/Navbar&Footer/Navbar'
import FooterPage from '../../pages/Navbar&Footer/FooterPage'
function UserProfilePage(){
    return(
        <div className="overflow-hidden">
            <Navbar />
            <UserProfile />
            <FooterPage />
        </div>
    )
}
export default UserProfilePage;