import React, { useState, useEffect, useRef } from 'react';
import { getCartContents, removeItemFromCart } from '../../Utils/cart';
import { CartCard } from './Card';
import CartCardStyles from './Card/CartCardStyles';
import { Button } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
import { CheckoutForm } from './Checkout/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51H5cuhBlog3CYTmE5G41BqgL6ZhNmYgcSSf7YgykC5IX6KWBJN1jknowTKO4l3XvhWHTW4dzaDTTcf5Ymj8gmWHT00Qus2EI0C',
);

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
  const [cartPrice, setCartPrice] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = e => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const modalStyles = {
    content: {
      borderRadius: '15px',
    },
  };

  const removeItem = index => {
    removeItemFromCart(index);
    setCartItems(getCartContents());
  };

  useEffect(() => {
    setCartItems(getCartContents());
  }, []);

  const getPrice = (item, size) => {
    let price = item.product.sizes.find(itemSize => {
      return itemSize.size === size;
    }).price;
    price += item.fillProduct.sizes.find(itemSize => {
      return itemSize.size === size;
    }).price;
    return price;
  };

  useEffect(() => {
    var cartCards = [];
    var index = 0;
    var totalPrice = 0;
    if (cartItems != null) {
      cartItems.forEach(item => {
        var itemPrice = getPrice(item, item.size);
        totalPrice += itemPrice;
        cartCards.push(
          <CartCard
            item={item}
            itemId={index}
            removeItem={index => removeItem(index)}
            price={itemPrice}
          />,
        );
        index++;
      });
    }
    setCartCards(cartCards);
    setCartPrice(totalPrice);
  }, [cartItems]);

  const ref = useComponentVisible(modalIsOpen ? () => {} : props.setIsVisible);
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
      <div className='cart_price'>
        <h3>Subtotal: ${cartPrice}</h3>
      </div>
      <div className='cart_buttons'>
        <Button variant='contained' className='float_right' onClick={openModal}>
          Checkout
        </Button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='checkout'>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              items={cartItems}
              price={cartPrice}
              closeModal={closeModal}
            />
          </Elements>
        </div>
      </Modal>
    </div>
  );
};
