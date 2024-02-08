
import { useState,useRef } from "react";
import {ToastContainer,toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'
import { userAxiosInstance } from "../../utils/axiosUtils";
import {Card,
    Input,
    Button,
    Typography } from "@material-tailwind/react";

import {GoogleSignUpURL, Gooogle_Access_Token, UserLoginURL, userRegisterURL} from '../../constants/constants'
import Loader from '../Loading/Loading'
import logo from '../../assets/profcio__All.png'
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import LogoGoogle from '../../assets/glogo.png'
import { useApiContext } from "../../context/context";

function SimpleRegistrationForm() {
  const navigate = useNavigate();
  const [other, setOther] = useState({ conf_Password: "" });
  const {setUserCredentials} = useApiContext()
  // form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    user_type: "user",
  });

  // for loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  // email validation Handler
  const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  

  // form data validation error
  const validForm = (e) => {
    if (formData.username.trim() === "") {
      toast.error("Username should not be empty");
      return false;
    } else if (formData.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!validEmail(formData.email.trim())) {
      toast.error("Enter a valid email");
      // Display an alert message for an invalid email
      alert("Invalid email");
      return false;
    } else if (formData.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;
    } else if (other.conf_Password.trim() === "") {
      toast.error("Please confirm password");
      return false;
    } else if (formData.password !== other.conf_Password) {
      toast.error("Password mismatch!");
      return false;
    }
    return true;
  };

 

const handleSubmit = async (e) => {
  console.log(formData);
  if (validForm()) {
    handleLoading();
    try {
      const response = await userAxiosInstance.post(userRegisterURL, formData);

      toast.success("Registration success..!");
      
      handleLoading();
      navigate("/confirm");
    } catch (error) {
      handleLoading();
      if (error.response && error.response.data) {
        if (error.response.data.email) {
          toast.error(error.response.data.email[0]);
        }
        if (error.response.data.username) {
          toast.error(error.response.data.username[0]);
        }
      } else {
        console.log(response.data,'dataaaaaaaaaaaaaa');
        toast.error("An error occurred during registration..");
      }
    }
  }
};
  const [guser,setGuser] = useState(null)
  let googleData = ""
  const signUpWithGoogle = useGoogleLogin({
    onSuccess : (codeResponse) => {
      googleData = codeResponse
      console.log(googleData.access_token);
      GoogleAuth();
    },
    onError : (error) => console.log("login Failed ",error)
  });

  const GoogleAuth = async () => {
    try{
      if (!googleData) return;
            const tokenData = await axios.get(
                `${Gooogle_Access_Token}access_token=${googleData.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${googleData.access_token}`,
                        Accept: "application/json",
                    },
                }
            );
            googleData = tokenData.data;
            const googleUser = {
                username: googleData.given_name,
                email: googleData.email,
                password: googleData.id,
                user_type: "user",
                is_google: true,
            }
            try {
                const googleResponse = await axios.post(GoogleSignUpURL, googleUser);
                const response = googleResponse.data
             if (response.status === 403 || response.status === 204) {
                    setTimeout(() => {
                        toast.error(response.Text)
                    }, 500);
                    navigate('/login')
                }
                if (response.status === 200) {
                    if (response.signup === 'signup') {
                        toast.success(response.Text);
                    }
                    const loginData = {
                        email: googleData.email,
                        password: googleData.id,
                    }
                    const userToken = await axios.post(UserLoginURL, loginData);
                    console.log(userToken,'userTokenuserTokenuserTokenuserToken============>>>>>');
                    const data = userToken.data;
                    try {
                        const token = jwtDecode(data.access)
                        const userData = {
                            user_id: token.user_id,
                            email: token.email,
                            username : token.username,
                            user_type: token.user_type,
                            is_google: token.is_google,
                            is_active: token.is_active,
                        }
                        setGuser(userData)
                        setUserCredentials(userData)
                        localStorage.setItem('token', JSON.stringify(data));
                        navigate('/');

                    } catch (error) {
                        console.error('Error decoding JWT:', error);
                    }
                }
                else if (response.status === 404) {

                    if (response.Text.username) {
                        toast.error(response.Text.username[0])
                    }
                    else if (response.Text.email) {
                        toast.error(response.Text.email[0])
                    }
                }
            } catch (error) {
                console.error('Error during signup:', error);
                toast.error(error.message);
            }
    }catch (error) {
      console.log(error.response);
      toast.error(error.message);
  }
  }

  return(
      
        
        <div className="flex items-center justify-center  text-black">
  
    
          {loading && <Loader />}
    
          <Card className="text-center pt-8 pb-2 bg-transparent shadow-none">
          
            <Typography variant="h4" color="black">
              Sign Up
            </Typography>
    
            <Typography color="black" className="mt-1 font-normal">
              Welcome To Profcio ! Enter your details to register
              <div className="flex justify-center items-center screen" >
              <img  src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
            </div>
            </Typography>
            
    
            <form className=" w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  size="lg"
                  placeholder="Enter your username"
                  value={formData.username}
                  name="username"
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
    
                <Input
                  size="lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
    
                <Input
                  size="lg"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
    
                <Input
                  size="lg"
                  placeholder="Enter your confirm password"
                  type="password"
                  value={other.conf_Password}
                  name="conf_Password"
                  onChange={(e) => setOther({ ...other, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
              </div>
                  <br />
              <Button variant="White" 
                fullWidth
                type="button"
                className="flex items-center px-16 py-3 rounded" 
                style={{backgroundColor: 'lightseagreen'}} onClick={handleSubmit}>
                Signup
              </Button>
              <br />
              
              <Button
            fullWidth
            type="button"
            className="flex items-center px-16 py-3 rounded"
            onClick={()=>signUpWithGoogle()} 
            style={{ backgroundColor: 'blue' }}
              
            >
              <img
              src={LogoGoogle}
              alt="Google logo"
              className="google-logo img-fluid"
              width="22"
              height="22"
            />
              <span className="button-text ms-2">Signup With Google</span>
            </Button>
    
              <Typography color="black" className="mt-4 text-center font-normal">
                Already have an account?{' '}
                <Link color="black" to="/login">Login</Link>
              </Typography>
            </form>
          </Card>
    
          <ToastContainer />
        </div>
      );

}
export default SimpleRegistrationForm;






































