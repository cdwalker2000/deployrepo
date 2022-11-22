import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'

  
const BestSellersReport = () => {
  const navigate = useNavigate();
  
  return (
  <>
     <h1 style={{color:"black"}}>Best Sellers Report goes here</h1>
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default BestSellersReport;