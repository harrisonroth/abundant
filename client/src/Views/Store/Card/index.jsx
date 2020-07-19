import React, { useEffect, useState } from 'react';
import ProductCardStyles from './ProductCardStyles';
import { makeGet } from '../../../Shared/Utils/request';
import { ProductDetailCard } from './DetailCard';
import Modal from 'react-modal';
import { Carousel } from '../../../Shared/Components/Carousel';

Modal.setAppElement('#root');

export const ProductCard = props => {
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

  const getPrice = () => {
    let min = props.product.sizes[0].price;
    let max = 0;
    props.product.sizes.forEach(size => {
      if (size.price < min) {
        min = size.price;
      }
      if (size.price > max) {
        max = size.price;
      }
    });
    return min === max ? '$' + min : '$' + min + ' - ' + max;
  };

  return (
    <div className='card' onClick={openModal}>
      <ProductCardStyles />
      <div className='card_data'>
        <div className='card_img'>
          <img src={props.product.imgs[0]} />
        </div>
        <div className='card_data'>
          <div className='row'>
            <div className='card_title'>{props.product.name}</div>
            <div className='description'>{props.product.description}</div>
          </div>
          <div className='card_price'>{getPrice()}</div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <ProductDetailCard
          closeModal={closeModal}
          product={props.product}
          setCartIsVisible={props.setCartIsVisible}
        />
      </Modal>
    </div>
  );
};
