import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCar from '../Pages/AddCar/AddCar';
import CarList from '../Pages/CarList/CarList';
import Index from '../Pages/Index/Index';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Navbar from './Navbar';

const Navigation: React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <div className='max-w-7xl mx-auto p-2'>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/add-new-car' element={<AddCar />} />
            <Route path='/cars' element={<CarList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/add-pen' element={<AddPenPage />} />
          <Route path='/cart' element={<BasketPage />} />
          <Route path='/order' element={<OrderPage />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Navigation;
