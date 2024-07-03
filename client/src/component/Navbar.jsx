import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import {  Link } from 'react-router-dom';


const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  // console.log(user)

  return (
    <div className='flex justify-between sm:gap-5  shadow-lg  h-20 z-50 px-20   items-center text-white absolute w-screen sm:flex-col sm:bg-black sm:h-32 '>
      <Link to='/' className='text-4xl text-[#DDA6FF]  font-semibold hover:cursor-pointer sm:mt-2 '>CineTracker!</Link>
      <div className='flex text-lg gap-7  items-center sm:gap-20 sm:pb-4 '>
        {
          user ? (
            <>
             <Link to="/watchlist" className='hover:text-[#DDA6FF] hover:cursor-pointer transition duration-300'>My Watchlist</Link>
             <Link className='bg-white text-black hover:cursor-pointer sm:mb-5 font-semibold hover:bg-[#DDA6FF] px-4 py-2 rounded-md transition duration-300 cursor-pointer '
             onClick={()=>{
               dispatch(logout()).then(()=>{
                  alert('Logout Successful!')
                }
                )

               
              }}
             to="/login">Logout</Link>
            </>
          ) : (
            <>
            <Link to="/" className='hover:text-[#DDA6FF] hover:cursor-pointer transition duration-300 sm:text-xl'>Home</Link>
              <Link to="/login" className='hover:text-[#DDA6FF] hover:cursor-pointer transition duration-300 sm:text-xl'>Login</Link>
              <Link to=
               "/register"
              className='hover:text-[#DDA6FF] hover:cursor-pointer transition duration-300 sm:text-xl'>Register</Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
