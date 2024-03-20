import React from 'react'
import { FaMicrophone } from 'react-icons/fa'

function BuddhaEnter(props) {
  return (
    <div className='overflow-x-hidden'>

        <img  src='/buddha.png' className='w-[100px] mx-auto'/>
        <button className='bg-white border-2 border-black rounded-lg p-2 m-2'
                onClick={props.onstartaudio}><FaMicrophone /></button>
            <button className='bg-white border-2 border-black rounded-lg p-2 m-2'
                onClick={props.onstopaudio}>Stop</button>
            </div>
  )
}

export default BuddhaEnter