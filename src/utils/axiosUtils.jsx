import axios from "axios";
import {  Auth_Url, base_url } from "../constants/constants";

//setting for request time out
const createAxiosClient = (base_url) => {
    const client = axios.create({
        base_url,
        timeout:8000,
        timeoutErrorMessage :"Request time out Please Try Again ..!"
    })
    return client

}

const attatchToken = (req,tokenName) => {
    const authToken = localStorage.getItem('token')
    const tok = JSON.parse(authToken)

    if(authToken){
        req.headers.Authorization = `Bearer ${tok.access}`;
    }
    return req
}

const userAxiosInstance = createAxiosClient(Auth_Url)
userAxiosInstance.interceptors.request.use(async(req)=>{
    const modfiedReq = attatchToken(req,'token')
    return modfiedReq
})


export {userAxiosInstance}