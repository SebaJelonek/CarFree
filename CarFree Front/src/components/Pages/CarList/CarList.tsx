import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { carListAtom } from '../../../Atoms';
import { onGet } from '../../../OnFetchData';
import Card from '../../Layout/Card/Card';

const CarList: React.FC = () => {
  const [carList, setCarList] = useAtom(carListAtom);
  useEffect(() => {
    onGet('http://localhost:1337/api/car-list').then(({ carList }) => {
      setCarList(carList);
    });
  }, []);
  return (
    <div>
      {carList.map((car) => (
        <Card key={car._id}>
          <h1>{car.brand}</h1>
          <h2>{car.model}</h2>
        </Card>
      ))}
    </div>
  );
};

export default CarList;
