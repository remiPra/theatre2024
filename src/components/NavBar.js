import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='flex justify-between'>
       <p className='text-black'>dsdsd</p> 
       <li><Link to="/">Home</Link></li>
       <li><Link to="/about">About</Link></li>

        NavBar</div>
  )
}

export default NavBar