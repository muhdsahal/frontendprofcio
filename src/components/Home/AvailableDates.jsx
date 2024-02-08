import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EmpUrl, base_url } from '../../constants/constants';
import moment from 'moment-timezone';

function AvailableDates(props) {
  const empId = props.empId;
  const employeeCharge = props.empdetails;

  const [bookedDates, setBookedDates] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${EmpUrl}employee/${empId}/book/`);
        const bookedDatesArray = response.data.map((dateInfo) =>
          moment(dateInfo.booking_date).tz('Asia/Kolkata').toDate()
        );
        setBookedDates(bookedDatesArray);

        // Fetch and set absence dates
        const absenceResponse = await axios.get(`${EmpUrl}employee_absences/${empId}/`);
        const absenceDatesArray = absenceResponse.data.map((absenceDate) =>
          moment(absenceDate.absence_date).tz('Asia/Kolkata').toDate()
        );
        setAbsences(absenceDatesArray);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, [userId]);



  const tileDisabled = ({ date }) => {
    const isBooked = bookedDates.some(
      (bookedDate) =>
      
        bookedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );

    const isAbsence = absences.some(
      (absenceDate) =>
        absenceDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );

    return isBooked || isAbsence||date.getTime() <= new Date().setHours(0, 0, 0, 0);
  };


  const tileClassName = ({ date }) => {
    const isBooked = bookedDates.some((bookedDate) =>
      bookedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );

    const isAbsence = absences.some((absenceDate) =>
      absenceDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );
    return isBooked ? 'booked' : isAbsence ? 'absent' : '';
  };

  const tileStyle = ({ date, tileClassName }) => {
    const classes = tileClassName.split(' ');

    return {
      ...classes.reduce((styles, cls) => {
        if (cls === 'booked') {
          styles.backgroundColor = 'red';
        } else if (cls === 'absent') {
          styles.backgroundColor = 'blue';
        }
        return styles;
      }, {}),
    };
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const bookEmployee = async () => {
    try {
      if (!selectedDate) {
        toast.error('Please select a valid date!');
        return;
      }

      const formattedDate = moment(selectedDate).tz('Asia/Kolkata').format('YYYY-MM-DD');

      // Check if userId and empId are equal, and no payment is required
      if (userId === empId) {
        // Mark absence directly without going to the payment process
        await axios.post(`${EmpUrl}employee_absence/`, {
          user: userId,
          employee: empId,
          absence_date: formattedDate,
        });

        toast.success('Absence marked successfully!');
        return;
      }
      const data = {
        userId: userId,
        empId: empId,
        currency: 'INR',
        unit_amount: employeeCharge * 100,
        quantity: 1,
        mode: 'payment',
        date: formattedDate,
      };
      const response = await axios.post(`${EmpUrl}booking/payment/`, data);
      window.location.href = response.data.message.url;

      return response.data;
    } catch (error) {
      toast.error('An error occurred during booking!');
      console.error('Error booking:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-black text-5xl  font-roboto-mono mb-4">Available Dates</h1>

      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        tileStyle={tileStyle}
      />

      <p>
        Selected Date: {selectedDate && selectedDate.toLocaleDateString()}
        {selectedDate && selectedDate.getTime() > new Date().setHours(0, 0, 0, 0) && (
          <Button color="blue" onClick={bookEmployee}>
            {userId === empId ? 'Mark Absence' : 'Book Now'}
          </Button>
        )}
      </p>
      <ToastContainer />
    </div>
  );
}

export default AvailableDates;
