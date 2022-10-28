import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider'
import { useNavigate } from 'react-router-dom';  
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Payment = () => {
  const { Payment } = useProducts();
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
      name: '',
      adress: '',
      cardNumber: '',
      phoneNumber: '',
      email: ''
  });


  const handleInp = (e) => {
      if(e.target.name === 'cardNumber'){
          let obj = {
              ...payment,
              [e.target.name]: Number(e.target.value)
          };
          setPayment(obj);
      }else if(e.target.name === 'phoneNumber'){
          let obj = {
              ...payment,
              [e.target.name]: Number(e.target.value)
          };
          setPayment(obj);
      }else{
        let obj = {
          ...payment,
          [e.target.name]: e.target.value
      };
      setPayment(obj);
      }

  };


  return (
        <div className='payment'>
            <div className='paymentList'>
            <TextField fullWidth label="Name" name="name" id="fullWidth" onChange={handleInp} value={payment.name} /><br/><br /> 
            <TextField fullWidth label="Name" name="email" id="fullWidth" onChange={handleInp} value={payment.email} /><br/><br /> 
            <TextField fullWidth label="Email" name="adress" id="fullWidth" onChange={handleInp} value={payment.adress} /><br/><br /> 
            <TextField fullWidth label="Adress" name="phone" id="fullWidth" onChange={handleInp} value={payment.cardNumber} /><br/><br /> 
            <TextField fullWidth label="Card Number" type="number" name="card" id="fullWidth" onChange={handleInp} value={payment.phoneNumber} /><br/><br /> 
            <Button variant="contained"  color="warning" onClick={() => {Payment(payment); navigate('/products')}}>Buy Now</Button>
            </div>
        </div>
  )
}

export default Payment