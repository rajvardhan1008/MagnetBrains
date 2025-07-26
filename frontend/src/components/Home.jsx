import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <div className='w-full flex flex-col gap-8'>
        <div className='w-full text-center mt-8'>
            <h1 className='text-3xl font-bold'>Welcome to QuickShop Electronics</h1>
        </div>

        <div className='w-full flex items-center justify-center mt-20 flex-col gap-4'>
            <button className="text-3xl font-bold bg-amber-500 py-2 px-4 rounded-md cursor-pointer" 
            onClick={() => navigate('/signup')}>Create Account</button>
            <button className="text-3xl font-bold bg-red-500 py-2 px-4 rounded-md cursor-pointer" 
            onClick={() => navigate('/login')}>LogIn</button>
        </div>
    </div>
  )
}

export default Home