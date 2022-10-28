import React from 'react';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '../../Atoms';
import LoggedIn from './NavbarState/LoggedIn';
import LoggedOut from './NavbarState/LoggedOut';

const className = 'flex justify-center content-center space-x-4 h-12 text-xl';

const Navbar: React.FC = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <nav className='bg-amber-100'>
      {isLoggedIn ? (
        <LoggedIn className={className} />
      ) : (
        <LoggedOut className={className} />
      )}
    </nav>
  );
};

export default Navbar;
