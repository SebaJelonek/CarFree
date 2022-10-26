import React from 'react';

interface Props {
  text: string;
  style?: string;
}

const Button: React.FC<Props> = ({ text, style }) => {
  return <button className={style}>{text}</button>;
};

export default Button;
