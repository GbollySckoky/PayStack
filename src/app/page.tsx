import React from 'react'
import Email from '@/Components/Mail/Email'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
const page = () => {
  return (
    <div>
      <ToastContainer />
      <Email />
    </div>
  )
}

export default page