import React from 'react'
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Drawer from './Drawer';
import { FaArrowLeft } from 'react-icons/fa';



function NavBar() {
  const navigate = useNavigate();
  return (
    <div className='fixed items-center py-2 bg-white top-0 w-full px-3 border-b-2 border-black flex justify-between'>
      <div>
        <p className='text-black'>dsdsd</p>
      </div>
      <ul className='flex '>
        <li><Link className='px-2' to="/">Home</Link></li>
        <li><Link className='px-2' to="/allsentences">Phrases</Link></li>
        <li><Link className='px-2' to="/play">playScene</Link></li>
      </ul>

      <div className='flex'>
        <button   className="text-gray-600 hover:border-gray-400 hover:text-gray-800 px-6 py-2 rounded"
 onClick={() => navigate(-1)}>
          <FaArrowLeft />

        </button>
        <Drawer />



      </div>
    </div>
  )
}

export default NavBar