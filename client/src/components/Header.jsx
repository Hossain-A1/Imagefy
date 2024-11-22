import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
      <div className='text-stone-500 inline-flex border items-center gap-1 border-neutral-500 bg-white py-1 px-6 rounded-full'>
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt='star icon' />
      </div>

      <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>
        {" "}
        Trun text to <span className='text-blue-600'> image</span>, in seconds.
      </h1>
      <p
        className='text-center max-w-xl mx-auto 
       mt-5'
      >
        Create stunning visuals effortlessly with the best text-to-image
        generator. Transform words into vibrant, detailed, and high-quality
        images in seconds.
      </p>

      <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>
        Generate Images
        <img className='h-6' src={assets.star_group} alt='start group' />
      </button>

      <div className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(6)
          .fill("")
          .map((item, i) => (
            <img
              className='rounded hover:scale-105 transition-all duration-700 cursor-pointer max-sm:w-10'
              src={i % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt='simple image one'
              key={i}
              width={70}
            />
          ))}
      </div>
      <p className="mt-2 text-neutral-600">Generated images from imagify</p>
    </div>
  );
};

export default Header;
