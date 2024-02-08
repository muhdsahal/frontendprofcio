import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

// Import your logo image

function UserType() {
  const navigate = useNavigate();

  const handleSignup = (userType) => {
    // Redirect based on user type selected during signup
    if (userType === "employee") {
      navigate("/employee_login");
    } else if (userType === "user") {
      navigate("/login/");
    }
    // Add logic for admin signup if needed
  };
  const backgroundStyle = {
    backgroundImage: `url()`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
      

      <div className="bg-cover bg-center min-h-screen" style={backgroundStyle}>

        <div className="flex justify-center items-center min-h-screen">
          <div className="w-96 ">
          {/* <img src={logoImage} alt="Logo" className="mx-auto " /> */}

            <div className="bg-white shadow-2xl rounded p-8 border border-b-transparent p-17 ">

              <div className="mb-4">
                <h3 className="text-center text-2xl font-semibold">
                  Let 's get you started
                </h3>
                <h5 className=" text-center text-sm font-semibold">You're a</h5>
              </div>
              <ToastContainer />
              <div className="flex justify-between">
                <button
                  className="bg-pink-500 hover:bg-yellow-400 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSignup("employee")}
                >
                  employee
                </button>
  
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSignup("user")}
                >
                  User
                </button>
              </div>
  
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/user/login" className="text-blue-500">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UserType;
