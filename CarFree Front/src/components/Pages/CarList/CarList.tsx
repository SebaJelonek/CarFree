import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { carListAtom, CarArrayType, messageAtom } from '../../../Atoms';
import { onGet, onPost } from '../../../OnFetchData';
import DisplayCars from '../../Layout/DisplayCars/DisplayCars';
import DeleteCar from '../../Layout/DeleteCar/DeleteCar';
import EditCar from '../../Layout/EditCar/EditCar';

interface Types {
  active: 'delete' | 'edit' | 'false';
}

const deleteHandler = async (_id: string) => {
  const response = await onGet(`http://localhost:1337/api/car/delete/${_id}`);
};

const editHandler = async (
  event: React.FormEvent<HTMLFormElement>,
  car: CarArrayType['newCar'],
  _id: string
) => {
  const response = await onPost(
    event,
    `http://localhost:1337/api/car/update/${_id}`,
    car
  );
  return response;
};

const CarList: React.FC = () => {
  const [active, toggle] = useState<Types['active']>('false');
  const [_id, setId] = useState('');
  const [carList, setCarList] = useAtom(carListAtom);
  const [message, setMessage] = useState('');
  let arrayLength = carList.length;
  let firstArray = carList.slice(0, arrayLength / 2);
  let secondArray = carList.slice(arrayLength / 2, arrayLength);

  useEffect(() => {
    onGet('http://localhost:1337/api/car-list').then(({ carList }) => {
      setCarList(carList);
    });
  }, []);

  useEffect(() => {}, [_id]);

  const onDelete = () => {
    setCarList(carList.filter((car) => car._id !== _id));
    deleteHandler(_id);
  };

  const onEdit = (
    event: React.FormEvent<HTMLFormElement>,
    car: CarArrayType['newCar']
  ) => {
    toggle('false');
    const response = editHandler(event, car, _id);
    response.then((res) => {
      setCarList(res.carList);
      setMessage(res.message);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [message]);

  return (
    <div>
      <div className='flex justify-center'>
        <DisplayCars toggle={toggle} setId={setId} carArray={secondArray} />
        <DisplayCars toggle={toggle} setId={setId} carArray={firstArray} />
      </div>
      {active === 'delete' && <DeleteCar onDelete={onDelete} toggle={toggle} />}
      {active === 'edit' && (
        <EditCar
          onEdit={onEdit}
          toggle={toggle}
          car={carList.filter((car) => car._id === _id)[0]}
        />
      )}
      {message !== '' && (
        <div
          onClick={() => setMessage('')}
          className='absolute flex w-full h-full left-0 top-0 bg-slate-900'
        >
          <h1 className='m-auto'>{message}</h1>
        </div>
      )}
    </div>
  );
};

export default CarList;
