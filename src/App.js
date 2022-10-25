import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainRoutes from './MainRoutes';
// Импортируем наши contextы 
import AuthContextProvider from './contexts/AuthContextProvider';
import ProductContextProvider from './contexts/ProductContextProvider';
import CartContextProvider from './contexts/CartConctextProvider';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
    {/* Всё оборачиваем на contexts */}
      <CartContextProvider>
        <ProductContextProvider>
          <AuthContextProvider>
            <Navbar />
            <MainRoutes />
            <Footer />
          </AuthContextProvider>
        </ProductContextProvider>
      </CartContextProvider>
    </>
  )
}

export default App;
