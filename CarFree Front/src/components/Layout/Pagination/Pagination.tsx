import React from 'react';

interface Props {
  numberOfPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({ numberOfPages, setCurrentPage }) => {
  let array = [];

  for (let index = 1; index <= numberOfPages; index++) {
    array.push(index);
  }

  return (
    <div>
      <ul className='flex justify-center'>
        {array.map((page) => (
          <li
            className='w-full max-w-[2rem] text-center text-xl border-2 border-transparent rounded-md m-1 transition-colors duration-250 hover:border-rose-300 hover:cursor-pointer'
            onClick={(e) => {
              setCurrentPage(parseInt(e.currentTarget.innerText));
            }}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
