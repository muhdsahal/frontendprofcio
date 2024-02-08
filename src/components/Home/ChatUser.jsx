import { faAdd, faEllipsisVertical, faPaperPlane, faSmileBeam, faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Avatar, Button, Card, List, ListItem, ListItemPrefix, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useApiContext } from '../../context/context';
import { Previos_Chat, WebSocket, UserDetailsURL, base_url } from '../../constants/constants';
import { jwtDecode } from 'jwt-decode';
import blankImage from '../../assets/blankprofile.png'
import { useLocation } from 'react-router-dom';
import { timeAgo } from '../../Helpers/TimeManage';

function ChatUser() {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const locations = useLocation()

    // const userdata = locations.state || ''

    const [clientstate, setClientState] = useState('');
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState([]);
    const [ChatList, setChatList] = useState([])
    const [recipientDetails, setrecipientDetails] = useState([])
    const [checkUser, setCheckUser] = useState('')




    const setUpChat = async () => {
        await axios.get(`${Previos_Chat}${decode.user_id}/${recipientDetails.id}/`).then(
            (response) => {
                if (response.status == 200) {
                    setMessages(response.data);
                }
            }
        );

        const client = new W3CWebSocket(
            `${WebSocket}${decode.user_id}/?${recipientDetails.id}`
        );
        setClientState(client);
        client.onopen = () => {
            console.log("WebSocket Client Connected");
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);

            if (dataFromServer) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        message: dataFromServer.message,
                        sender_email: dataFromServer.senderUsername,
                        
                    },
                ]);
            }
        };

        client.onclose = () => {
            console.log("Websocket disconnected");
        };

    }
    const sendMessage = () => {
        if (messageText === "") {
            return;
        } else {
            clientstate.send(
                JSON.stringify({
                    message: messageText,
                    senderUsername: recipientDetails.email,
                    recieverUsername: recipientDetails.email,
                })
            );
            setMessageText('')
        }
    }
    const StartChat = (event) => {

        const chatFound = ChatList.find((obj) => obj.email === event);
        if (chatFound) {
            setrecipientDetails(chatFound)
        }
    }
    useEffect(() => {
        if (decode) {
            if (decode.user_type === 'employee') {
                setCheckUser('user')    
            }
            else if(decode.user_type === 'user')
            {
                setCheckUser('employee')  
            }
        }
        axios.get(UserDetailsURL).then((response) => {
            setChatList(response.data)
            // if (userdata) {
            //     const Chatlists = response.data
            //     const chatFound = Chatlists.find((obj) => obj.email === userdata.data);
            //     if (chatFound) {
            //         setrecipientDetails(chatFound)
            //     }
            // }
        }).catch((error) => {
            console.log('error', error);
        })
        if (decode.user_id != null && recipientDetails.id != null) {
            setUpChat();
        }


    }, [recipientDetails]);

    return (
        <div>
        <h1 className="text-center text-black  text-5xl font-roboto-mono mb-4">Chat </h1>

            <div className='flex'>
                <Card className=' border-[1px]  ml-5 mt-2  '>

                    <Card className="w-full ">
                        <List className="min-h-20 max-h-full overflow-y-auto hidescroll overflow-x-hidden" >
                            {(ChatList.length === 0 ? <h1 className="text-center text-lg font-prompt-normal" style={{ paddingTop: '15px' }} >User not found</h1> :
                                (ChatList.map((ListChat, index) => (
                                    (decode.email != ListChat.email ?
                                        <div >
                                           {(ListChat.user_type === checkUser? <ListItem key={index} className='grid grid-cols-5' >
                                                <ListItemPrefix className='col-span-1'>
                                                    {ListChat.profile_photo ? (
                                                        <Avatar variant="circular" alt="candice" src={ListChat.profile_photo} />
                                                    ) : (
                                                        <Avatar variant="circular" alt="candice" src={blankImage} />
                                                    )}
                                                </ListItemPrefix>
                                                <div className='col-span-2' >
                                                    <Typography variant="h6" >
                                                        {ListChat.username}
                                                    </Typography>

                                                </div>
                                                <div onClick={(e) => StartChat(ListChat.email)} className='text-center w-10 h-9  ml-5   font-prompt bg-[#dadada] rounded-md text-white  '>
                                                    <FontAwesomeIcon icon={faPaperPlane} className=' text-[#051339]   w-6 h-6 mt-1    rounded-full hover:text-[#4c4b4b] rotate-45  ' />

                                                </div>
                                             

                                            </ListItem>:'')}
                                        </div> : null)
                                ))))}
                        </List>
                    </Card>

                </Card>

                {(recipientDetails.length != 0 ? <Card className='ml-24 w-[60%] h-[35rem]  min-w-96 mt-2 border-[1px]'>
                    <Card className=' w-full   rounded-b-none  h-20' color='light-blue' style={{ backgroundColor: "black" }} >
                        <div className='flex'>
                            <div>
                                {(recipientDetails.profile_photo ? 
                                <img src={recipientDetails.profile_photo}alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                    <UserCircleIcon className="ml-10 rounded-full w-14 h-14  mt-4 text-[#FAFAFA] " />)}
                            </div>
                            <h1 className='font-prompt-normal ml-3 mt-7 text-[#FAFAFA] text-lg uppercase '>{recipientDetails.username}</h1>
            
                        </div>
                    </Card>
                    <div className='overflow-y-auto overflow-x-hidden max-h-[75%] z-50 hidescroll min-w-96 '>

                        <div className='mt-2 flex flex-col mb-5'>
                            {messages.map((message) => (
                                <div key={message.id} className={message.sender_email === decode.email ? 'mt-2 mr-auto' : 'mt-2 ml-auto ' }>
                                    <div className={`font-prompt-normal text-lg max-w-32 ${message.sender_email === decode.email ? 'text-white bg-[#324674df]  max-w-96 mr-4 ' : 'text-black bg-[#d4d2d2] max-w-96 ml-4 '} rounded-md shadow-black w-fit`} style={{ fontWeight: "bold", overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-wrap', paddingLeft: '8px', paddingRight: '8px', paddingBottom: '2px', paddingTop: '2px' }}>
                                        {message.message}
                                    </div>             
                                    <h1 className={`${message.sender_email === decode.email ? 'text-right mr-4 float-right ' : 'text-left ml-4 float-left'} text-xs`}>{timeAgo(message.timestamp) == "NaN years ago"
                        ? "just now"
                        : timeAgo(message.timestamp)}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='absolute bottom-0 w-full bg-[#e3e2e2] flex gap-2'>

                        {/* <FontAwesomeIcon icon={faAdd} color='#000000' className='  w-6 h-6 mt-4 ml-2 mr-2 rounded-full hover:text-[#000000]    hover:bg-white hover:bg-opacity-100 hover:cursor-pointer ' /> */}
                        <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} className='w-[80%] h-12  rounded-md  border-[1px] border-black font-prompt' placeholder='Type a message' style={{ paddingLeft: '20px' }} />
                        <Button onClick={sendMessage} className='  bg-[hsl(0,0%,0%)] '>
                            <FontAwesomeIcon icon={faPaperPlane} className=' text-[#FAFAFA]  h-4 rounded-full hover:text-[#aeaaaa] rotate-45  ' />
                        </Button>
                    </div>
                </Card> : '')}
            </div>
        </div>
    )
}

export default ChatUser