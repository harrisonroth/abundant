import React, { useEffect, useState } from 'react';
import StoreViewStyles from './StoreViewStyles';
import { FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { makeGet } from '../../Shared/Utils/request';
import { ProductCard } from './Card';

export const StoreView = () => {
  const [showShoppingSidebar, setShoppingSidebar] = useState(false);

  const [products, setProducts] = useState([]);
  const [productCards, setProductCards] = useState([]);

  const setProductList = productList => {
    console.log(productList);
    setProducts(productList);
  };

  useEffect(() => {
    makeGet('/products/container', setProductList);
  }, []);

  useEffect(() => {
    let cards = [];
    products.forEach(product => {
      cards.push(<ProductCard product={product} key={product._id} />);
    });
    setProductCards(cards);
  }, [products]);

  const showLoader = () => {
    return (
      <div className='loader'>
        <FaSpinner height='40' width='40' />
      </div>
    );
  };

  return (
    <div>
      <StoreViewStyles />
      <div className='store_header'>
        <h1>Store</h1>
        <div className='cart_icon'>
          <FaShoppingCart
            size='2x'
            height='20'
            width='20'
            onClick={() => {
              this.setShoppingSidebar(!this.state.showShoppingSidebar);
            }}
          />
        </div>
      </div>
      <div className='card_list'>
        {productCards.length > 0 ? productCards : showLoader()}
      </div>
    </div>
  );
};
