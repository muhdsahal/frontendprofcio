import { Card, Typography, List, ListItem, ListItemPrefix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, PowerIcon, } from "@heroicons/react/24/solid";
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import AssessmentIcon from '@mui/icons-material/Assessment';
import logo from '../../assets/profcio__All.png'

import { useNavigate } from "react-router-dom";

export function Sidebar() {

  const navigate = useNavigate()

  const toAdminHome = () => {
    navigate('/admin/')
  }

  const handleUserList = () => {
    navigate("/admin/users")
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin_login')
  }
  const handleService = () => {
    navigate('/admin/services')
  }
  const handleCategory = () => {
    navigate('/admin/category')
  }
  const handleBooking = () => {
    navigate('/admin/booking/')
  }

  const toSalesReport = () => {
    navigate('/admin/sales_report/')
  }

  return (
    <Card className="h-[calc(100vh-2rem)] max-w-[64] p-4 shadow-xl shadow-blue-gray-900/5 bg-blueGray-800">
      <div className="mb-2 flex items-center gap-4 p-4">
          <img src={logo} alt="logo" color='green' width="150" height="100" />
        </div>
        <Typography variant="h4" style={{ color: 'white' }}>
          Profcio Admin
        </Typography> 
      <List>
        <ListItem onClick={toAdminHome}>
          <ListItemPrefix >
            <PresentationChartBarIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          
          <span className="text-white">Dashboard</span>
        </ListItem>

        <ListItem onClick={handleCategory} >
          <ListItemPrefix >
            <CategoryIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Services Category</span>
        </ListItem>
        <ListItem onClick={handleService}>
          <ListItemPrefix>
            <WorkIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Services</span>
        </ListItem>
        <ListItem onClick={handleUserList}>
          <ListItemPrefix>
            <PeopleIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
      
          <span className="text-white">Users</span>
        </ListItem>

        <ListItem onClick={handleBooking}>
          <ListItemPrefix>
            <BookIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Bookings</span>
        </ListItem>

        <ListItem onClick={toSalesReport}>
          <ListItemPrefix>
            <AssessmentIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Sales Report</span>
        </ListItem>

        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          
          <span className="text-white">Logout</span>
        </ListItem>
      </List>
    </Card>
  );
}