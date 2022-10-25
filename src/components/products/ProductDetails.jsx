import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';

const ProductDetails = () => {
  const { id } = useParams();
  const { getProductDetails, productDetails } = useProducts();

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return (
    <div className='productDetails'>
      {productDetails ? (
        <div className='productDetailsCard'>
          <img src={productDetails.picture} alt="" width="300" height="300" className='productDetailsImg' />
            <div className='productDetailsPost'>
              <h5>Title:____________________________ {productDetails.name}</h5>
              <h5>Brend:____________________________ {productDetails.brend}</h5>
              <h5>Model:____________________________ {productDetails.model}</h5>
              <h5>Price:____________________________ {productDetails.price}</h5>
              <h5>Type:____________________________ {productDetails.type}</h5>
            </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  )
}

export default ProductDetails