import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return (
    <div className='bg-zinc-800 border-transparent  border-1 mt-4 mb-4 rounded-lg p-2 transition-all duration-250 cursor-pointer hover:border-cyan-400 hover:border-1'>
      {children}
    </div>
  );
};

export default Card;
