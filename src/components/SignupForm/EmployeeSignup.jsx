import React,{ useState ,useEffect} from "react";
import {ToastContainer,toast} from 'react-toastify';

import { useNavigate ,Link} from "react-router-dom";
import axios from 'axios'
import {Card,
    Input,
    Button,
    Typography } from "@material-tailwind/react";

import { empRegisterURL ,ServiceListURL } from "../../constants/constants";
import Loader from "../Loading/Loading";
import citiesData from "../../components/empolyee/locations.json"

export function EmployeeRegistrationForm(){
    const navigate = useNavigate()
    // const serviceListURL  =  'http://127.0.0.1:8000/service/service_list/'

    const cityOptions = citiesData.cities.map((city) => ({
      value: city.City,
      label: city.City,
    }));
    const toLogin = () =>{
      navigate("/employee/employee_login/")
    }

    const [other,setOther] = useState({conf_Password:""});
    const [serviceList, setServiceList] = useState([]);

    // form 
    const [formData,setFormData] =useState({
        username:"",
        email:"",
        password:"",
        user_type : "employee",
        phone_number:'+91'+'',
        work : "",
        place : "",
        description : "",
        experience : 0,
        charge:0,
        profile_photo : null
        
        
    });

    // for loading
    const [loading,setLoading] = useState(false);
    const handleLoading = () => setLoading((cur)=> !cur);
    // const [dataLoaded, setDataLoaded] = useState(false); // Track whether data has been loaded
    // const handleInputChange = (e) => {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    //email validation Handler
    const validEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex .test(email)
    }

    //form data validation error
    const  validForm = () => {
  

         if (formData.username.trim()===""){
            toast.error("username not should be empty")
            return false;
        }
        
        else if (formData.email.trim()===""){
            toast.error("email not should be empty")

            return false;
        }
        else if(!validEmail(formData.email.trim())){
            toast.error("enter valid email")

            return false;
        }
        else if (formData.password.trim()===""){
            toast.error("password not should be empty")

            return false;
        }
        else if (other.conf_Password.trim()==""){
            toast.error("please confirm password")


            return false
        }
        else if(formData.password != other.conf_Password){
            toast.error("password mismatch !")

            return false
        } 
        else if(formData.phone_number.trim() === ""){
          toast.error("phone number should not be empty")
          return false
        }
       
        else if(formData.description.trim()=== ""){
          toast.error("description should not be empty!")
          return false
        }
        else if(formData.description.trim()=== ""){
          toast.error("description should not be empty!")
          return false
        }
        else if(!formData.place){
          toast.error("place should not be empty!")
          return false
        }
        else if(!formData.work){
          toast.error("work should not be empty!")
          return false
        }
        else if(formData.experience < 1 && formData.experience > 50 ){
          toast.error(" experience should minimum 1 year !")
          return false
        }
        else if(formData.charge  < 300 && formData.charge> 2999){
          toast.error("minimum charge 300 and maximum charge 2999 ")
          return false
        }

        return true;
        
    }
        
          useEffect(() => {
            axios.get(ServiceListURL)
              .then(response => {
                setServiceList(response.data);
                
              })
              .catch(error => {
                console.error('Error fetching service list:', error);
              });
          }, []); 

          const handleProfilePhotoChange = (e) => {
            const file = e.target.files[0];
          
            if (file) {
              // You can perform additional checks on the file if needed
          
              setFormData({
                ...formData,
                profile_photo: file,
              });
            }
          };
          
          
        
        // form submit handler
        const handleSubmit = async() => {
          
          // console.log(formData,'formdata....................................);
    
            if (validForm()){
            handleLoading();
        try{
          const formDataObj = new FormData();

          // Append all form data to FormData object
          Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });

          if (formData.profile_photo) {
            formDataObj.append("profile_photo", formData.profile_photo);
          }
          
            const response = await axios.post(empRegisterURL, formDataObj, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            toast.success("Registraion success..!")
        setOther({conf_Password:""})
        handleLoading();
        console.log('registration successfull ',response.data);
        navigate("/confirm")
        }catch(error){
          console.log(error,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
        handleLoading();
            if (error.response && error.response.data) {
              const { email, username } = error.response.data;
              if (email) {
                toast.error(email[0]);
              }
              if (username) {
                toast.error(username[0]);
              }
            } else {
              toast.error("An error occurred during registration.");
            

            }
        }
      

        }

      }
    return (
  <div className="flex items-center justify-center ">
  {loading && <Loader />}
  <Card className="text-center pt-8 pb-2" color="transparent" shadow={false}>
    <Typography variant="h4" color="blue-gray">
      Sign Up
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Welcome To Profcio! Enter Employee details.
    </Typography>
    <div className=" w-80 max-w-screen-lg sm:w-96"  >
      <div className="mb-1 flex flex-col gap-6">
        <div className="flex gap-6">
          {/* First Line */}
          
          <div className="flex-1">
          <Typography  color="blue-gray-200" className="-mb-3">
               Enter Your Username
          </Typography>
          <br />
          <Input
               size="lg"
               placeholder="username"
               value={formData.username} name="username"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">
          <Typography  color="blue-gray-200" className="-mb-3">
               Enter Your Email
          </Typography>
          <br />
          <Input
               size="lg"
               placeholder="email"
          
               value={formData.email} name="email"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>

        </div>
        <div className="flex gap-6">
          
          <div className="flex-1">
          <Typography  color="blue-gray-200" className="-mb-3">
               Enter Your Password
          </Typography>
          <br />
          <Input
               size="lg"
               placeholder="**********"
              
               value={formData.password} name="password" type="password"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">
          <Typography  color="blue-gray-200" className="-mb-3">
               Enter  Confirm password
          </Typography>
          <br />
            <Input
              size="lg"
              placeholder="*********"
              value={other.conf_Password}  
              name="conf_Password"
              type="password"
              onChange={(e) => { setOther({ ...other, [e.target.name]: e.target.value }) }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

        </div>
        <div className="flex gap-6">
        <div className="flex-1">
        <Typography  color="blue-gray-200" className="-mb-3">
               Enter Your Phone Number
          </Typography>
          <br />
        <Input
               size="lg"
               
               value={formData.phone_number} name="phone_number"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">
          <Typography  color="blue-gray-200" className="-mb-3">
               Enter Your description 
          </Typography>
          <br />
          <Input
               size="lg"
               placeholder="description"
          
               value={formData.description} name="description"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          
          </div>
          <div className="flex gap-6">

          <div className="flex gap md:w-86 h-10">
       
          <br />

              <select
              value={formData.place}
              name="place"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
              className="border-[1px] border-[#747676]"
                
              >
                <option value="">Select Your city</option>
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
          </div>
          <div className="flex gap-4 md:w-86 h-10">
       
          <br />
          <select className='border-[1px] border-[#747676]'
            value={formData.work}
            name="work"
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            // className="!border-t-blue-gray-200" // Apply the same class here
          >
            <option value="" disabled>Select Your service</option>
            {Object.values(serviceList).map(service => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          </div>
          
          </div>
          <div className="flex gap-6">
          <div className="flex-1">
          <Typography  color="blue-gray-200" className="-mb-3">
               Enter Your  Experience 
          </Typography>
          <br />
          <Input
               size="lg"
               placeholder="experience"
          
               value={formData.experience} name="experience"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">

          <Typography  color="blue-gray-200" className="-mb-3">
               Enter Your Charge
          </Typography>
          <br />
          <Input 
               
               size="lg"
               placeholder="Enter your  Charge"
          
               value={formData.charge} name="charge"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <br />

          </div>
          <div className="flex-1">
            <Typography color="blue-gray-200" className="-mb-3">
              Upload Profile Photo
            </Typography>
            <br />
            <Input
              size="lg"
              type="file"
              name="profile_photo"
              onChange={(e) => handleProfilePhotoChange(e)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
              
          
        <Button  className=" text-gray-700" fullWidth onClick={handleSubmit} style={{backgroundColor: 'lightseagreen'}}>
          Sign Up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/employee_login" color="blue">Login</Link>
        </Typography>
      </div>
    </div>
  </Card>
  <ToastContainer />
</div>

     );


}