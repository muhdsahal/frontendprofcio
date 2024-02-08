import React from 'react'
import ResponseNavBar from '../../components/Navbar&Footer/Navbar'
import { LinearProgress } from '@mui/material'

function Navbar() {
  return (
    <>
    <ResponseNavBar />
    <LinearProgress
  className='bg-gradient-to-r from-light-green-400 via-emerald-400 to-blue-600'
  variant="determinate"
  value={100}  // Set the value to 100 to make it appear as a full bar
/>

    </>
  )
}

export default Navbar