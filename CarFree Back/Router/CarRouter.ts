import { Router } from 'express';
import { newCar, carList, updateCar } from '../Controller/CarController';

const CarRouter = Router();

CarRouter.post('/api/car/new', newCar);
CarRouter.get('/api/car-list', carList);
CarRouter.get('/api/comic/update/:_id', updateCar);

export default CarRouter;
