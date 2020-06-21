import React, { useEffect, useState } from 'react';
import ProductCardStyles from './ProductDetailCardStyles';

export const ProductDetailCard = props => {
  return (
    <div className='detail_card'>
      <ProductCardStyles />

      <div className='detail_card_content'>
        <span className='close' onClick={() => props.hide()}>
          &times;
        </span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
};
