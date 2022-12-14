import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { CarArrayType, messageAtom } from '../../../Atoms';
import Message from '../Message/Message';

interface Props {
  toggle: React.Dispatch<React.SetStateAction<'edit' | 'delete' | 'false'>>;
  car: CarArrayType['carObject'];
  onEdit: (
    event: React.FormEvent<HTMLFormElement>,
    car: CarArrayType['newCar']
  ) => void;
}

const container = 'flex justify-between';
const h5 = 'text-2xl mb-6';
const h5_l = 'text-2xl mb-6 text-left';

const EditCar: React.FC<Props> = ({ toggle, onEdit, car }) => {
  const { brand, year, model, milage, createDate } = car;

  const [, setMessage] = useAtom(messageAtom);

  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState(year);
  const [newMilage, setNewMilage] = useState(milage);
  const [newDate, setNewDate] = useState('');

  const now = new Date(Date.now());
  const companyDate = new Date(newDate);

  const newCar: CarArrayType['newCar'] = {
    brand: newBrand,
    milage: newMilage,
    model: newModel,
    year: newYear,
    companyDate,
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentYear = new Date(Date.now()).getFullYear();
    if (
      newBrand === '' &&
      newModel === '' &&
      companyDate.toString() === 'Invalid Date' &&
      newYear === year &&
      newMilage === milage
    ) {
      setMessage('Musisz zmienić przynajmniej jedną wartość');
    } else if (newYear > currentYear) {
      setMessage('Rok produkcji nie moze byc wyzszy niz aktualny');
    } else if (newYear < 1900) {
      setMessage('Rok produkcji musi byc wyzszy niz 1899');
    } else if (companyDate.getTime() > now.getTime()) {
      setMessage('Czas wprowadzenia nie moze byc wyzszy niz czas aktualny');
    } else if (companyDate.getTime() < -3600000) {
      setMessage('Czas wprowadzenia nie moze być niższy niż 01.01.1970 00:00');
    } else if (milage < 0) {
      setMessage('Przebieg nie moze byc ujemny');
    } else onEdit(event, newCar);
  };

  const newBrandHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBrand(event.currentTarget.value);
  };
  const newModelHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewModel(event.currentTarget.value);
  };
  const newYearHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewYear(parseInt(event.currentTarget.value));
  };
  const newMilageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMilage(parseInt(event.currentTarget.value));
  };
  const newDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDate(event.currentTarget.value);
  };

  return (
    <div className='flex justify-center absolute w-full h-full right-0 top-0 bg-[#0e2f2480]'>
      <div className='flex m-auto w-5/6'>
        <div className='text-cyan-50 w-6/12 p-20 rounded-lg bg-[#0e2f24db]'>
          <form onSubmit={onSubmitHandler} className='text-2xl'>
            <div className='flex justify-between mb-6'>
              <label htmlFor='brand'>Brand: </label>
              <input
                onChange={newBrandHandler}
                value={newBrand}
                type='text'
                id='brand'
              />
            </div>
            <div className='flex justify-between mb-6'>
              <label htmlFor='Model'>Model: </label>
              <input
                onChange={newModelHandler}
                value={newModel}
                type='text'
                id='Model'
              />
            </div>
            <div className='flex justify-between mb-6'>
              <label htmlFor='rok'>Rok produkcji: </label>
              <input
                onChange={newYearHandler}
                value={newYear}
                type='number'
                id='rok'
              />
            </div>
            <div className='flex justify-between mb-6'>
              <label htmlFor='milage'>Przebieg: </label>
              <input
                onChange={newMilageHandler}
                value={newMilage}
                type='number'
                id='milage'
              />
            </div>
            <div className='flex justify-between mb-6'>
              <label htmlFor='data'>Data Utworzenia: </label>
              <input
                onChange={newDateHandler}
                value={newDate}
                type='datetime-local'
                id='data'
              />
            </div>
            <button className='btn text-xl mr-4'>Zapisz</button>
            <button onClick={() => toggle('false')} className='btn text-xl'>
              Anuluj
            </button>
          </form>
          <Message />
        </div>
        <div className='bg-[#0e2f2480] w-4'></div>
        <div className='w-8/12 text-cyan-50 p-20 rounded-lg bg-[#0e2f24db]'>
          <h2 className='relative bottom-16 h-0 text-2xl underline'>
            Aktualne dane:
          </h2>
          <div className={container}>
            <h5 className={h5}>Brand: </h5>
            <h5 className={h5_l}>{brand}</h5>
          </div>
          <div className={container}>
            <h5 className={h5}>Model: </h5>
            <h5 className={h5_l}>{model}</h5>
          </div>
          <div className={container}>
            <h5 className={h5}>Rok produkcji: </h5>
            <h5 className={h5_l}>{year}</h5>
          </div>
          <div className={container}>
            <h5 className={h5}>Przebieg: </h5>
            <h5 className={h5_l}>{milage}km</h5>
          </div>
          <div className={container}>
            <h5 className={h5}>Data utworzenia: </h5>
            <h5 className={h5_l}>{createDate}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
