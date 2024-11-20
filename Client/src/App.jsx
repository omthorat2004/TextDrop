import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './pages/Error';
import Home from './pages/Home';
import Room from './pages/Room';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/:id' element={<Room/>}/>
        <Route path='/error' element={<Error/>}/>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
