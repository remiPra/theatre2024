import React from 'react'
import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <div  >
            <p className='rubik text-[30px]'>Bienvenue sur la page d'accueil </p>
            <p className='text-[30px]'>Plusieurs choix </p>
            <ul>
                {/* <li><Link className='px-2' to="/">Accueil</Link></li> */}
                <li><Link className='px-2' to="/allsentences">Toutes mes répliques </Link></li>
                <li><Link className='px-2' to="/audio">Etudier une scène</Link></li>
            </ul>
        </div>
    )
}

export default HomePage