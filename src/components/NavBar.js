import React from 'react'
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Drawer from './Drawer';
import { FaArrowLeft } from 'react-icons/fa';
import { CiHome } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileAudio } from "react-icons/fa6";



function NavBar() {
  const navigate = useNavigate();
  return (
    <div className='fixed z-10   py-2 bg-red-50 top-0 w-full px-5 border-b-2 border-black flex '>
      <div className='relative items-center  bg-red-50  w-full flex justify-between'>
        <div>
          <p className='text-black'><CiHome className='text-[30px]' />
</p>
        </div>
        <ul className='absolute flex w-full justify-center items-center'>
          <li><Link className='px-2' to="/"><CiHome className='text-[30px] mx-1' /></Link></li>
          <li><Link className='px-2' to="/allsentences"><IoDocumentTextOutline className='text-[30px] mx-1' />
</Link></li>
          <li><Link className='px-2' to="/audio"><FaRegFileAudio className='text-[30px] mx-1' /></Link></li>
        </ul>

        <div className='flex'>
          <button className="text-gray-600 hover:border-gray-400 hover:text-gray-800 px-6 py-2 rounded"
            onClick={() => navigate(-1)}>
            <FaArrowLeft />

          </button>
          <Drawer />



        </div>
      </div>
    </div>
  )
}

export default NavBar