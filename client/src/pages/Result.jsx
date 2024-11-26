import React, { useState } from "react";
import { assets } from "../assets/assets";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadig, setLoading] = useState(false);

  return (
    <form className='flex flex-col min-h-[90vh] justify-center items-center gap-5'>
      <div>
        <div className='relative'>
          <img
            className='max-w-sm rounded'
            src={assets.sample_img_1}
            alt='result i,age'
          />

          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loadig ? "w-full transition-all duration-[10s] " : "w-0"
            } `}
          />
        </div>

        <p className={!loadig ? "hidden" : "block"}>Loading.....</p>
      </div>

      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-neutral-500 text-white rounded-full '>
          <input
            type='text'
            placeholder='Descripe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'
          />

          <button
            type='submit'
            className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p
            onClick={() => setIsImageLoaded(false)}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
          >
            Generate Another
          </p>
          <a
            className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'
            href={image}
            download
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
