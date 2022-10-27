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
  res.json({ carList });
};

const updateCar = async (req: any, res: any) => {
  const { brand, year, model, milage, companyDate } = req.body.body;
  const { _id } = req.params;
  const updateDate = new Date(Date.now());
  const car = await Car.findById(_id);
  const updateDates = car?.updateDates;

  updateDates?.push(updateDate);

  await Car.findOneAndUpdate(
    { _id },
    { brand, year, model, milage, companyDate, updateDates }
  );
  const carList = await Car.find();
  res.json({ msg: 'all good', carList });
};

const deleteCar = async (req: any, res: any) => {
  const _id = req.params.id;
  await Car.findByIdAndDelete({ _id });
  res.status(200).json({ message: 'Pojazd został usunięty' });
};

export { newCar, carList, updateCar, deleteCar };
