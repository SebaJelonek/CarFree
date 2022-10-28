import { useAtom } from 'jotai';
import React from 'react';
import { useParams } from 'react-router-dom';
import { isLoggedInAtom, messageAtom } from '../../../Atoms';

const Index: React.FC = () => {
  const [message] = useAtom(messageAtom);
  const [isLogged] = useAtom(isLoggedInAtom);

  return (
    <div>
      <h1>INDEX</h1>
      {isLogged && <h3>{message}</h3>}
      <h1>
        zapytanie o pojemnik blender{' '}
        <a
          target='_blank'
          href='http://www.kerchelectronics.pl/home/kontakt-firmy/'
        >
          kerch
        </a>
      </h1>
    </div>
  );
};

export default Index;
