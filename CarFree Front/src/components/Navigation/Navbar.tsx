import React from 'react';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '../../Atoms';
import { Link } from 'react-router-dom';
const className = 'flex justify-center content-center space-x-4 h-12 text-xl';
const loggedIn = (
  <div className={className}>
    <Link to={'/add-new-car'}>Dodaj nowy samochód</Link>
    <Link to={'/cars'}>Samochody</Link>
  </div>
);

const loggedOut = (
  <div className={className}>
    <Link to={'/login'}>Zaloguj</Link>
    <Link to={'/register'}>Zarejestruj</Link>
    <Link to={'/cars'}>Samochody</Link>
  </div>
);

const Navbar: React.FC = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <>
      <nav className='bg-amber-100'>{isLoggedIn ? loggedIn : loggedOut}</nav>
    </>
  );
};

export default Navbar;
