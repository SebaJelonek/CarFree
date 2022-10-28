import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { messageAtom } from '../../../Atoms';

const Message: React.FC = () => {
  const [message, setMessage] = useAtom(messageAtom);

  useEffect(() => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [message]);

  return (
    <div className='h-4'>
      <h3 className={`text-4xl text-red-700 `}>{message}</h3>
    </div>
  );
};

export default Message;
