import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Header = () => {
  const { user, setModal } = useContext(AppContext);
  const navigate = useNavigate();
  const handleRedirect = () => {
    if (user) {
      navigate("/result");
    } else {
      setModal(true);
    }
  };
  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-20'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className='text-stone-500 inline-flex border items-center gap-1 border-neutral-500 bg-white py-1 px-6 rounded-full'
        initial={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt='star icon' />
      </motion.div>

      <motion.h1
        className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        {" "}
        Trun text to <span className='text-blue-600'> image</span>, in seconds.
      </motion.h1>
      <motion.p
        className='text-center max-w-xl mx-auto 
       mt-5'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Create stunning visuals effortlessly with the best text-to-image
        generator. Transform words into vibrant, detailed, and high-quality
        images in seconds.
      </motion.p>

      <motion.button
        onClick={handleRedirect}
        className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        Generate Images
        <img className='h-6' src={assets.star_group} alt='start group' />
      </motion.button>

      <motion.div
        className='flex flex-wrap justify-center mt-16 gap-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      >
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
      </motion.div>
      <p className='mt-2 text-neutral-600'>Generated images from imagify</p>
    </motion.div>
  );
};

export default Header;
