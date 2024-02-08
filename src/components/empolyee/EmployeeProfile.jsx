import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Card, Button, Input } from "@material-tailwind/react";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { ServiceListURL, base_url } from "../../constants/constants";
import AvailableDates from "../Home/AvailableDates";
import CitiesData from '../../components/empolyee/locations.json'
import blankImage from '../../assets/blankprofile.png'
import { jwtDecode } from "jwt-decode";

function EmployeeProfile() {
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)
  const userId = decode.user_id
  const [employee, setEmployee] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [service, setService] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/auth/user_profile/${userId}/`
        );
        setEmployee(response.data);
        setUpdatedEmployee(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();


    axios.get(ServiceListURL)
      .then((response) => {
        setService(response.data || [])
      })
      .catch((error) => {
        console.error("an error during fetch data", error);
      })
  }, [userId]);





  const cityOptions = CitiesData.cities.map((city) => ({
    value: city.City,
    label: city.City,
  }));

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setUpdatedEmployee(employee);
    setImageFile(null);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      if (imageFile) {
        formData.append("profile_photo", imageFile, imageFile.name);
      }

      // Append other fields
      formData.append("username", updatedEmployee.username);
      formData.append("email", updatedEmployee.email);
      formData.append("phone_number", updatedEmployee.phone_number);
      formData.append("work", updatedEmployee.work);
      formData.append("experience", updatedEmployee.experience);
      formData.append("charge", updatedEmployee.charge);

      Object.entries(formData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("place", updatedEmployee.place);
      const authToken = localStorage.getItem("access_token");

      const response = await axios.put(
        `${base_url}/auth/user_profile/${userId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEmployee(response.data);
      setEditing(false);
      setImageFile(null);

      console.log(response.data, "Profile updated successfully");
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className=" flex justify-center pt-10 bg-gray-50" >
      {employee && (
        <div className=" min-h-screen flex justify-center px-2  bg-gray-50" >
          <div className=" py-5 px-10 bg-white rounded-md border shadow  h-fit">


            <h1 className="text-center text-black text-5xl  font-roboto-mono mb-4">Employee Profile</h1>

            <div>

              <Card className="shadow-none">
                <div>
                  <div
                    className="flex flex-col items-center"
                  >
                    {employee.profile_photo ?  (
                      <img
                      src={`${base_url}${employee.profile_photo}`} 
                      alt="user"
                      className="rounded-sm"
                      width="200"
                      />
                      ):(
                        
                      <img
                      src={blankImage}
                      alt="user"
                      className="rounded-sm"
                      width="200"
                      />
                      )}
                      
                  
                    <div className="mt-3">
                      {editing ? (
                        // Edit mode
                        <div className="space-y-4">
                          <Input
                            label="upload image"
                            type="file"
                            name="image"
                            onChange={(e) =>
                              setImageFile(e.target.files[0])
                            }
                            placeholder="Profile Image"
                          />
                          <Input
                            label="username"
                            type="text"
                            name="username"
                            value={updatedEmployee.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                          />
                          <Input
                            label="email"
                            type="text"
                            name="email"
                            value={updatedEmployee.email}
                            // onChange={handleInputChange}
                            placeholder="Email"
                          />
                          <Input
                            label="phone_number"
                            type="text"
                            name="phone_number"
                            value={updatedEmployee.phone_number}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                          />
                          <div className="flex gap-4 md:w-86 h-10">
                            <select name="place" id=""
                              className="border-[1px] border-[#747676]"
                              value={updatedEmployee.work}
                            // onChange={handleInputChange}

                            >
                              <option value="">Select Your Work</option>
                              {service.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex gap-4 md:w-86 h-10">
                            <select name="place" id=""
                              className="border-[1px] border-[#747676]"
                              value={updatedEmployee.place}
                              onChange={handleInputChange}

                            >
                              <option value="">Select Your Location</option>
                              {cityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <Input
                            label="experience"
                            type="text"
                            name="experience"
                            value={updatedEmployee.experience}
                            onChange={handleInputChange}
                            placeholder="Experience"
                          />
                          <Input
                            label="charge"
                            type="text"
                            name="charge"
                            value={updatedEmployee.charge}
                            onChange={handleInputChange}
                            placeholder="Charge"
                          />

                          <div className="flex justify-between">
                            <Button
                              color="red"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </Button>
                            <Button
                              color="green"
                              onClick={handleUpdateProfile}
                            >
                              Update Profile
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Viewing mode
                        <div className="space-y-4">
                          <div>
                            <Grid container spacing={2} justify="center">
                              <Grid item xs={12}>
                                <Typography variant="h4" className="flex text text-blueGray-700">
                                  <Input
                                    label="username"
                                    type="username"
                                    name="username"
                                    value={employee.username}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h4" className="text-center text-blueGray-700">
                                  <Input
                                    label="email"
                                    type="email"
                                    name="email"
                                    value={employee.email}
                                  />
                                </Typography>
                              </Grid>
                            </Grid>


                            <Grid container spacing={2} justify="center">
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  <Input
                                    label="phone_number"
                                    type="phone_number"
                                    name="phone_number"
                                    value={employee.phone_number}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  <Input
                                    label="work"
                                    type="work"
                                    name="work"
                                    value={employee.work}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  <Input
                                    label="place"
                                    type="place"
                                    name="place"
                                    value={employee.place}
                                  />
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container spacing={2} justify="center">
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  <Input
                                    label="experience"
                                    type="experience"
                                    name="experience"
                                    value={employee.experience}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  <Input
                                    label="charge"
                                    type="charge"
                                    name="charge"
                                    value={employee.charge}
                                  />
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                          <Button className="bg-[#4b9cec] text-white"
                            color="primary"
                            variant="outlined"
                            size="regular"
                            onClick={handleEditClick}
                          >
                            Edit Profile
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <AvailableDates empId={employee.id} role={employee.user_type} />
            {/* <p>{employee.user_type}</p> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;
