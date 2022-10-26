import React from 'react';
import { onPost } from '../../OnFetchData';
import Button from '../Button/Button';
import Card from '../Card/Card';

interface Props {
  children: React.ReactNode;
  body: {
    brand: string;
    milage: number;
    model: string;
    year: number;
    companyDate: Date;
  };
}

const Form: React.FC<Props> = ({ children, body }) => {
  let message: any;
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    message = await onPost(event, 'http://localhost:1337/api/car/new', body);
  };

  return (
    <div className='bg-zinc-700  mt-4 mb-8 rounded-lg pt-5 pb-5 border-transparent border-1 transition-all duration-250 hover:border-idk'>
      <form onSubmit={onSubmitHandler}>
        <div className='flex flex-col w-full'>{children}</div>
        <div className='flex flex-col w-full'>
          <Button style='w-1/2 m-auto text-lg' text='Submit' />
        </div>
      </form>
    </div>
  );
};

export default Form;
