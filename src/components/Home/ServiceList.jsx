import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from "@material-tailwind/react";
import { ServiceCatergoryURL, ServiceListURL, base_url } from '../../constants/constants';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState([]);


  useEffect(() => {
    // axios.get(ServiceCatergoryURL)
    //   .then(response => {
    //     setCategory(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching category options:', error);
    //   });

    axios.get(ServiceListURL)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching service data:', error);
      });

  }, []);


  console.log();

  return (
    <div style={{ backgroundColor: 'black' }}>

      <div>
      {/* <h1
        className="flex  justify-center text-center font-roboto-mono text-white"
      >
        Categories
      </h1>
        
        <div className="grid md:grid-cols-3 grid-col-1 p-16 gap-6">
          {category.map((cate,index)=>(
            <div key={index} className="border-4 rounded-3xl p-16 hover:bg-blue-400 hover:text-black">
            <h1 className="text-2xl font-bold">{cate.name}</h1>
            <p>Founders Joined Wishlist</p>
            
          </div>
            ))}
        </div> */}
      </div>
      <h1
        className="flex  justify-center text-center font-roboto-mono text-white"
      >
        Services
      </h1>

      <div className='flex flex-wrap justify-center p-4 gap-3'>
        {services.map((service, index) => (
          <div key={index} className="w-full md:w-2/5 border-4 rounded-3xl hover:bg-blue-400 border-y-white py-4  shadow-md">
            <div className="text-[40px]">🛠️</div>
            <div>
              <h1 className="text-lg sm:text-2xl from text-white font-bold mt-2">{service.name}</h1>
              <p className="text-sm mt-2 text-white">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>



    </div>


  );
};

export default ServiceList;


