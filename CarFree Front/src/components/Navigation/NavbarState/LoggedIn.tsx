import React from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { isLoggedInAtom } from '../../../Atoms';

interface Props {
  className: string;
}

const LoggedIn: React.FC<Props> = ({ className }) => {
  const [, setIsLogged] = useAtom(isLoggedInAtom);

  const onClickHelper = () => {
    setIsLogged(false);
  };

  return (
    <div className={className}>
      <Link to={'/add-new-car'}>Dodaj nowy samochód</Link>
      <Link to={'/cars'}>Samochody</Link>
      <Link onClick={onClickHelper} to={'/'}>
        Logout
      </Link>
    </div>
  );
};

export default LoggedIn;
