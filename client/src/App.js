import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Customer from './pages/Customer'
import Manager from './pages/Manager'




function App() {

  const initialFormState = {
    fname: '',
    lname: '',
    username: '',
    password: ''
  }

  
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { id, value } = event.target
    setCurrentUser({ ...currentUser, [id]: value })
  }


  const submitNewUser = async (event) => {
    event.preventDefault()
    console.log("Here1");
  
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    })
    console.log(response);
  }

  return (
    <div className="App bg-gray-100 p-[10px] md:px-[45px] md:py-[80px]">
      {/* <Home
        submitUserEdit={submitNewUser}
        handleInputChange={handleInputChange}
      /> */}
      <Manager/>
      {/* <Customer/> */}
    </div>
  );
}

export default App;