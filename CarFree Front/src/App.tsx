import { useEffect, useState } from 'react';
import { Provider, useAtom } from 'jotai';
import { carListAtom } from './Atoms';
import Form from './components/Form/Form';
import { onGet } from './OnFetchData';
import InputField from './components/InputField/InputField';
import './App.css';
import Card from './components/Card/Card';

const date = new Date(Date.now());

function App() {
  const [carList, setCarList] = useAtom(carListAtom);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(1900);
  const [milage, setMilage] = useState(10000);
  const [companyDate, setCompanyDate] = useState<Date>(date);
  const [body, setBody] = useState({ brand, model, year, milage, companyDate });

  useEffect(() => {
    setBody({ brand, model, year, milage, companyDate });
  }, [brand, model, year, milage, companyDate]);

  useEffect(() => {
    onGet('http://localhost:1337/api/car-list').then(({ carList }) => {
      setCarList(carList);
    });
  }, []);

  return (
    <Provider>
      <div className='App'>
        {/* Form lives here  */}
        <Form body={body}>
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
            label='copmany year'
            id='company-year'
            type='date'
            setValueDate={setCompanyDate}
          />
        </Form>
      </div>
      <div>
        {carList.map((car) => (
          <Card key={car._id}>
            <h1>{car.brand}</h1>
            <h2>{car.model}</h2>
          </Card>
        ))}
      </div>
    </Provider>
  );
}

export default App;
