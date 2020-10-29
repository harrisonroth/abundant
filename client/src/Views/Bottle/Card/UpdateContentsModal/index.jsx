import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Carousel } from '../../../../Shared/Components/Carousel';
import { makePost } from '../../../../Shared/Utils/request';
import { ProductDetailCard } from '../../../Store/Card/DetailCard';
import ProductCardStyles from '../../../Store/Card/ProductCardStyles';

export const UpdateContentsModal = props => {
  const [selectedOption, setSelectedOption] = useState(props.products[0]._id);

  const updateRefillContents = e => {
    let product = props.products.find(
      product => product._id === selectedOption,
    );
    makePost(
      '/bottles/' + props.bottle._id + '/updateContents',
      {
        refillContents: product._id,
        refillContentsName: product.name,
      },
      () => {
        props.updateBottles();
        props.closeModal(e);
      },
    );
  };

  const getPrice = product => {
    if (
      product.sizes.find(size => {
        return size.size === props.bottle.size;
      })
    ) {
      return (
        '$' +
        product.sizes.find(size => {
          return size.size === props.bottle.size;
        }).price
      );
    }
  };

  const getDetails = product => {
    return (
      <div className='section_one'>
        <div className='product_images'>
          <div className='card_img_detail'>
            <Carousel imgs={product.imgs} />
          </div>
        </div>
        <div className='detail_data'>
          <div className='detail_contents'>
            <div className='detail_title'>
              <h2>{product.name}</h2>
            </div>
            <div className='product_description'>{product.description}</div>
          </div>
          <div className='add_to_cart'>
            <Button
              variant='contained'
              className='float_right'
              onClick={updateRefillContents}
            >
              Update Refill Contents
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const getOptions = () => {
    let returnList = [];
    props.products.forEach(product => {
      returnList.push(
        <div
          className={
            'option' +
            (product._id === selectedOption ? ' selected_option' : '')
          }
          onClick={() => {
            setSelectedOption(product._id);
          }}
        >
          <h3>
            {product.name} - {getPrice(product)}
          </h3>
          <p>{product.description}</p>
        </div>,
      );
    });
    return returnList;
  };

  const updateRefillOptions = () => {
    return (
      <div className='refill_options'>
        <ProductCardStyles />
        <h2>Select New Contents</h2>
        <div className='content'>
          <div className='options'>{getOptions()}</div>
          <div className='option_details'>
            {getDetails(
              props.products.find(product => product._id === selectedOption),
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='refill_options'>
      <div>
        <span className='close' onClick={props.closeModal}>
          &times;
        </span>
      </div>
      {updateRefillOptions()}
    </div>
  );
};
