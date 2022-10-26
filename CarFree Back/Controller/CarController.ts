import Car from '../Model/Car';

const newCar = async (req: any, res: any) => {
  const car = req.body.body;
  try {
    await Car.create(car);
    res.json({ message: 'Car added to database', status: 200 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
};

const carList = async (req: any, res: any) => {
  const carList = await Car.find({});
  res.json({ msg: 'hi!', carList });
};

const updateCar = async (req: any, res: any) => {};

export { newCar, carList, updateCar };
