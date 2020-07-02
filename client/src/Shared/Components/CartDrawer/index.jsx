import React, { useState, useEffect, useRef } from 'react';
import { getCartContents } from '../../Utils/cart';
import { CartCard } from './Card';
import CartCardStyles from './Card/CartCardStyles';
import { Button } from '@material-ui/core';

function useComponentVisible(setIsComponentVisible) {
  const ref = useRef(null);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return ref;
}

export const CartDrawer = props => {
  const getSidebarCards = () => {
    var cart = getCartContents();
    var cartCards = [];
    var index = 0;
    cart.forEach(item => {
      cartCards.push(<CartCard item={item} itemId={index} />);
      index++;
    });
    return cartCards;
  };

  const ref = useComponentVisible(props.setIsVisible);
  return (
    <div className='collapsable_sidebar_right' ref={ref}>
      <div>
        <span className='close' onClick={() => props.setIsVisible(false)}>
          &times;
        </span>
      </div>
      <div clasName='cart_title'>
        <h2>Cart</h2>
      </div>

      <div className='cart_list'>
        <CartCardStyles />
        {getSidebarCards()}
      </div>
      <div className='cart_buttons'>
        <Button variant='contained' className='float_right'>
          Checkout
        </Button>
      </div>
    </div>
  );
};
