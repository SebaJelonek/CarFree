import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  enableAtom,
  isLoggedInAtom,
  messageAtom,
  nameAtom,
  titleAtom,
  CarArrayType,
} from '../../../Atoms';
import { onPost, onGet } from '../../../OnFetchData';
import Button from '../Button/Button';
import Message from '../Message/Message';

interface Props {
  children: React.ReactNode;
  type: 'GET' | 'POST';
  url: string;
  body?:
    | CarArrayType['newCar']
    | {
        name: string;
        email: string;
        password: string;
      }
    | {
        email: string;
        password: string;
      };
}

const Form: React.FC<Props> = ({ children, body, type, url }) => {
  const [, setIsLogged] = useAtom(isLoggedInAtom);
  const [, setMessage] = useAtom(messageAtom);
  const [title] = useAtom(titleAtom);
  const [enabled] = useAtom(enableAtom);
  const [, setName] = useAtom(nameAtom);
  const [count, setCount] = useState(0);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (enabled) {
      if (type === 'GET') {
        const data = await onGet(url);
        setMessage(data.message);
      } else if (type === 'POST' && body !== undefined) {
        const data = await onPost(event, url, body);
        if (data.status === 200) {
          if (data.isLogged) {
            setMessage(data.message);
            setIsLogged(data.isLogged);
            setName(data.fullName);
          } else {
            setMessage(data.message);
          }
        } else if (data.status === 400) {
          setMessage(data.message);
        }
      }
    } else {
      setCount(count + 1);
      if (count > 5) {
        setMessage('You need to fill in all fields');
      }
    }
  };

  return (
    <div className='bg-zinc-700  mt-4 mb-8 rounded-lg pt-5 pb-5 border-transparent border-1 transition-all duration-250 hover:border-idk'>
      <form onSubmit={onSubmitHandler}>
        <div className='flex flex-col w-full'>{children}</div>
        <div className='flex flex-col w-full'>
          {enabled ? (
            <Button className='w-1/2 m-auto text-lg btn' text='Submit' />
          ) : (
            <Button
              title={title}
              className='w-1/2 m-auto text-lg btn-disabled cursor-not-allowed'
              text='Submit'
            />
          )}
        </div>
      </form>
      <Message />
    </div>
  );
};

export default Form;
