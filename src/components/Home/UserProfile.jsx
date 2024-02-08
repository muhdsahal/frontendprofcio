import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Input, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { Auth_Url, base_url } from "../../constants/constants";
import CitiesData from '../../components/empolyee/locations.json'
import { Grid } from "@mui/material";
import blankImage from '../../assets/blankprofile.png'
import { jwtDecode } from "jwt-decode";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setupdatedUser] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const token = localStorage.getItem("token")
  const {user_id} = jwtDecode(token)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${Auth_Url}user_profile/${user_id}/`
        );
        setUser(response.data);
        setupdatedUser(response.data);
        console.log(response.data, "data apiiiiiiiiiiiiiiiiiiiiii");
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [user_id]);

  const cityOptions = CitiesData.cities.map((city) => ({
    value: city.City,
    label: city.City,
  }));

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setupdatedUser(user);
    setImageFile(null);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      // Append profile_photo if an imageFile is selected
      if (imageFile) {
        formData.append("profile_photo", imageFile, imageFile.name);
      }

      // Append other fields
      formData.append("username", updatedUser.username);
      formData.append("email", updatedUser.email);
      formData.append("phone_number", updatedUser.phone_number);
      formData.append("place", updatedUser.place);

      const authToken = localStorage.getItem("access_token");
      const response = await axios.put(
        `${Auth_Url}user_profile/${user_id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(response.data);
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
    setupdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen flex justify-center pt-10 bg-gray-50 overflow-hidden" >
      {user && (
        <div className="w-screen min-h-screen flex justify-center px-2  bg-gray-50" >
          <div className="md:w-2/4 py-5 px-10 bg-white rounded-md border shadow  h-fit">
            <h1 className="text-center text-black  text-5xl font-roboto-mono mb-4">User Profile</h1>
            <div>

              <Card className="shadow-none">
                <div>
                  <div
                    className="flex flex-col items-center"
                  >
                    {user.profile_photo ?  (
                      <img
                      src={`${base_url}${user.profile_photo}`} 
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
                            value={updatedUser.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                          />
                          <Input
                            label="email"
                            type="text"
                            name="email"
                            value={updatedUser.email}
                            // onChange={handleInputChange}
                            placeholder="Email"
                          />
                          <Input
                            label="phone_number"
                            type="text"
                            name="phone_number"
                            value={updatedUser.phone_number}
                            onChange={handleInputChange}
                          // placeholder="Phone Number"
                          />

                          <div className="flex gap-4 md:w-86 h-10">
                            <select name="place" id=""
                              className="border-[1px] border-[#747676]"
                              value={updatedUser.place}
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
                                    value={user.username}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h4" className="text-center text-blueGray-700">
                                  <Input
                                    label="email"
                                    type="email"
                                    name="email"
                                    value={user.email}
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
                                    value={user.phone_number}
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
                                    value={user.place}
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
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
