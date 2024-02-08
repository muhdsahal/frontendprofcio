import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookingEmployeeSide, BookingStatusUpdate ,EmpUrl} from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
import {
    Card,
    Typography,
    Button,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {ToastContainer,toast} from 'react-toastify';
function BookingListEmployee() {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id
    const [bookingList, setBookingList] = useState([])
    const [loading, setLoading] = useState(true)

    const [ManagePage, setManagePage] = useState(false)
    useEffect(() => {
        setManagePage(false)
        axios.get(`${BookingEmployeeSide}${userId}`)
            .then((response) => {
                const responseData = response.data
                setBookingList(responseData)
            })
            .catch((error) => {
                console.error("an error occured data fectcing..", error);
                setLoading(false)
            })
    }, [ManagePage])

    const bookData = () => {
        if (bookingList.length !== 0) {
            return  <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">My Bookings</h1>
        } else {
            return  <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">No Bookings Found</h1>

        }
    }

    const UpdateStatusBooking = (event, book_id,booking_date) => {
        const value = event.target.value

        if (value === 'completed' && new Date() < new Date(booking_date)) {
            toast.error('Cannot mark as completed before the booking date');
            return;
        }
        const data = { booking_status: value }

        axios.patch(`${BookingStatusUpdate}${book_id}/`, data).then((response) => {
            if (response.status === 200) {
                toast.success(' status updated succesfully');
                setManagePage(true)

            }
        }).catch((error) => {
            console.log(error);
        })
    }
    return (<>
        <div className="flex flex-col min-h-max items-center ">
            {bookData(userId)}
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
                                    User
                                </Typography>
                            </th>


                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Date
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Price
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Status
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Update Status
                                </Typography>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {bookingList.map((book) => {

                            const classes = "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={book.id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {book.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {book.userDetails.username}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {book.booking_date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            ₹ {book.price}
                                        </Typography>
                                    </td>
                                    <td className={classes} >
                                       {(book.booking_status ==='pending'? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#42cef5]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                        {(book.booking_status ==='ongoing'? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#e4f046]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                        {(book.booking_status ==='completed'? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#0ee865]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                    </td>
                                    <td className={classes}>
                                        <select onChange={(e) => UpdateStatusBooking(e, book.id,book.booking_date)} name="" id="" className="border-[1px] p-1 border-gray-300 rounded-md">
                                            <option value="pending">pending</option>
                                            <option value="ongoing">ongoing</option>
                                            <option value="completed">completed</option>
                                        </select>

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
export default BookingListEmployee