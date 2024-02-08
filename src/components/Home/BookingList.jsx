import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookingUserSide,EmpUrl } from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
import { Dialog, Card, CardBody, CardFooter, Button, Input, Typography } from "@material-tailwind/react";
import StarRating from "./ReviewRating/StarRating";
import EditIcon from '@mui/icons-material/Edit';
import {ToastContainer,toast} from 'react-toastify';


function BookingListUser() {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id
    const [bookingList, setBookingList] = useState([])
    const [loading, setLoading] = useState(true)
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(null);
    const [reviewEmpId, setReviewEmpid] = useState(null);
    const [open, setOpen] = useState(false)
    const [reviewList, setreviewList] = useState([])
    const [editOpen, setEditOpen] = useState(false)
    const handleEditModal = ()=>{setEditOpen(!editOpen)};
    const [editDatas,setEditDatas] = useState(null)
    const [ratingEditReview, setratingEditReview] = useState(null)
    const [ratingReviewEditText, setratingReviewEditText] = useState('')
    const [managePage, setmanagePage] = useState(false)

    const handleOpenModal = (id) => {
        setReviewEmpid(id);
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        setmanagePage(false)
        axios.get(`${EmpUrl}review/`)
            .then((response) => {
                const responseData = response.data
                setreviewList(responseData)
            })
            .catch((error) => {
                console.error("an error occured data fectcing..", error);
                setLoading(false)
            })
        axios.get(`${BookingUserSide}${userId}`)
            .then((response) => {
                const responseData = response.data
                setBookingList(responseData)
            })
            .catch((error) => {
                console.error("an error occured data fectcing..", error);
                setLoading(false)
            })
    }, [managePage])

    const bookData = () => {
        if (bookingList.length !== 0) {
            return <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">My Bookings</h1>

        } else {
            return  <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">No Bookings Found</h1>

        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setOpen(!open)
        
        const reviewRatingForm = new FormData
        reviewRatingForm.append("employee", reviewEmpId)
        reviewRatingForm.append("user", userId)
        reviewRatingForm.append("review_text", reviewText)
        reviewRatingForm.append("rating", rating)

        try {
            await axios.post(`${EmpUrl}review/`, reviewRatingForm).then((res) => {
            })
            toast.success("Review Submitted ")
            setReviewText('');
            setRating(null);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleEditReview = (employee_Id, User_Id) => {
        const findData = reviewList.find((obj)=>(obj.employeeDetails.id === employee_Id && obj.userDetails.id===User_Id))
        if(findData){
            setEditDatas(findData)
            setratingEditReview(findData.rating)
            setratingReviewEditText(findData.review_text)
        }
        handleEditModal()
    }

    const editReview=()=>{
        const data = {
            review_text: ratingReviewEditText,
            rating:ratingEditReview
        }
        axios.patch(`${EmpUrl}review_edit/${editDatas.id}/`,data).then((response)=>{
            if (response.status ===200) {
              toast.success("Review Updated")
            }
            handleEditModal()
            setmanagePage(true)
        }).catch((error)=>{
            console.log(error,"an error during edit");
        })
    }   

    const buttonStyle = {
        backgroundColor: 'lightseagreen',
        color: 'white', // Optionally, set text color
      };
      const cancelColor = {
        backgroundColor: 'red',
        color: 'white', // Optionally, set text color
      };


    
    return (<>
        <div className="flex flex-col min-h-max items-center ">
            {bookData(userId)}
            <Card className="w-full " >
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
                                    Employee
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
                                    Booking Status
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Review
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
                                            {book.employeeDetails.username}
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
                                            ₹{book.price}
                                        </Typography>
                                    </td>
                                    <td className={classes} >
                                        {(book.booking_status === 'pending' ? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#42cef5]"
                                        >
                                            {book.booking_status}
                                        </Typography> : '')}
                                        {(book.booking_status === 'ongoing' ? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#e4f046]"
                                        >
                                            {book.booking_status}
                                        </Typography> : '')}
                                        {(book.booking_status === 'completed' ? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#0ee865]"
                                        >
                                            {book.booking_status}
                                        </Typography> : '')}
                                    </td>
                                    {book.booking_status === 'completed' && (
                                        <td className={classes}>
                                            {book.is_reviewed ? (

                                                <i onClick={(e) => handleEditReview(book.employeeDetails.id, book.userDetails.id)} className=" hover:cursor-pointer p-2 hover:bg-[#070707] rounded-full opacity-30"><EditIcon className="hover:text-[#d7d7d7]" /></i>
                                            ) : (

                                                <Button
                                                    variant="small"
                                                    color="blue"
                                                    onClick={() => handleOpenModal(book.employeeDetails.id)}
                                                >
                                                    Review
                                                </Button>
                                            )}

                                        </td>
                                    )}

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>

        <Dialog
            open={open}
            onClose={handleOpenModal}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <Card  className="h-full" >
                <CardBody>
                    <Typography variant="h4" className="flex gap-4">
                        Write Review
                    </Typography>
                    <label className="flex flex-row gap-3">
                        Rating:
                        <StarRating rating={rating} onRatingChange={(newRating) => setRating(newRating)} />
                    </label>
                    <div className="flex flex-row gap-3">
                        Review:
                        <Input fullWidth value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                    </div>
                </CardBody>
            </Card>
            <CardFooter className='flex flex-wrap gap-2'>
                <Button   onClick={handleReviewSubmit} fullWidth style={buttonStyle}>
                    Create
                </Button>
                <Button   onClick={handleOpenModal} fullWidth style={cancelColor}>
                    Cancel
                </Button>
            </CardFooter>
        </Dialog>

        <div>
            {(editDatas!=null?
            <Dialog
            open={editOpen}
            onClose={handleEditModal}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <Card  className="h-full">
                <CardBody >
                    <Typography variant="h4" className="flex gap-4">
                        Edit Review
                    </Typography>
                    <label className="flex flex-row gap-3">
                        Rating:
                        <StarRating rating={ratingEditReview} onRatingChange={(newRating) => setratingEditReview(newRating)} />
                    </label>
                    <div className="flex flex-row gap-3">
                        Review:
                        <Input fullWidth value={ratingReviewEditText} onChange={(e) => setratingReviewEditText(e.target.value)} />
                    </div>
                </CardBody>
            </Card>
            <CardFooter className='flex flex-wrap gap-2'>
                <Button style={buttonStyle} onClick={editReview} fullWidth>
                Update
                </Button>
                <Button   onClick={handleEditModal} fullWidth style={cancelColor}>
                    Cancel
                </Button>
            </CardFooter>
        </Dialog>
                :'')}

        </div>
        <ToastContainer />
    </>)
}
export default BookingListUser