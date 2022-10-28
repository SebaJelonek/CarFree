import { useAtom } from 'jotai';
import React from 'react';
import { isLoggedInAtom, messageAtom } from '../../../Atoms';

const Index: React.FC = () => {
  const [message] = useAtom(messageAtom);
  const [isLogged] = useAtom(isLoggedInAtom);

  return (
    <div>
      <h1>INDEX</h1>
      {isLogged && <h3>{message}</h3>}
    </div>
  );
};

export default Index;
