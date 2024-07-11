import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RentedCars from './pages/RentedCars';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rented-cars" element={<RentedCars />} />
      </Routes>
    </Router>
  );
}

export default App;
