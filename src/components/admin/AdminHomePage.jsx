import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { DashboardUrl } from "../../constants/constants";
import axios from "axios";
import Loader from "../Loading/Loading";
function AdminHomePage() {
    const [countOfUser, setCountOfUser] = useState([])
    const [bookingDetails, setBookingDetails] = useState([])
    const [total_prices, setTotal_prices] = useState('')
    const [manageState, setManageState] = useState(false)


    useEffect(() => {

        setManageState(false)
        axios.get(`${DashboardUrl}admin/usercount/`).then((response) => {
            const { users } = response.data
            // console.log(response.data, '++++++++++++++++++++++check user count');
            setCountOfUser(users);
        }).catch((error) => {
            console.error("An error occured during fetch data", error);
        })


        setManageState(false)
        axios.get(`${DashboardUrl}admin/booking_detials/`).then((response) => {
            const { data } = response.data

            // console.log(response.data, '===========================>>>>>>>>>>>>..booking daata');
            const { total_price } = data[4]
            data.pop()
            setTotal_prices(total_price)
            setBookingDetails(data)
        }).catch((error) => {
            console.error("An error occured during fetch data", error);
        })

    }, [manageState])


    // console.log(countOfUser, 'loggggggggggggggggggggggggg');
    // console.log(bookingDetails, 'loggggggggggggggggggggggggg9999999999');
    return (
        <div>
            <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">Admin Dashboard</h1>


            {countOfUser ? countOfUser.length > 0 ? (

                <div className="flex flex-wrap justify-between mb-5 mt-5 ml-5 gap-1">
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Total Users</Typography>
                            <Typography variant="h2">{countOfUser[0]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Employees</Typography>
                            <Typography variant="h2">{countOfUser[1]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Users</Typography>
                            <Typography variant="h2">{countOfUser[2]}</Typography>
                        </div>
                    </div>

                </div>
            ) : (
                <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">Loading ....    </h1>

            ) : ''}




            {bookingDetails ? bookingDetails.length > 0 ? (

                <div className="flex flex-wrap justify-between mb-5 mt-5 ml-5 gap-1">
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Total Bookings</Typography>
                            <Typography variant="h2">{bookingDetails[0]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Pending</Typography>
                            <Typography variant="h2">{bookingDetails[1]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Ongoing</Typography>
                            <Typography variant="h2">{bookingDetails[2]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Completed</Typography>
                            <Typography variant="h2">{bookingDetails[3]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Total Revenue</Typography>
                            {total_prices && (
                                <Typography variant="h2">₹{total_prices}</Typography>
                            )}
                        </div>
                    </div>

                </div>
            ) : (
                <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">Loading ....    </h1>

            ) : ''}




        </div>

    )
}
export default AdminHomePage;