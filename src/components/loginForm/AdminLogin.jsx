// import { Card,Input,Button,Typography } from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import {ToastContainer,toast} from 'react-toastify';

import { UserLoginURL } from "../../constants/constants";
import Loader from "../Loading/Loading";
import logo from '../../assets/profcio__All.png'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";

function AdminLoginForm(){
    const navigate = useNavigate();
    const [user,setUser] = useState({email:"",password:"",user_type:"admin"});
    //for loading 
    const [loading,setLoading] = useState(false);
    const handleLoading = () =>setLoading((cur)=>!cur);
    
    //email validation
    const validEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };
    
    //form valiadation
    const validForm = () =>{
        if(user.email.trim()==""){
            toast.error("Email should not be blank..")
            return false
        }else if(!validEmail(user.email.trim())){
            toast.error("enter valid email id")
            return false
        }else if(user.password.trim()==""){
            toast.error("password should be filled");
            return false
        }
        return true;
    };

// Assuming validForm() is a function that checks form validity
const handleLogin = async (e) => {
  if (validForm()) {
    handleLoading();
    try {
      const  {data:response} = await axios.post(
        UserLoginURL,
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      localStorage.clear()
      localStorage.setItem('access_token',response.access)
      localStorage.setItem('refresh_token',response.refresh)
      axios.defaults.headers.common['Authorization'] = 
                                     `Bearer ${response['access']}`
      const token = JSON.stringify(response.access);
      const decoded = jwtDecode(token);
      if (decoded.user_type !== 'admin') {
        toast.error(`${decoded.user_type} not valid in this Login`);
      } else {
        toast.success(`Welcome ${decoded.username}....!!`);
        localStorage.setItem("token", token);
        navigate("/admin/");
      }

    } catch (error) {
      console.log(error,'errrrrrrrrrrrrrror');
      if (error.response && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An Error occurred, please try again");
      }
    }
     finally {
      handleLoading();
    }
  }
};
    return (
      <div className="flex items-center justify-center h-screen overflow-x" >
        {loading && <Loader />}
        <Card className="w-96"  >
          <div className="flex justify-center items-center screen" >
            <img  src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
          </div>
          <CardBody className="flex flex-col gap-4">
          <Typography style={{ fontWeight: '500' }}>Admin Login</Typography>
          <Input
              size="lg"
              placeholder="Enter Your Email"
              value={user.email}
              name="email"
              type="email"
              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
            />
            <Input
              placeholder="Enter your Password"
              type="password"
              size="lg"
              // label="Password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
            />
          </CardBody>
          <CardFooter className="pt-0">
          <Button
            variant="White"
            fullWidth
            onClick={(e) => handleLogin()}
            style={{backgroundColor: 'lightseagreen'}}
          >
            Sign In
          </Button>
            
          </CardFooter>
        </Card>
        <ToastContainer />
      </div>
    );
    }    
export default AdminLoginForm;