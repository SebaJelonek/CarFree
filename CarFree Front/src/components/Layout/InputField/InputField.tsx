import React, { useEffect, useState } from 'react';

interface Props {
  type: 'text' | 'date' | 'number' | 'password' | 'email';
  id: string;
  label: string;
  setValueText?: React.Dispatch<React.SetStateAction<string>>;
  setValueNumber?: React.Dispatch<React.SetStateAction<number>>;
  setValueDate?: React.Dispatch<React.SetStateAction<Date>>;
}

const stringToDate = (date: string) => {
  return new Date(date);
};

const InputField: React.FC<Props> = ({
  type,
  id,
  label,
  setValueNumber,
  setValueText,
  setValueDate,
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {}, [input]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
    if (type === 'date' && setValueDate !== undefined) {
      setValueDate(stringToDate(event.currentTarget.value));
    } else if (type === 'number' && setValueNumber !== undefined) {
      setValueNumber(parseInt(event.currentTarget.value));
    } else if (setValueText !== undefined) {
      setValueText(event.currentTarget.value);
    }
  };

  let textColor: string, rightPosition: string;

  input === '' && type === 'date'
    ? (textColor = 'text-transparent')
    : (textColor = 'text-salte-100');

  input !== '' ? (rightPosition = 'right-0') : (rightPosition = 'right-76');

  return (
    <div className='w-1/2 m-auto'>
      <input
        className={`w-1/2 m-auto text-lg p-2 mb-5 ${textColor} peer`}
        type={type}
        id={id}
        onChange={onChangeHandler}
        value={input}
      />
      <label
        className={`relative inline-block ${rightPosition} ml-2 w-3/12 text-lg text-left transition-all duration-500 peer-hover:right-0 peer-focus-within:right-0`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
