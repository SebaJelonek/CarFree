import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className: string;
}

const LoggedOut: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Link to={'/login'}>Zaloguj</Link>
      <Link to={'/register'}>Zarejestruj</Link>
      <Link to={'/cars'}>Samochody</Link>
    </div>
  );
};

export default LoggedOut;
