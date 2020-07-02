import React, { useEffect, useState } from 'react';
import ProductCardStyles from './ProductCardStyles';
import { makeGet } from '../../../Shared/Utils/request';
import { ProductDetailCard } from './DetailCard';
import Modal from 'react-modal';

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
    if (props.product.type == 'Fill') {
      return '+$3.99'; //+props.product.price;
    } else {
      return '$24.00 - 35.99';
    }
  };

  return (
    <div className='card' onClick={openModal}>
      <ProductCardStyles />
      <div className='card_data'>
        <div className='card_img'>
          <img />
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
        <ProductDetailCard closeModal={closeModal} product={props.product} />
      </Modal>
    </div>
  );
};
