import React,{useState,useEffect} from "react";
import { ToastContainer,toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import logo from "../image/profcio_logo.png"

function ConfirmMail(){
    const navigate = useNavigate()
    const [Email,setEmail] =useState({email:""})

    const [loading,setLoading] = useState(false)
    const handleLoading = () => setLoading((cur) =>!cur);

    useEffect(()=>{
        document.title ="Mail | Profcio"
        setEmail({...Email,email:localStorage.getItem('email')})
    },[]);

    const Gmail = () =>{
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")
    };
    return (
        <>
          {loading && <Loader />}
          
          <div className=" grid grid-rows mt-48">
            
            <div className="container mx-auto grid grid-rows-[13rem,5rem,3rem,5rem,4rem] -mt-32">
              <div className="flex justify-center">
                <img src={logo} className="w-56" alt="" />
              </div>
              <div className="mt-5 flex justify-center">
                <p className="font-semibold sm:text-2xl text-xl">
                  Verify your email to continue
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-center text-md">
                  Please check your email and select the link provided to verify
                  your <br /> address.
                </p>
              </div>
              <div className="flex justify-center ">
                <div className="flex justify-between sm:text-lg text-sm">
                  <button
                    onClick={Gmail}
                    color="black"
                    className="text-white bg-black rounded-full sm:px-6 px-4 ms-5 my-2 xs:me-0 me-3 font-bold"
                  >
                    Go to Gmail inbox
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </>
      );
    }
export default ConfirmMail;