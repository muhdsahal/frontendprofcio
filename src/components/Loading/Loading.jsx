import React from "react";
import {FadeLoader} from 'react-spinners';

const Loader = () =>{
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'>
          <FadeLoader color="blue" />
      </div>
    );
  };
export default Loader;