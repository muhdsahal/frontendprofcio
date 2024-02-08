import React from "react";
import { ClockLoader } from "react-spinners";

const CustomClockLoader = () =>{
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'>
          <ClockLoader color="#4c5856" />
      </div>
    );
  };

  export default CustomClockLoader