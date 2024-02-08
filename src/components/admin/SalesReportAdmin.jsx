import React, { useEffect, useState } from 'react'
import { Card, Typography, Button } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { DashboardUrl } from '../../constants/constants';

function SalesReport() {
    const [salesData, setSalesData] = useState([])
    const [totalAmountValue, setTotalAmountValue] = useState(0)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [status, setStatus] = useState('all')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const [managePage, setManagePage] = useState(false)
    
    const isValidFutureDate = (dateString) => {
        const inputDate = new Date(dateString);
        const currentDate = new Date();
        return !isNaN(inputDate) && inputDate > currentDate;
    }
    const generateReport = () => {
        setManagePage(false)
        let start_date = ''
        let end_date = ''
        if (dateStart && dateEnd) {

            if (dateStart == dateEnd) {
                setManagePage(true)

                toast.error('start date and end date should be diffrent')
            }
            if (isValidFutureDate(dateStart)) {
                setManagePage(true)
                toast.error("Enter Valid From date!");
            }
            if (isValidFutureDate(dateEnd)) {
                setManagePage(true)
                toast.error("Enter Valid To date!");
            }
            if (!dateRegex.test(dateStart)) {
                start_date = dateStart
            }
            if (!dateRegex.test(dateEnd)) {
                end_date = dateEnd
            }
        }
        axios.get(`${DashboardUrl}sales_report_admin/?start_date=${start_date}&end_date=${end_date}&booking_status=${status}`).then((response) => {

            if (response.data) {
                setSalesData(response.data)
                let value = 0
                const data = response.data
                for (let sales = 0; sales < data.length; sales++) {
                    let datasale = data[sales]
                    value += datasale.price
                }
                setTotalAmountValue(value)
            }
        }).catch((error) => {
            console.error("an error occured fetching", error);
        })
    }


    const downloadPdf = (responseData) => {
        const blob = new Blob([responseData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sales_report.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    const generatePdf = () => {

        let start_date = ''
        let end_date = ''
        if (dateStart && dateEnd) {

            if (dateStart == dateEnd) {
                setManagePage(true)

                toast.error('start date and end date should be diffrent')
            }
            if (isValidFutureDate(dateStart)) {
                setManagePage(true)
                toast.error("Enter Valid From date!");
            }
            if (isValidFutureDate(dateEnd)) {
                setManagePage(true)
                toast.error("Enter Valid To date!");
            }
            if (!dateRegex.test(dateStart)) {
                start_date = dateStart
            }
            if (!dateRegex.test(dateEnd)) {
                end_date = dateEnd
            }
        }
        axios.get(`${DashboardUrl}sales_report_pdf_admin/?start_date=${start_date}&end_date=${end_date}&booking_status=${status}`, { responseType: 'arraybuffer' })
            .then((response) => {
                downloadPdf(response.data);
                console.log(response, '>>>>>>>>>>>>>>>>>.......');

            }).catch((error) => {
                console.error("an error occured fetching", error);
            })
    }

    useEffect(() => {
        if (salesData.length == 0) {
            generateReport()
        }
    }, [salesData, managePage])



    console.log(salesData, '======================>>>>>>>>>>>>>>>>>');
    return (
        <div>

            <h1 className='text-5xl  text-center mb-4 text-black font-roboto-mono'>Sales Report</h1>
            <div className=' flex gap-5 justify-center'>
                <label onClick={handleOpen} >From</label>
                <input type="text" value={dateStart} onChange={(e) => setDateStart(e.target.value)} placeholder='YYYY-MM-DD' className='border-[1px] w-40 h-12 text-start p-2 text-black border-[#c3c3c4] rounded-md font-prompt-normal' />
                <label >To</label>
                <input type="text" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} placeholder='YYYY-MM-DD' className='border-[1px] w-40 h-12 text-start p-2 text-black border-[#c3c3c4] rounded-md font-prompt-normal' />
                <Button className='mb-3 bg-[#1f2861]' onClick={generateReport}>Filter Report</Button>
                <select onChange={(e) => setStatus(e.target.value)} className='w-36 h-12 font-prompt-normal pl-2 capitalize border-[1px] rounded-md border-[#b6b3b3]'>
                    <option value="all">all</option>
                    <option value="pending">pending</option>
                    <option value="ongoing">ongoing</option>
                    <option value="completed">completed</option>
                </select>
                <Button className='mb-3 bg-[#37c48e]' onClick={generatePdf}>Generate PDF</Button>

            </div>
            <div className="flex flex-col min-h-max items-center ">

                <Card className="h-full w-full">
                    <table className='w-full min-w-max table-auto text-left'>
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        Id
                                    </Typography>
                                </th>

                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        User
                                    </Typography>
                                </th>


                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        email
                                    </Typography>
                                </th>

                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        Phone Number
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >

                                        Booked date
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >

                                        Amount
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >

                                        Status
                                    </Typography>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-blue-gray-200">
                            {salesData ? (
                                salesData.map((sales, index) => (

                                    <tr key={index}>
                                        <td className='px-4 py-4 whitespace-nowrap'>{sales.id}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{sales.userDetails.username}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{sales.userDetails.email}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{sales.userDetails.phone_number}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{sales.booking_date}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>₹{sales.price}</td>

                                        <td className={`px-4 py-4 whitespace-nowrap text-white uppercase ${sales.booking_status === 'completed' ? 'bg-[#1cc643]' :
                                            sales.booking_status === 'ongoing' ? 'bg-[#fee81f]' :
                                                'bg-[#1dd0f4]'}`}>
                                            {sales.booking_status}
                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-4 text-sm text-blue-gray-500">No sales data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='flex justify-between text-2xl font-prompt-normal mt-3 mb-3'>
                        <div className='ml-5'>
                            Total Amount
                        </div>
                        <div className='mr-10'>
                            ₹{totalAmountValue}
                        </div>
                    </div>
                </Card>

                <ToastContainer />
            </div>
        </div>
    )
}

export default SalesReport


