import React, { useState, useEffect, useRef } from 'react';
import { getCartContents, removeItemFromCart } from '../../Utils/cart';
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
  const [cartItems, setCartItems] = useState([]);
  const [cartCards, setCartCards] = useState([]);

  const removeItem = index => {
    removeItemFromCart(index);
    setCartItems(getCartContents());
  };

  useEffect(() => {
    setCartItems(getCartContents());
  }, []);

  useEffect(() => {
    var cartCards = [];
    var index = 0;
    if (cartItems != null) {
      cartItems.forEach(item => {
        cartCards.push(
          <CartCard
            item={item}
            itemId={index}
            removeItem={index => removeItem(index)}
          />,
        );
        index++;
      });
    }
    setCartCards(cartCards);
  }, [cartItems]);

  const ref = useComponentVisible(props.setIsVisible);
  return (
    <div className='collapsable_sidebar_right' ref={ref}>
      <div>
        <span className='close' onClick={() => props.setIsVisible(false)}>
          &times;
        </span>
      </div>
      <div className='cart_title'>
        <h2>Cart</h2>
      </div>

      <div className='cart_list'>
        <CartCardStyles />
        {cartCards}
      </div>
      <div className='cart_buttons'>
        <Button variant='contained' className='float_right'>
          Checkout
        </Button>
      </div>
    </div>
  );
};
