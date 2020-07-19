import React, { useEffect, useState } from 'react';
import StoreViewStyles from './StoreViewStyles';
import { FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { makeGet } from '../../Shared/Utils/request';
import { ProductCard } from './Card';
import Select from 'react-select';

export const StoreView = props => {
  const [products, setProducts] = useState([]);
  const [productCards, setProductCards] = useState([]);
  const [filter, setFilter] = useState('container');

  const setProductList = productList => {
    setProducts(productList);
  };

  useEffect(() => {
    makeGet('/products/container', setProductList);
  }, []);

  useEffect(() => {
    makeGet('/products/' + filter, setProductList);
  }, [filter]);

  useEffect(() => {
    let cards = [];
    products.forEach(product => {
      cards.push(
        <ProductCard
          product={product}
          key={product._id}
          setCartIsVisible={props.setCartIsVisible}
        />,
      );
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
      <div className='content_header'>
        <h1>Store</h1>
        <div className='store_filter'>
          <label>Browse by: </label>
          <Select
            className='select_filter'
            options={[
              { value: 'container', label: 'Containers' },
              { value: 'fill', label: 'Fill Options' },
            ]}
            defaultValue={{ value: 'container', label: 'Containers' }}
            onChange={value => setFilter(value.value)}
          />
        </div>
        <div className='cart_icon'>{props.getCartIcon()}</div>
      </div>
      <div className='card_list'>
        {productCards.length > 0 ? productCards : showLoader()}
      </div>
    </div>
  );
};
