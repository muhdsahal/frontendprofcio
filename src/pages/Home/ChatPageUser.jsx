import React from 'react'
import ChatUser from '../../components/Home/ChatUser'
import FooterPage from '../Navbar&Footer/FooterPage'
import Navbar from "../Navbar&Footer/Navbar";

function ChatPageUser() {
  return (
    <div>
        <Navbar />
        <ChatUser />
        <br />
        <FooterPage />
    </div>
  )
}

export default ChatPageUser