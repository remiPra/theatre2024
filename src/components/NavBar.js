import React from 'react'
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Drawer from './Drawer';
import { FaArrowLeft, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { CiHome } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileAudio } from "react-icons/fa6";
import { useAuth } from '../AuthContext'; // Assurez-vous que le chemin est correct




function NavBar() {

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Utilisez logout si vous avez une fonction pour se déconnecter



  const handleLogout = () => {
    console.log('Déconnexion en cours...');

    logout();
    window.location.href = '/login'; // Redirection forcée
  };



  return (
    <div className='fixed z-10 h-[80px]  bg-red-100 py-2 top-0 w-full px-5 border-b-2 border-black flex '>
      <div className='relative  items-center w-full flex justify-between'>
        <div>
          <p className='text-black'><CiHome className='text-[30px] text-blue-900' /></p>
        </div>
        <ul className='absolute flex justify-center items-center' style={{ left: 300, right: 300, margin: 'auto', zIndex: 1 }}>
          <li><Link className='px-2' to="/"><CiHome className='text-[30px] border border-x-blue-800 font-bold mx-2 text-blue-900 ' /></Link></li>
          <li><Link className='px-2' to="/allsentences"><IoDocumentTextOutline className='text-[30px] text-blue-900 mx-2 ' /></Link></li>
          <li><Link className='px-2' to="/audio"><FaRegFileAudio className='text-[30px] text-blue-900 mx-2 ' /></Link></li>
        </ul>

        <div className='flex'>
          {/* <button className="text-gray-600 hover:border-gray-400 hover:text-gray-800 px-6 py-2 rounded"
            onClick={() => navigate(-1)}>
            <FaArrowLeft />

          </button> */}
          {/* Affichez l'état de connexion ici */}
          {isAuthenticated ? (
            <button className='text-[30px] border font-bold mx-2 text-blue-900'
              onClick={handleLogout}>
              <FaSignOutAlt />
            </button>


          ) : (
           
            <button className='text-[30px] border font-bold mx-2 text-blue-900'>
                  <Link to="/login">
                  <FaSignInAlt />
              </Link>
                </button>
          
          )}
          <Drawer />



        </div>
      </div>
    </div>
  )
}

export default NavBar