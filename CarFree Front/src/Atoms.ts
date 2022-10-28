import { atom } from 'jotai';

const date = new Date(Date.now());
const date2 = new Date(Date.now());
let dateArray = [date, date2];
const carArray = [
  {
    _id: '63568cf06c130dd4b609e5da',
    brand: 'Focus',
    createDate: '2022-10-24T13:02:36.625Z',
    milage: 267983,
    model: 'Ford',
    updateDates: typeof dateArray,
    year: 2000,
  },
];
interface CarArrayType {
  carArray: {
    _id: string;
    brand: string;
    createDate: string;
    milage: number;
    model: string;
    updateDates:
      | string
      | number
      | bigint
      | boolean
      | symbol
      | undefined
      | object
      | Function;
    year: number;
  }[];
  carObject: {
    _id: string;
    brand: string;
    createDate: string;
    milage: number;
    model: string;
    updateDates:
      | string
      | number
      | bigint
      | boolean
      | symbol
      | undefined
      | object
      | Function;
    year: number;
  };
  newCar: {
    brand: string;
    milage: number;
    model: string;
    year: number;
    companyDate: Date;
  };
}
// -------- ATOMS -------- //
const carListAtom = atom(carArray);
const messageAtom = atom('');
const isLoggedInAtom = atom(false);
const enableAtom = atom(false);
const titleAtom = atom('');
const nameAtom = atom('');

export {
  carListAtom,
  messageAtom,
  isLoggedInAtom,
  enableAtom,
  titleAtom,
  nameAtom,
};
export type { CarArrayType };
