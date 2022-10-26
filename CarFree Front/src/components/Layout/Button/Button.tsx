import React from 'react';

interface Props {
  text: string;
  className?: string;
  title?: string;
}

const Button: React.FC<Props> = ({ text, className, title }) => {
  return (
    <button title={title} className={className}>
      {text}
    </button>
  );
};

export default Button;
