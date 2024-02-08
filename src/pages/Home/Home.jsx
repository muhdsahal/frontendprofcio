import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar&Footer/Navbar'
import FooterPage from '../Navbar&Footer/FooterPage'
import ServiceListPage from './ServiceListPage';
import { Button } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";




function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar />
      <div className="p-6" style={{ backgroundColor: 'black' }}>
        <div className='text-center'>
          <h1 className=" leading-[160px] text-[160px] md:text-[130px] font-roboto-mono contact-highlight">
            Elevate through
            <br /> service, inspire<br />
            change
            <br />
            

          </h1>
          <div className="flex justify-center">
            <h2
              className="w-[800px] mt-10 text-center text-white  font-roboto-mono ">
              Professional services
              for your
              <br />Homes and commercial properties <br />
              Book Now Best  Employees <br />
        
              <Link to={"/employeelist"}>
                <Button className="btn-gradiant bg-gradient-to-r from-light-green-400 via-emerald-400 to-blue-600 mt-10">Click here</Button>
              </Link>
            </h2>
          </div>
        </div>
        
      </div>
      <ToastContainer />
      <ServiceListPage style={{backgroundColor:'black'}} />
      <FooterPage />

    </div>

  )
}

export default Home


