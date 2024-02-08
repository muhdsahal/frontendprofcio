import React, { useEffect } from "react";
import Home from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import UserProtected from "./ProtectedRoutes/UserProtected";
import EmployeeListUser from "../pages/Home/EmployeeListPage";
import UserProfilePage from "../pages/Home/UserProfilePage";
import Login from "../pages/login/login";
import Signup from "../pages/signup/Signup";
import EmployeeDetailsPage from "../pages/Home/EmployeeDetailsPage";
import SuccessFullPayment from "../components/Home/payment/Success";
import CanceledPayment from "../components/Home/payment/fail";
import ForgotPassword from "../pages/ForgotPassWord";
import ResetPassword from "../pages/ResetPassword";
import BookingListPage from "../pages/Home/BookingListPage";
import ChatPageUser from "../pages/Home/ChatPageUser";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
function UserRoutes() {

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/notifications/");

    socket.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event);

      // Parse the message data if needed
      const messageData = JSON.parse(event.data);
      console.log(messageData, "message data");

      // Show a notification
      showNotification(messageData.message);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    // Function to show a notification
    const showNotification = (message) => {
      if ("Notification" in window) {
        console.log(message, "message---------------------->>>>>");
        const currentPermission = Notification.permission;

        if (currentPermission === "granted") {
          console.log(message, "message---------------------->>>>>");

          // Permission already granted, create a notification
          new Notification("New Message", {
            body: message,
          });
        } else if (currentPermission !== "denied") {
          // Permission not granted or denied, request it
          Notification.requestPermission().then((permission) => {
            console.log(message, "message---------------------->>>>>");

            if (permission === "granted") {
              // Permission granted, create a notification
              new Notification("New Message", {
                body: message,
              });
            }
          });
        }
      }
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password_reset/" element={<ForgotPassword />} />
      <Route path="/reset_password/:uid/:token" element={<ResetPassword />} />

      <Route exact element={<UserProtected />}>
        <Route element={<Home />} path='/' />
      </Route>
      <Route element={<EmployeeListUser />} path="/employeelist" />
      <Route element={<UserProfilePage />} path="/userprofile" />
      <Route element={<EmployeeDetailsPage />} path="/employeedetails" />
      <Route element={<BookingListPage />} path="/booking_list" />
      <Route element={<SuccessFullPayment />} path="/employeedetails/payment/success/" />
      <Route element={<CanceledPayment />} path="/employeedetails/payment/canceled/" />
      <Route element={<ChatPageUser />} path="/chat" />
     



      <Route element={<ErrorPage />} path='/*' />


    </Routes>
  )
}
export default UserRoutes;