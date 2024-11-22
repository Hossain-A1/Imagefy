import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(false);
  return (
    <div className='flex items-center justify-between py-4'>
      <Link to='/'>
        <img
          className='cursor-pointer w-28 sm:32 lg:w-40'
          src={assets.logo}
          alt='logo'
        />
      </Link>
      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-5'>
            <Link to='/buy' className='cursor-pointer block'>
              Pricing
            </Link>
            <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>
              Login
            </button>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-5'>
            <div className='flex gap-1 items-center px-4 py-[0.7rem] rounded-full bg-slate-300 text-black font-medium  cursor-pointer hover:scale-105 transition-all duration-700'>
              <img className='w-4' src={assets.credit_star} alt='star icon' />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>
                Credits left:{" "}
                <span className='text-blue-600 font-extrabold'>5</span>
              </p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-gray-600 max-sm:hidden pl-4'>Hi! Hossain</h1>
              <div className='relative group'>
                <img
                  className='w-10'
                  src={assets.profile_icon}
                  alt='profile icon'
                />
                <Link
                  className='absolute hidde group-hover:block top-0 right-0 z-10 text-black rounded mt-14 shadow-red-600 font-medium shadow-sm p-2'
                  to='/'
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
