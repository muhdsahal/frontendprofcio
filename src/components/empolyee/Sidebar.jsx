import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import logo from '../../assets/profcio__All.png'
import { jwtDecode } from "jwt-decode";
import { useApiContext } from "../../context/context";
import { toast, ToastContainer } from "react-toastify";
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import AssessmentIcon from '@mui/icons-material/Assessment';



export function SidebarWithSearch() {
  const token = localStorage.getItem('token')
  const decode = jwtDecode(token)
  const userId = decode.user_id;
  const [open, setOpen] = useState(0);
  const navigate = useNavigate()

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleDashboard = () => {
    navigate(`/employee/`);
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success("Log Outed Successfully")
    navigate('/employee_login')

  }
  function toProfile() {
    navigate(`/employee/profile`);
  }

  const toBookings = () => {
    navigate(`/employee/booking_list`)
  }

  const toChat = () => {
    navigate('/employee/chat')
  }

  const toSales = ()=>{
    navigate('/employee/sales_report')
  }
  // console.log(employeeCredentials,'context is working ');
  const toCustomers = () => {
    navigate(`/employee/customer`)
  }

  return (
    <>
      <Card className="bg-black  h-[calc(120vh-2rem)]  p-7 shadow-xl shadow-blue-gray-900/5 ">
        <div className="mb-2 flex items-center gap-4 p-4">
          <img src={logo} alt="logo" color='green' width="150" height="100" />
        </div>

        <Typography variant="h4" style={{ color: 'white' }}>
          Employee Dashboard
        </Typography>
        <List>



          <ListItem onClick={handleDashboard}>
            <ListItemPrefix>
              <PresentationChartBarIcon color="white" className="h-5 w-5" />
            </ListItemPrefix>
            <span className="font-bold text-1xl text-white">Dashboard</span>
          </ListItem>

          <ListItem onClick={toProfile}>
            <ListItemPrefix>
              <UserCircleIcon color="white" className="h-5 w-5" />
            </ListItemPrefix>
            <span className="font-bold text-1xl text-white">Profile</span>
          </ListItem>

          <ListItem onClick={toBookings}>
            <ListItemPrefix>
              <BookIcon  className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <span className="font-bold text-1xl text-white">Bookings</span>
          </ListItem>

          <ListItem onClick={toCustomers}>
            <ListItemPrefix>
              <PeopleIcon  className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <span className="font-bold text-1xl text-white">Customers</span>
          </ListItem>

          <ListItem onClick={toChat}>
            <ListItemPrefix>
              <ChatIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <span className="font-bold text-1xl text-white">Chat</span>
          </ListItem>


          <ListItem onClick={toSales}>
            <ListItemPrefix>
              <AssessmentIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <span className="font-bold text-1xl text-white">Sales Report</span>
          </ListItem>

          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon color="white" className="h-5 w-5 " />
            </ListItemPrefix>

            <span className="font-bold text-1xl text-white"> Log Out</span>
          </ListItem>
        </List>
      </Card>
      <ToastContainer />
    </>
  );
}