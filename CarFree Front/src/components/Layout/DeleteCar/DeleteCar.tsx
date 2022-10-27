import React from 'react';

interface Props {
  toggle: React.Dispatch<React.SetStateAction<'edit' | 'delete' | 'false'>>;
  onDelete: () => void;
}

const DeleteCar: React.FC<Props> = ({ toggle, onDelete }) => {
  return (
    <div
      onClick={() => toggle('false')}
      className='flex justify-center absolute w-full h-full right-0 top-0 bg-[#0e2f2480]'
    >
      <div className='m-auto text-cyan-50 p-40 rounded-lg bg-[#0e2f24db]'>
        <h1 className='mb-8'>Jestes pewien ze chcesz usunąć?</h1>
        <button onClick={onDelete} className='btn text-xl mr-4'>
          Tak
        </button>
        <button className='btn text-xl'>Nie</button>
      </div>
    </div>
  );
};

export default DeleteCar;
