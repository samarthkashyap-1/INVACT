import React, { useState, useEffect } from 'react';
import bgimg1 from "../assets/bg1.jpg";
import bgimg2 from "../assets/bg2.jpg";
import bgimg3 from "../assets/bg3.jpg";
import bgimg4 from "../assets/bg4.jpg";
import bgimg5 from "../assets/movies.png";

import { Outlet } from 'react-router-dom';

const LandingTheme = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const bgImages = [bgimg1, bgimg2, bgimg3, bgimg4, bgimg5];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
        setFade(false);
      }, 500); // Match this duration to the CSS transition duration
    }, 10000); 

    return () => clearInterval(interval);
  }, [bgImages.length]);

  return (
    <div className="relative flex min-h-screen w-screen px-10 ">
      <div
        className={`absolute inset-0 transition-opacity duration-500  ${fade ? 'opacity-65' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${bgImages[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >

      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-80 backdrop-blur"></div>
    <div className='relative flex justify-center items-center w-full'>
          
          <Outlet />
    </div>
    </div>
  );
};

export default LandingTheme;
