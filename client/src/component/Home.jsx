import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import anime from '../assets/home.json'
import Lottie from 'lottie-react'
import homeimg from '../assets/Homeimg.png'

const Home = () => {
  const user = useSelector((state) => state.auth.user)


  return (
    <div className='z-10 px-20 flex sm:px-0 '>
    <div className=" z-10 gap-5 flex-1 flex flex-col items-center justify-center ">
    <p className="text-white text-center text-6xl font-bold mb-4 drop-shadow-lg sm:text-5xl">Welcome to  <p className='text-[#DDA6FF] text-center text-7xl sm:text-6xl font-bold m'>CineTracker!</p></p>
    
    <p className="text-white text-center text-xl font-medium max-w-2xl drop-shadow-md">
      Manage your movie watchlist with ease. Add, edit, and delete movies, mark them as watched or unwatched, and share your ratings and reviews. With CineTracker, you'll never miss a film again. Start your cinematic journey today!
    </p>
    <Link to={user ? "/watchlist" : "/login"} className='px-8 sm:px-6 sm:w-fit py-4 mt-2 text-white text-2xl sm:text-xl font-semibold bg-[#DDA6FF] rounded-lg hover:bg-[#B153E0] transition duration-300 shadow-lg'>
      Get Started!
    </Link>
    </div>

   <div className='flex-1 flex justify-center sm:hidden'>
   <img src={homeimg} alt="" className=' w-2/3 ' />
   </div>


  </div>
  )
}

export default Home