import React, { useState, useEffect, useRef } from 'react';
import { removeItemFromCart } from '../../../Utils/cart';

export const CartCard = props => {
  return (
    <div className='cart_card'>
      <div>
        <span
          className='close'
          onClick={() => {
            removeItemFromCart(props.itemId);
          }}
        >
          &times;
        </span>
      </div>
      <div className='item_name'>{props.item.product.name}</div>
      <div className='item_data'>
        <div className='item_fill'>
          Fill Product: {props.item.fillProduct.name}
        </div>
        <div className='item_size'>Size: {props.item.size}</div>
      </div>
    </div>
  );
};
