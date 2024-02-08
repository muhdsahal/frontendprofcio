import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import {Card,CardBody,CardFooter,Typography,Input,Button,} from "@material-tailwind/react";
import { UserLoginURL } from "../../constants/constants";
import {ToastContainer,toast} from 'react-toastify';
import Loader from "../Loading/Loading";
import logo from '../../assets/profcio__All.png'
import { useApiContext } from "../../context/context";

function EmployeeLoginForm(){
    const navigate = useNavigate();
    const [user,setUser] = useState({email:"",password:"",user_type:"employee"});
    const [loading,setLoading] = useState(false);
    const handleLoading = () =>setLoading((cur)=>!cur);
    const {setEmployeeCredentials} = useApiContext()
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
      const employeeData = {
        id: decoded.user_id,
        email: decoded.email,
        username : decoded.username,
        user_type: decoded.user_type,
        is_active: decoded.is_active,
      }
      setEmployeeCredentials(employeeData)
      if (decoded.user_type !== 'employee') {
        toast.error(`${decoded.user_type} not valid in this Login`);
      } else {
        localStorage.setItem("token", token);
        navigate("/employee/");
        toast.success(`Welcome ${decoded.username}....!!`);
      }

    } catch (error) {
      if (error.response && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An Error occurred, please try again");
      }
    } finally {
      handleLoading();
    }
  }
};

    return (
      <div className="flex items-center justify-center h-screen" >
        {loading && <Loader />}
        <Card className="w-96"  >
          <div className="flex justify-center items-center screen" >
            <img  src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
          </div>
          <CardBody className="flex flex-col gap-4">
          <Typography style={{ fontWeight: '500' }}>Employee Login</Typography>
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
            className="bg-rose-500 text-gray-700"
            style={{backgroundColor: 'lightseagreen'}}
          >
            Sign In
          </Button>
            <Typography variant="small" className="mt-6 flex justify-center" >
              Don&apos;t have an account?
              <Link to="/employee_signup/">
                 Signup
              </Link>

            </Typography>
            <Typography variant="small" className="mt-6 flex justify-center">
              forgot password
            <Link to="/employee/password_reset/">
                forgot_password
              </Link>
            </Typography>
          </CardFooter>
        </Card>
        <ToastContainer />
      </div>
    );
    }    
export default EmployeeLoginForm;