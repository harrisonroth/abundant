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
    console.log('close');
    setIsOpen(false);
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
          <div className='card_price'>$23.98</div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='detail_card'
      >
        <div className=''>
          <div className=''>
            <div onClick={closeModal}>
              <span className='close'>&times;</span>
            </div>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
