import React from 'react'
import './ErrorPage.css'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const Navigate = useNavigate()

    return (
        <div className=" flex flex-col not-found-container w-full contact-errorpage gap-5">
            <div className="not-found-content">
                <h2 className='font-roboto-mono text-6xl'>404 - Not Found</h2>
                <p className='font-prompt text-xl'><span className='text-2xl font-prompt-normal'>Sorry</span>  the page you are looking for does not exist</p>
            </div>
            <Button onClick={(e) => Navigate('/')} className='w-48 h-16 text-lg font-prompt-normal text-black bg-transparent border-[1px] border-black border-opacity-20 shadow-2xl' > Go to Home</Button>
        </div>
    )
}

export default ErrorPage