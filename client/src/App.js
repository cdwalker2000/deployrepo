import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Customer from './pages/Customer'
import Manager from './pages/Manager'




function App() {

  return (
    <div className="App bg-gray-100 p-[10px] md:px-[45px] md:py-[80px]">
      <Home/>
      {/* <Manager/> */}
      {/* <Customer/> */}
    </div>
  );
}

export default App;