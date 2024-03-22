import React from 'react'
import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <div  >
            <p className='rubik text-[40px] text-center'>Apprendre la pièce de théatre </p>
            <p className='text-2xl w-[250px] rounded-2xl font-bold p-2 mt-9 mb-12 text-white bg-blue-800 mx-auto text-center'>What do you want ?
            </p>
            <ul>
                {/* <li><Link className='px-2' to="/">Accueil</Link></li> */}
                <li><Link className='p-2 m-3 rounded-2xl text-center text-[22px]  bg-red-100 mx-auto w-[300px] block' to="/allsentences">Je veux voir toutes mes répliques dans la pièce  </Link></li>
                <li><Link className='p-2 m-3 rounded-2xl text-center text-[22px]  bg-red-100 mx-auto w-[300px] block' to="/audio">Je veux travailler une scene en cachant mon texte </Link></li>
                <li><Link className='p-2 m-3 rounded-2xl text-center text-[22px]  bg-red-100 mx-auto w-[300px] block' to="/training">Je veux m'entrainer à l'audio d'une scène </Link></li>
            </ul>
        </div>
    )
}

export default HomePage