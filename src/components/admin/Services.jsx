

import React, { useState, useEffect } from 'react';
import { Dialog, Card, CardBody, CardFooter, Button, Input, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { ServiceListURL, ServiceCatergoryURL } from '../../constants/constants';
import { ToastContainer, toast } from 'react-toastify';

const ServiceListPage = () => {

  const [open, setOpen] = React.useState(false);
  const [change, setChange] = useState(false)
  const [editOpen, seteditOpen] = React.useState(false);
  const handleOpenModal = () => setOpen((cur) => !cur);
  const editOpenModal = () => seteditOpen((cur) => !cur);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [serviceName, setserviceName] = useState('');
  const [serviceDiscription, setserviceDiscription] = useState('');
  const [serviceCategory, setserviceCategory] = useState('');
  const [serviceImage, setserviceImage] = useState(null);
  const [editServiceData, seteditServiceData] = useState([])
  const [editService_id, seteditService_id] = useState('')
  const [services, setServices] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);



  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setserviceImage(file);
  };



  const tokenDataString = localStorage.getItem("access_token");
  useEffect(() => {
    const fetchService = async () => {
      try {

        const response = await fetch(ServiceListURL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenDataString}`,
            "Content-type": "application/json"
          },
        })
        const responseData = await response.json()
        setServices(responseData)
      } catch (err) {
        console.error(err, "Error in useEffect");
      }
    }

    fetchService()

    axios.get(ServiceCatergoryURL)
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });
  }, [change])




  const serviceCreate = async () => {

    if (!serviceName.trim()) {
      toast.error("Service name cannot be empty");
      return;
    }

    if (serviceName.trim().length < 3) {
      toast.error("Service name must be at least 3 characters long");
      return;
    }

    if (!serviceName || !serviceCategory) {
      toast.error('Service name and category are required.');
      return;
    }

    const isDuplicate = services.some(
      (service) =>
        service.name === serviceName.toLowerCase() &&
        service.category === serviceCategory.toLowerCase()
    );


    if (isDuplicate) {
      toast.error('Service with the same name and category already exists.');
      return;
    }

    if (!/^[a-zA-Z]+$/.test(serviceName.trim()) || !isNaN(serviceName.trim())) {
      toast.error("Service name can only contain letters. Numbers and minus numbers are not allowed.");
      return;
    }

    // if (services.some(service => service.name === serviceName)) {
    //     toast.error("Service name already exists. Please choose a different name.");
    //     return;
    // }

    if (!serviceDiscription.trim()) {
      toast.error("Service description cannot be empty");
      return;
    }



    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('description', serviceDiscription);
    formData.append('category', serviceCategory);
    formData.append('service_image', serviceImage);
    try {

      const response = await fetch(ServiceListURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenDataString}`

        },
        body: formData
      });
      // console.log(responseData,'responseDataresponseDataresponseData');
      if (!response.ok) {
        toast.error("an error occured while creating !")

      } else {
        setserviceName(''),
          setserviceDiscription(''),
          setserviceCategory(''),
          setserviceImage(null),
          toast.success("Service Created SuccessFully")
        setChange(!change)
      }

    } catch (err) {
      console.error(err, "an Error during");
    }
    handleOpenModal()
  }


  const editHandleService = (e) => {
    seteditService_id(e)
    axios.get(`${ServiceListURL}${e}/`)
      .then(response => {
        setserviceName(response.data.name);
        setserviceDiscription(response.data.description);
        setserviceCategory(response.data.category);
        setserviceImage(response.data.service_image);
        console.log(editServiceData, 'llllllllllll');
        return response.data;
      })
      .catch(error => {
        console.error('Error editing service:', error);
      });

    editOpenModal()
  }


  const serviceEdit = () => {
    if (!serviceName.trim()) {
      toast.error("Service name cannot be empty");
      return;
    }

    if (serviceName.trim().length < 3) {
      toast.error("Service name must be at least 3 characters long");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(serviceName.trim()) || !isNaN(serviceName.trim())) {
      toast.error("Service name can only contain letters. Numbers and minus numbers are not allowed.");
      return;
    }

    if (!serviceName) {
      toast.error("service name cannot be empty")
      return
    }
    if (!serviceCategory) {
      toast.error("category  name cannot be empty")
      return
    }


    if (!serviceDiscription.trim()) {
      toast.error("Service description cannot be empty");
      return;
    }
    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('description', serviceDiscription);
    formData.append('category', serviceCategory);
    // formData.append('service_image', serviceImage);

    axios.put(`${ServiceListURL}${editService_id}/`, formData)
      .then(response => {
        setserviceName(''),
          setserviceDiscription(''),
          setserviceCategory(''),
          setserviceImage(null),
          toast.success("Service Edited  successfully!"),
          console.log(' edit successfull')
        setChange(!change)
      })
      .catch(error => {
        console.error('Error editing service:', error);
        // Handle error display or other actions as needed
      });
    editOpenModal()

  }



  const getSortedServices = () => {
    return services.slice().sort((a, b) => a.id - b.id);
  };
  const buttonStyle = {
    backgroundColor: 'lightseagreen',
    color: 'white', // Optionally, set text color
  };
  const cancelColor = {
    backgroundColor: 'red',
    color: 'white', // Optionally, set text color
  };



  const classes = "p-4 border-b border-blue-gray-50";

  return (
    <div className="flex flex-col min-h-screen items-center ">
      <h1 className="text-center text-black absolute text-5xl -mt-7 font-roboto-mono mb-4">Services</h1>


      <Card className="my-4 mx-4">
        <div >
          <Button
            style={buttonStyle}
            onClick={handleOpenModal}
          >
            Create Service
          </Button>
        </div>
      </Card>

      <Card className="h-full w-full">
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Id
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Name
                </Typography>
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Category
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Action
                </Typography>
              </th>

            </tr>
          </thead>

          <tbody>
            {getSortedServices().map((service) => (
              <tr key={service.id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {service.id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {service.name}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {categoryOptions.find(category => category.id === service.category)?.name || 'N/A'}

                  </Typography>

                </td>
                <td className={classes}>
                  <Button
                    style={buttonStyle}
                    onClick={(e) => editHandleService(service.id)}
                  >
                    Edit
                  </Button>
                </td>

              </tr>

            ))}
          </tbody>
        </table>
      </Card>




      <>

        <Dialog
          open={open}
          onClose={handleOpenModal}
          aria-labelledby="form-dialog-title"
          maxWidth="xl"

        >
          <Card className='flex flex-wrap gap-2'>

            <Typography variant="h4" color="blue">
              Create Service
            </Typography>

            <CardBody className='flex flex-wrap gap-2'>
              <Input
                type="text"
                name="name"
                label="name"
                value={serviceName}
                onChange={(e) => setserviceName(e.target.value)}
                fullWidth

              />


              <Input
                type="text"
                name="description"
                label='description'
                value={serviceDiscription}
                onChange={(e) => setserviceDiscription(e.target.value)}
                fullWidth

              />
              <br />

              <div className="flex gap md:w-86 h-10">
                <select
                  name="category"
                  value={serviceCategory}
                  onChange={(e) => setserviceCategory(e.target.value)}
                  className="border-[1px] border-[#747676]"
                >
                  <option value="" disabled>Select a service category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

              </div>


              <Typography variant="h6">
                image
                <input
                  type="file"
                  name="service_image"
                  onChange={handleFileInputChange}
                />
              </Typography>



            </CardBody>
            <CardFooter className='flex flex-wrap gap-2'>
              <Button style={buttonStyle}
                onClick={serviceCreate} fullWidth>
                Create Service
              </Button>
              <Button style={cancelColor} onClick={handleOpenModal} fullWidth>
                cancel
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </>

      <>

        <Dialog

          open={editOpen}
          onclose={editOpenModal}
          aria-labelledby="form-dialog-title"
          maxWidth="xl"

        >
          <Card className='flex flex-wrap gap-3'>

            <Typography variant="h4" color="primary">
              Edit Service
            </Typography>

            <CardBody className='flex flex-wrap gap-2'>
              <Input
                type="text"
                label="Name"
                name="name"
                value={serviceName}
                onChange={(e) => setserviceName(e.target.value)}
                fullWidth

              />


              <Input
                label="description"
                type="text"
                name="description"
                value={serviceDiscription}
                onChange={(e) => setserviceDiscription(e.target.value)}
                fullWidth
              />

              <div className="flex gap md:w-86 h-10">
                <select
                  name="category"
                  value={serviceCategory}
                  onChange={(e) => setserviceCategory(e.target.value)}
                  className="border-[1px] border-[#747676]"
                >
                  <option value="" disabled>Select a service category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <Typography variant="h6">
                image
                <input
                  type="file"
                  name="service_image"
                  // value={editServiceData.service_image}
                  onChange={handleFileInputChange} />
              </Typography>
            </CardBody>
            <CardFooter className='flex flex-wrap gap-2'>
              <Button style={buttonStyle} onClick={serviceEdit} fullWidth>
                Edit Service
              </Button>
              <Button style={cancelColor} onClick={editOpenModal} fullWidth>
                cancel
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </>

      <ToastContainer />
    </div>
  );
};

export default ServiceListPage;














