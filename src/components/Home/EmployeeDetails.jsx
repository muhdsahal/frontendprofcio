import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Loading/Loading';
import { ListItem, Rating, Typography } from '@mui/material';
import { Button, ListItemPrefix } from '@material-tailwind/react';
import AvailableDates from './AvailableDates';
import { Auth_Url, EmpUrl, base_url } from '../../constants/constants';
import blankImage from '../../assets/blankprofile.png'
import ChatIcon from '@mui/icons-material/Chat';

function EmployeeDetails() {
  const [employeeData, setEmployeeData] = useState(null);
  const [bookingData, setBookingData] = useState([])
  const [reviewData, setReViewData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const id = location.state.data || ''

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${Auth_Url}employeelisting/${id}/`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);


  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${EmpUrl}employee/${id}/book/`);
        setBookingData(response.data);

      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchBookingData();
  }, [id]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`${EmpUrl}review/${id}`);
        setReViewData(response.data);
      } catch (error) {
        console.error('Error fetching Review data:', error);
      }
    };
    fetchReviewData()
  }, [id])

  if (!employeeData) {
    return <Loader />
  }


  const HandleChat = (event) => {
    navigate("/chat", { state: { data: event } })
  }

  return (<>
    <div>
      <h1 className="text-center text-black  text-5xl font-roboto-mono mb-4">Employee Details</h1>


    </div>

    {employeeData ? (
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">

        <div className="container mx-auto px-4">
          {employeeData.profile_photo ? (
            <img
              src={employeeData.profile_photo}
              alt="card-image"
              className="w-full h-100 object-cover"
            />
          ) : (
            <img alt="img" src={blankImage}
              className="w-full h-100 object-cover" />
          )}
        </div>

        <div className="mx-auto px-5 lg:px-5">

          <h2 className="pt-3 text-2xl font-bold lg:pt-0">

            Name : {employeeData.username}
          </h2>
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">

            Work : {employeeData.work}
          </h2>

          <h2 className="pt-3 text-2xl font-bold lg:pt-0">

            Charge : ₹  {employeeData.charge}
          </h2>

          <h2 className="pt-3 text-2xl font-bold lg:pt-0">

            Location : {employeeData.place}
          </h2>
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">

            Experience : {employeeData.experience} year
          </h2>
          <p className="pt-3 text-xs font-bold lg:pt-0">
            Description : {employeeData.description}
          </p>
          <p className="pt-3 text-xs font-bold lg:pt-0">
            <i onClick={(e) => HandleChat(employeeData.id)}>

              <ChatIcon style={{ fontSize: "50px", color: 'black' }} />
            </i>
          </p>

          <AvailableDates empId={employeeData.id} empdetails={employeeData.charge} />
        </div>



      </section>



    ) : (
      <Loader />
    )}
    <section>
      <div className="flex justify-center">
        <h3 className="text-center text-black  text-1xl font-roboto-mono mb-4">Review And Ratings</h3>

      </div>

      {reviewData.map((review, index) => (
        <div key={index} className=" rounded-md md:flex-col max-h-96 overflow-y-auto">
          <div className="container w-full mb-6 p-6 border shadow-xl rounded-md">
            <div className="w-full flex justify-between">
              <ListItem>
                <ListItemPrefix>
                  {review.userDetails.profile_photo ? (
                    <img className='rounded-full w-12' src={`${base_url}${review.userDetails.profile_photo}`} />
                  ) : (
                    <img alt="img" src={blankImage} className='rounded-full w-12' />
                  )}
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {review.userDetails.username}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {review.userDetails.email}
                  </Typography>
                </div>
              </ListItem>
            </div>
            <Rating ratedColor="amber" value={review.rating} readOnly />
            <div className="flex gap-2 mb-2">
              <p className="font-poppins font-medium">{review.review_text}</p>
            </div>
          </div>
        </div>
      ))}
    </section>

  </>


  );
};

export default EmployeeDetails;

