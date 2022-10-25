import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
import { useNavigate } from 'react-router-dom';

// mui 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    brend: '',
    price: '',
    picture: '',
    model: '',
    type: '',
    size: ''
  });

  const handleInp = e => {
    if(e.target.name === 'price'){
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value)
      };
      setProduct(obj);
    }else{
      let obj = {
        ...product,
        [e.target.name]: e.target.value
      };
      setProduct(obj);
    };
  };

  // check User 
  const name = JSON.parse(localStorage.getItem('username'));



  return (
    <div className='addProductCard'>
      {name ? (
        <Box className='addProducBox'
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
        >
        <h1>Hello, {name}!</h1>
        <h3>Do you want to add a product!</h3>
        <TextField fullWidth label="Name" name="name" id="fullWidth" onChange={handleInp} value={product.name} /><br/><br /> 
        <TextField fullWidth label="Brend" name="brend" id="fullWidth" onChange={handleInp} value={product.brend} /><br/><br /> 
        <TextField fullWidth label="Model" name="model" id="fullWidth" onChange={handleInp} value={product.model} /><br/><br /> 
        <TextField fullWidth label="Type" name="type" id="fullWidth" onChange={handleInp} value={product.type} /><br/><br /> 
        <TextField fullWidth label="Price" type="number" name="price" id="fullWidth" onChange={handleInp} value={product.price} /><br/><br /> 
        <TextField fullWidth label="Size" type="number" name="size" id="fullWidth" onChange={handleInp} value={product.size} /><br/><br /> 
        <TextField fullWidth label="Picture" name="picture" id="fullWidth" onChange={handleInp} value={product.picture} /><br/> 
        <Button variant="outlined" color="success"
          className='addProductBtn'
          onClick={() => {
          addProduct(product);
          navigate('/products');
          }} >
         Add Product
        </Button>
      </Box>
      ) : (
        <div  className='adminPageError'>
          <h2>You are not Admin!!!</h2>
        </div>
      )}
    </div>
  )
}

export default AddProduct