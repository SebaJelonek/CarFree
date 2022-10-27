import React from 'react';

interface Props {
  children: React.ReactNode;
  width: string;
}

const Card: React.FC<Props> = ({ children, width }) => {
  return (
    <div
      onClick={(e) => {}}
      className={`bg-zinc-800 border-transparent ${width} border-1 my-4 mx-auto rounded-lg p-2 transition-all duration-250 cursor-pointer hover:border-cyan-400 hover:border-1`}
    >
      {children}
    </div>
  );
};

export default Card;
