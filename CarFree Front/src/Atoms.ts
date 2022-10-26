import { atom } from 'jotai';

const date = new Date(Date.now());
const date2 = new Date(Date.now());
let array = [date, date2];

const carListAtom = atom([
  {
    _id: '63568cf06c130dd4b609e5da',
    brand: 'Focus',
    createDate: '2022-10-24T13:02:36.625Z',
    milage: 267983,
    model: 'Ford',
    updateDates: typeof array,
    year: 2000,
  },
]);

const messageAtom = atom('');
const isLoggedInAtom = atom(false);
const enableAtom = atom(false);
const titleAtom = atom('');

export { carListAtom, messageAtom, isLoggedInAtom, enableAtom, titleAtom };
