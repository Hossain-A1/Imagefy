import {motion} from 'motion/react'
import { assets } from '../assets/assets';

const Descriptions = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    >
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Trun your imagination into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img className='w-80 xl:w-96 rounded-lg' src={assets.sample_img_1} alt="sample image one" />

        <div>
          <h2 className='text-3xl font-medium max-w-lg mb-4'> Introducing the AI-Powered Text to Image Generator</h2>
          <p className='text-gray-600 mb-4'>"Introducing the AI-powered text-to-image generator, a cutting-edge tool that effortlessly transforms your words into stunning, high-quality visuals. Bring your ideas to life with precision and creativity like never before."</p>
          <p className='text-gray-600'>"Unleash your creativity with the AI-powered text-to-image generator. Turn simple text into visually stunning, detailed images in moments, perfect for any project or inspiration."</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Descriptions