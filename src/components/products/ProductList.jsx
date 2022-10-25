import React, { useEffect, useState } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
import ProductCard from '../products/ProductCard';
import { useSearchParams } from 'react-router-dom';
import RecipeReviewCard from './ProductCard';
// mui 
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
// for pagination
import Pagination from '@mui/material/Pagination';

// for filtration
import FilterProduct from './FilterProduct';

const ProductsList = () => {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // console.log('Сработал юз эффект для местного состояния, утановка параметров запроса');
    setSearchParams({
      q: search
    });
  }, [search, ]);

  useEffect(() => {
    // console.log('Сработал юз эффект, который следит за изменением параметров запроса, вызвана функция получения всех продуктов(с параметрами запроса)');
    getProducts();
  }, [searchParams, ]);
  
    // mui 
    const [values, setValues] = React.useState({
      amount: '',
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    // pagination 
    const [page, setPage] = useState(1);
    
    const itemsOnPage = 8;
    
    const count = Math.ceil(products.length / itemsOnPage);
    const handlePage = (e, p) => {
      setPage(p);
    };

    function currentData() {
      const begin = (page - 1) * itemsOnPage;

      const end = begin + itemsOnPage;
      return products.slice(begin, end)
    };
    

  return (
    <div className='productListSearch'>
        <FilterProduct />
          <FormControl fullWidth sx={{ m: 1 }} variant="standard" value={search} onChange={e => setSearch(e.target.value)} placeholder='Search...' className='serachInt' >
            <Input
              id="standard-adornment-amount"
              value={values.amount}
              onChange={handleChange('amount')}
              placeholder="Search..."
            />
        </FormControl>

        <div className='productListMainCard'>
          <div className='cardListCard'>
            {products ? (
              currentData().map(item => (
                <RecipeReviewCard key={item.id} item={item} />
              ))
              ) : (
                <h3>Loading...</h3>
              )}
          </div>
            <div className='pagination'><Pagination  count={count} page={page} onChange={handlePage} variant="outlined" /></div>
        </div>
      </div>
  )
}

export default ProductsList