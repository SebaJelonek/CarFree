import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { messageAtom } from '../../../Atoms';

const Message: React.FC = () => {
  const [message, setMessage] = useAtom(messageAtom);

  useEffect(() => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [message]);

  return message !== '' ? (
    <div className='h-4'>{message}</div>
  ) : (
    <div className='h-4'></div>
  );
};

export default Message;
