import React, { useState, useEffect } from "react";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import {Card,Typography,Button,} from "@material-tailwind/react";
import Loader from "../Loading/Loading";
import { UserDetailsURL, User_Block_Unblock  } from "../../constants/constants";

function UserList() {
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(false)
    const [users,setUsers ] = useState([])
    
    useEffect(() => {

        axios
            .get(UserDetailsURL)
            .then((response) => {
                const responseData = response.data;
                setUserList(responseData)
                

                
            })
            .catch((error) => {
                console.error("Error Fetching Data:", error);
                setLoading(false)
            })

    }, [])

    const handleBlockUnblock =(id,is_active) => {
        setLoading(true)
        const data = { is_active: !is_active }
    axios.patch(`${User_Block_Unblock}/${id}/`,data)
        .then((response) => {
            setUserList((prevUserList) =>{
                return prevUserList.map((user) => {
                    if(user.id === id){
                        return { ...user,is_active:!is_active };
                    }
                    
                    return user;
                });
            })
        })
        .catch((error)=>{
            console.error("Error Updating user status:",error);
            toast.error("Error Updating user status:");
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div className="flex flex-col min-h-screen items-center ">
        <h1 className="text-center text-black  text-5xl font-roboto-mono mb-4">Users</h1>

            <Card className="h-full w-full">
                <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                        <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Id
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Name
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Email
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    User Type
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Action
                                </Typography>
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => {
                            const classes =  "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={user.id}>
                                <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {user.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {user.username}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {user.email}
                                        </Typography>
                                    </td>
                                    
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {user.user_type}
                                        </Typography>
                                    </td>
                                        <td className={classes}>
                                            {loading ? (
                                                <Loader />
                                            ):(
                                        !user.is_active ? (
                                            <Button className="bg-[#2dcf5d] w-18" onClick={() => handleBlockUnblock(user.id, user.is_active)}>
                                                Unblock
                                            </Button>
                                            ) : (
                                            <Button className="bg-[#e32b2e] w-18" onClick={() => handleBlockUnblock(user.id, user.is_active)}>
                                                <span className="-ml-2">Block</span>
                                            </Button>
                                            )
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ToastContainer />
            </Card>
        </div>
    );

}
export default UserList;