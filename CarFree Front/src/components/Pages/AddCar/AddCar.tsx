import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import { enableAtom, titleAtom } from '../../../Atoms';
import Form from '../../Layout/Form/Form';
import InputField from '../../Layout/InputField/InputField';

const date = new Date(Date.now());

const AddCar: React.FC = () => {
  const [, toggle] = useAtom(enableAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(1900);
  const [milage, setMilage] = useState(10000);
  const [companyDate, setCompanyDate] = useState<Date>(date);
  const [body, setBody] = useState({ brand, model, year, milage, companyDate });

  useEffect(() => {
    toggle(false);

    if (
      brand !== '' &&
      model !== '' &&
      year > 1900 &&
      year < date.getFullYear() &&
      milage >= 0 &&
      companyDate < date
    ) {
      toggle(true);
      setBody({ brand, model, year, milage, companyDate });
    } else if (brand === '') {
      setTitle('Brand can not be empty');
    } else if (model === '') {
      setTitle('Model can not be empty');
    } else if (year < 1900) {
      setTitle('Car weren`t produced back then');
    } else if (year > date.getFullYear()) {
      setTitle('Ok Elon Musk');
    } else if (milage <= 0) {
      setTitle('Car has to have a positive milage');
    } else if (companyDate > date) {
      const now = new Date(Date.now());
      setTitle(`Car has to be added before ${now}`);
    }
  }, [brand, model, year, milage, companyDate]);

  return (
    <div>
      <Form url='http://localhost:1337/api/car/new' type='POST' body={body}>
        <InputField
          label='brand'
          id='brand-input'
          type='text'
          setValueText={setBrand}
        />
        <InputField
          label='model'
          id='model-input'
          type='text'
          setValueText={setModel}
        />
        <InputField
          label='year'
          id='year-input'
          type='number'
          setValueNumber={setYear}
        />
        <InputField
          label='milage'
          id='milage-input'
          type='number'
          setValueNumber={setMilage}
        />
        <InputField
          label='company year'
          id='company-year'
          type='date'
          setValueDate={setCompanyDate}
        />
      </Form>
    </div>
  );
};

export default AddCar;
