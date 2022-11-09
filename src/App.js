import React, {useState, useEffect} from 'react';

function App() {

  const [inventory, getInventory] = useState(false);
  useEffect(() => {
    getInventory();
  }, []);

  function getInventory() {
    console.log("Get");
    fetch('http://localhost:3000')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setInventory(data);
      });
  }
  return (
    <div>
      {inventory ? inventory : 'There is no inventory available'}
    </div>
  );
}