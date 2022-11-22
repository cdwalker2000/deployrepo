import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'

  
const RestockReport = () => {
  const navigate = useNavigate();
  
  return (
  <>
     <h1 style={{color:"black"}}>Restock Report goes here</h1>
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default RestockReport;