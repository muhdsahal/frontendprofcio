import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom'
import EmployeeHome from '../../pages/employee/EmployeeHome';
import AdminHome from '../../pages/admin/AdminHome';
import { useEffect } from 'react';


function UserProtected(){
    
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
  }, [id]); 


    const token =localStorage.getItem('token');
    const navigate = useNavigate()
  



    useEffect(() => {
      if(!token){
          navigate("/login")
      }
  }, [token])

    if(token){
        const decoded = jwtDecode(token);
        // console.log(decoded,'checked');
        if(decoded.user_type === 'user'){
            return <Outlet/>
        }else if(decoded.user_type === 'employee'){
            return <EmployeeHome/>
        }else if(decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminHome />
        }
    }else{
        navigate("/login")
    }
    
}
export default UserProtected;