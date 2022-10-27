import { Router } from 'express';
import {
  newCar,
  carList,
  updateCar,
  deleteCar,
} from '../Controller/CarController';

const CarRouter = Router();

// -------- POST -------- //
CarRouter.post('/api/car/new', newCar);
CarRouter.post('/api/car/update/:_id', updateCar);

// -------- GET -------- //
CarRouter.get('/api/car-list', carList);
CarRouter.get('/api/car/delete/:id', deleteCar);

export default CarRouter;
