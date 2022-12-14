import React, {createContext, useContext, useReducer, useState} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACTIONS, JSON_API_PRODUCTS, JSON_API_PAYMENT } from '../helpers/consts';

export const productContext = createContext();
export const useProducts = () => useContext(productContext);

const INIT_STATE = {
    products: [],
    productDetails: null
};

const reducer = (state=INIT_STATE, action) => {
    switch(action.type){
        case ACTIONS.GET_PRODUCTS:
            return { ...state, products: action.payload }
        case ACTIONS.GET_PRODUCT_DETAILS:
            return { ...state, productDetails: action.payload }
        default:
            return state;
    };
};

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const location = useLocation();

    const navigate = useNavigate();

    // get all products
    const getProducts = async () => {
        const { data } = await axios(`${JSON_API_PRODUCTS}/${window.location.search}`);
        console.log(data);
        dispatch({
            type: ACTIONS.GET_PRODUCTS,
            payload: data
        });
    };

    // add
    const addProduct = async (newProduct) => {
        await axios.post(JSON_API_PRODUCTS, newProduct);
        getProducts();
    };

    // delete
    const deleteProduct = async (id) => {
        await axios.delete(`${JSON_API_PRODUCTS}/${id}`);
        getProducts();
    };

    // update/details
    const getProductDetails = async (id) => {
        const { data } = await axios(`${JSON_API_PRODUCTS}/${id}`);
        dispatch({
            type: ACTIONS.GET_PRODUCT_DETAILS,
            payload: data
        });
    };

    const saveEditedProduct = async (newProduct) => {
        await axios.patch(`${JSON_API_PRODUCTS}/${newProduct.id}`, newProduct);
        getProducts();
    };

    // pagination 
    const fetchByParams = (quare, value) => {
        const search = new URLSearchParams(location.search);

        if(value === 'all') {
            search.delete(quare);
        }else {
            search.set(quare, value);
        };
        const url = `${location.pathname}?${search.toString()}`;
        navigate(url);
    };

    const Payment = async (newPayment) => {
        await axios.post(JSON_API_PAYMENT, newPayment);
    }


    const values = {
        addProduct,
        getProducts,
        deleteProduct,
        getProductDetails,
        saveEditedProduct,
        fetchByParams,
        Payment,

        products: state.products,
        productDetails: state.productDetails
    };

  return (
    <productContext.Provider value={values}>
        { children }
    </productContext.Provider>
  )
}

export default ProductContextProvider;