import axios from "axios";
import React, { useEffect, useState } from "react";
import { DashboardUrl } from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
import { Typography } from "@material-tailwind/react";
import Loader from "../Loading/Loading";
import Chart from "react-apexcharts";


function EmployeeHomePage() {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id

    const [employeeReport, setEmployeeReport] = useState(null)

    useEffect(() => {
        axios.get(`${DashboardUrl}booking_report_emp/${userId}`)
            .then((response) => {
                const responseData = response.data
                setEmployeeReport(responseData)
            }).catch((error) => {
                console.error("an error occured during ", error);
            })


    }, [])
    
    return (
        <div>
            {/* <h1 className='flex text-center justify-center font-roboto-mono text-black'></h1> */}
            <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">Employee Dashboard</h1>
            {employeeReport ? (
                <div>
                    <div className="flex flex-wrap justify-between mb-5 mt-5 ml-5 gap-1">
                        {/* Other UI components */}
                        <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                            <div className="flex flex-col items-center">
                                <Typography className='font-prompt mt-2' variant="h5">Employee Name</Typography>
                                <Typography variant="h2">{employeeReport.username}</Typography>
                            </div>
                        </div>

                        <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                            <div className="flex flex-col items-center">
                                <Typography className='font-prompt mt-2' variant="h5">Total Bookings</Typography>
                                <Typography variant="h2">{employeeReport.booking_count}</Typography>
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                            <div className="flex flex-col items-center">
                                <Typography className='font-prompt mt-2' variant="h5">Pending</Typography>
                                <Typography variant="h2">{employeeReport.pending_count}</Typography>
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                            <div className="flex flex-col items-center">
                                <Typography className='font-prompt mt-2' variant="h5">Ongoing</Typography>
                                <Typography variant="h2">{employeeReport.ongoing_count}</Typography>
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                            <div className="flex flex-col items-center">
                                <Typography className='font-prompt mt-2' variant="h5">Completed</Typography>
                                <Typography variant="h2">{employeeReport.completed_count}</Typography>
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                            <div className="flex flex-col items-center">
                                <Typography className='font-prompt mt-2' variant="h5">Total Revenue</Typography>
                                <Typography variant="h2">₹{employeeReport.total_price}</Typography>
                            </div>
                        </div>

                    </div>

                </div>
            ) : (
                <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">Loading ....    </h1>
            )}

            {/* <div className="flex ml-10 ">
                <div className=" row">
                    <div className="mixed-chart">
                        <Chart
                            // options={chartData.o ptions}
                            // series={chartData.series}
                            // type="donut"
                            width="400"
                        />
                    </div>
                </div>
            </div> */}

        </div>
    )
}
export default EmployeeHomePage