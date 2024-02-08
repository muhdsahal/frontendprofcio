import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookingEmployeeSide, BookingStatusUpdate, base_url } from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
import {Card,Typography,ListItemPrefix} from "@material-tailwind/react";
import {ToastContainer,toast} from 'react-toastify';
import blankImage from '../../assets/blankprofile.png'
function Customer() {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id
    const [customer, setCustomer] = useState([])
    const [loading, setLoading] = useState(true)
    const [ManagePage, setManagePage] = useState(false)

    useEffect(() => {
        setManagePage(false)
        axios.get(`${BookingEmployeeSide}${userId}`)
            .then((response) => {
                const responseData = response.data
                setCustomer(responseData)
            })
            .catch((error) => {
                console.error("an error occured data fectcing..", error);
                setLoading(false)
            })
    }, [ManagePage])

    const customerData = (userId) => {
        if (customer.length !== 0) {
            return <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">My Customers</h1>

        } else {
            return <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">No Customer Found</h1>

        }
    }   


    return (<>
        <div className="flex flex-col min-h-max items-center ">
            {customerData(userId)}
            <Card className="h-full w-full">
                <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Id
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                   
                                    Profile photo
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                   User  
                                </Typography>
                            </th>


                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    email
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Phone Number
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.map((cust) => {

                            const classes = "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={cust.id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {cust.id}
                                        </Typography>
                                    </td>
                                    <td>
                                    
                                    <ListItemPrefix >
                                        {cust.userDetails.profile_photo ? (
                                            <img className='rounded-full w-12' src={`${base_url}${cust.userDetails.profile_photo}`} />
                                        ) : (
                                            <img alt="img" src={blankImage} className='rounded-full w-12' />
                                        )}
                                        </ListItemPrefix>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {cust.userDetails.username}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {cust.userDetails.email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                             {cust.userDetails.phone_number}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
            <ToastContainer />
        </div>
    </>)
}
export default Customer