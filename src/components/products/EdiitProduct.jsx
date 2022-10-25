import React, { useState, useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

// mui 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const EditProduct = () => {
  const { getProductDetails, productDetails, saveEditedProduct } = useProducts();

  const [product, setProduct] = useState(productDetails);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductDetails(id);
  }, []);

  useEffect(() => {
    setProduct(productDetails);
  }, [productDetails, ]);

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

  return (
    <>
    {product ? (
      <div className='EditProductCard'>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
          >
            <TextField fullWidth label="Name" name="name" id="fullWidth" onChange={handleInp} value={product.name} /><br/><br /> 
            <TextField fullWidth label="Brend" name="brend" id="fullWidth" onChange={handleInp} value={product.brend} /><br/><br /> 
            <TextField fullWidth label="Model" name="model" id="fullWidth" onChange={handleInp} value={product.model} /><br/><br /> 
            <TextField fullWidth label="Type" name="type" id="fullWidth" onChange={handleInp} value={product.type} /><br/><br /> 
            <TextField fullWidth label="Price" type="number" name="price" id="fullWidth" onChange={handleInp} value={product.price} /><br/><br /> 
            <TextField fullWidth label="Picture" name="picture" id="fullWidth" onChange={handleInp} value={product.picture} /><br/> 
            <Button variant="contained" disableElevation 
              className='addProductBtn'
              onClick={() => {
              saveEditedProduct(product);
              navigate('/products');
              }} >
            Save Changes
            </Button>
        </Box>
      </div>
    ) : (
      <h3>Loading...</h3>
    )}
    </>
  )
};

export default EditProduct;