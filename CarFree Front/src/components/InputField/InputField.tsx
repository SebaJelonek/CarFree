import React, { useState } from 'react';

interface Props {
  type: 'text' | 'date' | 'number';
  id: string;
  label: string;
  setValueText?: React.Dispatch<React.SetStateAction<string>>;
  setValueNumber?: React.Dispatch<React.SetStateAction<number>>;
  setValueDate?: React.Dispatch<React.SetStateAction<Date>>;
}

const InputField: React.FC<Props> = ({
  type,
  id,
  label,
  setValueNumber,
  setValueText,
  setValueDate,
}) => {
  const [input, setInput] = useState('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
    if (type === 'date' && setValueDate !== undefined) {
      const date = new Date(input);
      setValueDate(date);
    } else if (type === 'text' && setValueText !== undefined) {
      setValueText(event.currentTarget.value);
    } else if (type === 'number' && setValueNumber !== undefined) {
      setValueNumber(parseInt(event.currentTarget.value));
    }
  };

  return (
    <div className='w-1/2 m-auto'>
      <input
        className='w-1/2 m-auto text-lg p-2 mb-5 peer'
        type={type}
        id={id}
        onChange={onChangeHandler}
        value={input}
      />
      {type !== 'date' ? (
        <label
          className='relative top-0.55 inline-block right-76 ml-2 w-3/12 text-lg text-left transition-all duration-500 peer-hover:right-0'
          htmlFor={id}
        >
          {label}
          <hr className='relative w-0 peer-hover:w-full' />
        </label>
      ) : (
        <label
          className='relative inline-block top-0.55 ml-2 w-3/12 text-lg text-left'
          htmlFor={id}
        >
          {label}
          <hr className='relative w-0 peer-hover:w-full' />
        </label>
      )}
    </div>
  );
};

export default InputField;
