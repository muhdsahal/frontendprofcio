import React from "react";
import BookingListUser from "../../components/Home/BookingList";
import FooterPage from "../Navbar&Footer/FooterPage";
import Navbar from "../Navbar&Footer/Navbar";

function BookingListPage (){
    return(
    <div>

        <Navbar />
        <BookingListUser />
        <FooterPage />
    </div>
    )
}
export default BookingListPage