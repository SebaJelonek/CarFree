import e from 'express';
import Car from '../Model/Car';

interface UpdateCarInfo {
  fetchedCar: {
    brand: string;
    model: string;
    year: number;
    milage: number;
    companyDate: Date;
  };
  car: {
    brand: string;
    model: string;
    year: number;
    milage: number;
    companyDate: Date;
    createDate: Date;
    updateDates: Date[];
  };

  carInfoFunc: (
    car: UpdateCarInfo['car'],
    companyDate: Date,
    brand?: string,
    model?: string,
    year?: number,
    milage?: number
  ) => UpdateCarInfo['car'] | string;
  validateCar: (car: UpdateCarInfo['fetchedCar']) => boolean;
}

const validateCar: UpdateCarInfo['validateCar'] = (car) => {
  const now = new Date(Date.now());
  const validYear = now.getFullYear();
  const timeNow = now.getTime();

  let isCorrect = false;
  if (car) {
    const { brand, companyDate, milage, model, year } = car;
    const companyTime = new Date(companyDate).getTime();

    if (brand !== '') isCorrect = true;
    else isCorrect = false;

    if (milage >= 0) isCorrect = true;
    else isCorrect = false;

    if (model !== '') isCorrect = true;
    else isCorrect = false;

    if (year > 1900 && year <= validYear) isCorrect = true;
    else isCorrect = false;

    if (companyTime < timeNow && companyTime > -3600000) isCorrect = true;
    else isCorrect = false;
  }
  return isCorrect;
};

const newCar = async (req: any, res: any) => {
  const car: UpdateCarInfo['fetchedCar'] = req.body;
  console.log(validateCar(car));

  if (validateCar(car)) {
    try {
      await Car.create(car);
      res.json({ message: 'Car added to database', status: 200 });
    } catch (error) {
      res.status(400).json({ message: error, status: 400 });
    }
  } else {
    res.status(400).json({ message: 'Something went wrong', status: 400 });
  }
};

const carList = async (req: any, res: any) => {
  const carList = await Car.find({});
  res.json({ carList });
};

const updateCarInfo: UpdateCarInfo['carInfoFunc'] = (
  car,
  companyDate,
  brand,
  model,
  year,
  milage
) => {
  const now = new Date(Date.now());
  const companyTime = new Date(companyDate).getTime();
  const currentTime = now.getTime();
  const currentYear = now.getFullYear();

  let message: string = '';

  if (brand !== undefined && brand !== '') {
    car.brand = brand;
  }
  if (model !== undefined && model !== '') {
    car.model = model;
  }
  if (companyTime > currentTime) message = 'companyTime > currentTime';
  else if (companyTime < -3600000) message = 'companyTime < 1970.01.01';
  if (year !== car.year && year !== undefined) {
    if (year > 1900) {
      message = 'Year < 1900';
    } else if (year < currentYear) {
      message = 'Year > current year';
    } else {
      car.year = year;
    }
  }
  if (milage !== undefined && milage !== car.milage) {
    if (milage < 0) {
      message = 'Milage < 0';
    } else car.milage = milage;
  }
  if (message !== '') return message;
  else return car;
};

const updateCar = async (req: any, res: any) => {
  const { _id } = req.params;
  const updateDate = new Date(Date.now());
  let car: UpdateCarInfo['car'] | null = await Car.findById(_id);
  let {
    brand,
    year,
    model,
    milage,
    createDate: companyDate,
  }: UpdateCarInfo['car'] = req.body;
  let newCar: string | UpdateCarInfo['car'] = '';
  const updateDates = car?.updateDates;
  updateDates?.push(updateDate);

  if (car !== null) {
    newCar = updateCarInfo(car, companyDate, brand, model, year, milage);
    if (typeof newCar !== 'string') {
      await Car.findOneAndUpdate({ _id }, car);
    }
  } else if (newCar) {
    res
      .status(400)
      .json({ message: 'Nie mozna znaleźć samochodu', status: 400, newCar });
  }

  const carList = await Car.find();
  res.json({ message: 'Dane zostały zmienione', carList });
};

const deleteCar = async (req: any, res: any) => {
  const _id = req.params.id;
  await Car.findByIdAndDelete({ _id });
  res.status(200).json({ message: 'Pojazd został usunięty' });
};

export { newCar, carList, updateCar, deleteCar };
