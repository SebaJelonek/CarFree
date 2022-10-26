import { Schema, model } from 'mongoose';

const CarSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  milage: { type: Number, required: true },
  companyDate: { type: Date, required: true },
  createDate: { type: Date, default: Date.now() },
  updateDates: { type: [Date], required: true },

  //  - id (int/uuid),
  //  - producenta (np. Ford),
  //  - modelu (np. Mustang),
  //  - rocznika (np. 2012); (data nie powinna być większa niż aktualna, mniejsza niż 1900 rok),
  //  - daty wprowadzenia do firmy (np. 2021-07-28) (data nie powinna być większa niż aktualna i mniejsza niż 1970 rok),
  //  - aktualnym przebiegu w km (np. 45000); (nie może być liczbą ujemną),
  //  - daty stworzenia,
  //  - daty aktualizacji.
});

CarSchema.pre('save', function (next: any) {
  const date = new Date();
  this.updateDates.push(date);
  const carYear = this.year;

  if (carYear > date.getFullYear()) {
    throw 'Car year of production can not be greater than current year';
  } else if (carYear < 1900) {
    throw 'Car year of production can not be lesser than 1900';
  } else {
    next();
  }
});

CarSchema.pre('updateOne', function (next: any) {
  const date = new Date();
  this.updateDates.push(date);
  next();
});

const Car = model('car', CarSchema);

export default Car;
