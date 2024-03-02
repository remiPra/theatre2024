import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, 'karma' est le mot de passe attendu
    if (password === 'karma') {
      login();
      navigate('/'); // Redirige vers la page d'accueil après la connexion
    } else {
      alert('Mot de passe incorrect !');
    }
  };

  return (
    <div>
        <h1 className='mt-[100px] text-center'>Connectez vous qui disez</h1>
      <form className="w-[300px] mx-auto" onSubmit={handleSubmit}>
        <label>
          <p className='w-full text-center mb-2 '>
            Mot de passe :
            </p>
          <input className='border my-3 p-3 w-[200px] mx-auto block border-blue-900 border-3 rounded-full '
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className='w-[200px] mx-auto text-center block' type="submit ">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
