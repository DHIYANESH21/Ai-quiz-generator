import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import Navbar from './Navbar'

const Signin = () => {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='flex justify-center items-center w-screen h-screen'>
            <div ><SignIn/></div>
        </div>
    </div>
    
  )
}

export default Signin