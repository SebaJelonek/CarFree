import React from 'react';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '../../Atoms';
import { Link } from 'react-router-dom';

const loggedIn = (
  <div>
    <Link to={'/add-new-car'}>Dodaj nowy samochód</Link>
  </div>
);

const loggedOut = (
  <div>
    <Link to={'/login'}>Zaloguj</Link>
    <Link to={'/register'}>Zarejestruj</Link>
  </div>
);

const Navbar: React.FC = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <nav className='bg-amber-100 h-8'>{isLoggedIn ? loggedIn : loggedOut}</nav>
  );
};

export default Navbar;
