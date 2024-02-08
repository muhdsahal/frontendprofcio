

import React from "react";
import { useState, useEffect } from "react";
import { Dialog, Card, CardBody, CardHeader, CardFooter, Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import Modal from 'react-modal';
import { ServiceCatergoryURL } from "../../constants/constants";
import { ToastContainer, toast } from 'react-toastify';


//Modal.setAppElement('')
function CategoryService() {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [change, setChange] = useState(false)
  const handleOpenModal = () => setOpen((cur) => !cur);
  const editOpenModal = () => setEditOpen((cur) => !cur);
  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState([])
  const [editCategoryId, setEditCategoryId] = useState('')
  const [manageState, setManageState] = useState(false)


  useEffect(() => {
    setManageState(false)

    axios
      .get(ServiceCatergoryURL)
      .then((response) => {
        const responseData = response.data;
        setCategory(responseData)


      })
      .catch((error) => {
        console.error("Error Fetching Data:", error);
        // setLaoding(false)
      })

  }, [manageState, change])


  const CreateCategory = () => {


    if (categoryName.trim().length < 3) {
      toast.error("Category name must be at least 3 characters long");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(categoryName.trim()) || !isNaN(categoryName.trim())) {
      toast.error("Category name can only contain letters. Numbers and minus numbers are not allowed.");
      return;
    }
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    if (category.some(item => item.name === categoryName)) {
      toast.error("Category name already exists");
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName)

    axios.post(ServiceCatergoryURL, formData)
      .then(resposnse => setCategory([...category, resposnse.data])),
      setCategoryName('')
    toast.success("Categoty Created SuccessFully!")
    setChange(!change)
    setManageState(true)
      .catch(error => {
        console.log("error creating service", error);
      })
    handleOpenModal()
  }


  const editHandleCategory = (e) => {
    const value = category.find((obj) => obj.id === e)
    setCategoryName(value.name)
    console.log("Edit Handle Category: ", e);

    setEditCategoryId(e);
    axios.get(`${ServiceCatergoryURL}${e}/`)
      .then(response => {
        console.log("Category data:", response.data);
        setCategoryName(response.data.name);

        return response.data;

      })
      .catch(error => {
        console.error("Error editing category", error);
      });
    editOpenModal();
  }

  const CategoryEdit = () => {
    if (categoryName.trim().length < 3) {
      toast.error("Category name must be at least 3 characters long");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(categoryName.trim()) || !isNaN(categoryName.trim())) {
      toast.error("Category name can only contain letters. Numbers and minus numbers are not allowed.");
      return;
    }
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    if (category.some(item => item.name === categoryName)) {
      toast.error("Category name already exists");
      return;
    }


    const formData = new FormData();
    formData.append('name', categoryName);

    axios.put(`${ServiceCatergoryURL}${editCategoryId}`, formData)
      .then(response => {
        setCategoryName('');
        console.log("Edit successful");
        toast.success("category edited successfully..!");
        setChange(!change)
        setManageState(true)
      })
      .catch(error => {
        console.error("Error editing category", error);
      });
    editOpenModal();
  };

  const classes = "p-4 border-b border-blue-gray-50";

  const getSortedCategory = () => {
    return category.slice().sort((a, b) => a.id - b.id);
  };
  const buttonStyle = {
    backgroundColor: 'lightseagreen',
    color: 'white', // Optionally, set text color
  };
  const cancelButton = {
    backgroundColor: 'red',
    color: 'white', // Optionally, set text color
  };
  return (
    <div className="flex flex-col  items-center justify-center">
<h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">Category</h1>

      <Card className="my-4 mx-4 overflow-x-auto">
        <div>
          <Button
            style={buttonStyle}
            onClick={handleOpenModal}

          >
            Create Category
          </Button>
        </div>
      </Card>
      <Card className="h-full w-full ">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>

              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Id
                </Typography>
              </th>
              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Name
                </Typography>
              </th>
              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"

                >
                  Edit
                </Typography>
              </th>

            </tr>
          </thead>
          <tbody>
            {getSortedCategory().map((category) => (
              <tr key={category.id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {category.id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {category.name}
                  </Typography>
                </td>


                <td className={classes}>
                  <Button

                    onClick={(e) => editHandleCategory(category.id)}
                    style={buttonStyle}
                  >
                    Edit
                  </Button>

                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </Card>

      <Dialog
        open={open}
        onClose={handleOpenModal}
        aria-labelledby="form-dialog-title"
        maxWidth="xl"

        modalStyle={{
          overlay: {
            backgroundColor: 'rgba(44, 44, 44, 0.8)', // Change the color here
          },
        }}
      >
        <Card>
          
            <Typography variant="h3" color="blue">Create Service</Typography>
          <CardBody>
          
              <Input
                type="text"
                color="lightBlue"
                placeholder="Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            
          </CardBody>
          <CardFooter className="pt-0">
            
              <Button style={buttonStyle}
                fullWidth
                onClick={CreateCategory}
              >
                Create
              </Button>
              <Button style={cancelButton}
                fullWidth
                onClick={handleOpenModal}
              >
                Cancel
              </Button>
            
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog

        open={editOpen}
        onClose={editOpenModal}
        className="bg-transparent shadow-none bg-coolGray-50"
        maxWidth="xl"
      >
        <Card >
            <Typography variant="h4" color="blue">
              Edit Service
            </Typography>
            <CardBody>
              Name:
              <Input
                type="text"
                name="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full"
              />
            </CardBody>
          <CardFooter className="pt-0 flex  gap-2">
            <Button style={buttonStyle}
              onClick={CategoryEdit} fullWidth>
              Edit Service
            </Button>
            <Button style={cancelButton}
              onClick={editOpenModal} fullWidth>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      <ToastContainer />
    </div>


  )
}
export default CategoryService;




