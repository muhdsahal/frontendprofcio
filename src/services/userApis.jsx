import { userAxiosInstance } from "../utils/axiosUtils";

/// for user login
export const userLogin = (values) => {
    return userAxiosInstance.post('token/',values,
    {withCredentials:true})
    .catch((error)=>{throw error;});
};

// for google Login
export const userGoogleLogin = (value) => {
    const values ={
        email : value.email,
        username : value.email,
        first_name : value.given_name,
        last_name : value.family_name,
        password : value.id,
        
    }
    return userAxiosInstance.post("googleauth/",values,
    {withCredentials:true})
    .catch((error)=>{throw error ;});

};