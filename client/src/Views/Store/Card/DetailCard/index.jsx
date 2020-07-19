import React, { useEffect, useState } from 'react';
import ProductCardStyles from './ProductDetailCardStyles';
import { makeGet } from '../../../../Shared/Utils/request';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { addItemToCart } from '../../../../Shared/Utils/cart';
import { Carousel } from '../../../../Shared/Components/Carousel';

export const ProductDetailCard = props => {
  const [secondaryProducts, setProducts] = useState([]);
  const [productCards, setProductCards] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [step, setStep] = useState(1);
  const [containerSize, setContainerSize] = useState(null);
  const [showSelectError, setShowSelectError] = useState(false);
  const [selectedSecondary, setSelectedSecondary] = useState(null);

  const setProductList = productList => {
    if (productList.length > 0) {
      setSelectedSecondary(productList[0]._id);
    }
    setProducts(productList);
  };

  useEffect(() => {
    setSizeOptions();
    makeGet(
      '/products/' + (props.product.type === 'Fill' ? 'container' : 'fill'),
      setProductList,
    );
  }, []);

  const addToCart = e => {
    var item = {};
    if (props.product.type === 'container') {
      item = {
        product: props.product,
        quantity: 1,
        fillProduct: secondaryProducts.find(
          product => product._id === selectedSecondary,
        ),
        size: containerSize,
      };
    } else {
      item = {
        fillProduct: props.product,
        quantity: 1,
        product: secondaryProducts.find(
          product => product._id === selectedSecondary,
        ),
        size: containerSize,
      };
    }
    addItemToCart(item);
    props.closeModal(e);
    props.setCartIsVisible(true);
  };

  const getStepTwoOptions = () => {
    let returnList = [];
    secondaryProducts.forEach(product => {
      returnList.push(
        <div
          className={
            'option' +
            (product._id === selectedSecondary ? ' selected_option' : '')
          }
          onClick={() => {
            setSelectedSecondary(product._id);
          }}
        >
          <h3>
            {product.name} - {getSecondayPrice(product)}
          </h3>
          <p>{product.description}</p>
        </div>,
      );
    });
    return returnList;
  };

  const setSizeOptions = () => {
    let list = [];
    props.product.sizes.forEach(size => {
      let cur = size;
      cur.label = size.label + ' - ' + size.size + ' - $' + size.price;
      cur.value = size.size;
      list.push(cur);
    });
    setSizes(list);
  };

  const getSecondayPrice = product => {
    if (
      product.sizes.find(size => {
        return size.size === containerSize;
      })
    ) {
      return (
        '$' +
        product.sizes.find(size => {
          return size.size === containerSize;
        }).price
      );
    }
  };

  const getStepOne = product => {
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
            {product.type === 'Container' ? (
              <div className='size_selector'>
                <label>
                  Select Size:{' '}
                  {showSelectError ? <b>Must select size</b> : null}
                </label>
                <Select
                  options={sizes}
                  onChange={value => setContainerSize(value.value)}
                />
              </div>
            ) : null}
          </div>
          {step == 1 ? (
            <div className='next_step_button'>
              <Button
                variant='contained'
                className='float_right'
                onClick={() => {
                  if (product.type !== 'Container' || containerSize != null) {
                    setStep(2);
                  } else {
                    setShowSelectError(true);
                  }
                }}
              >
                {product.type === 'Container'
                  ? 'Select Contents'
                  : 'Select Container'}
              </Button>
            </div>
          ) : (
            <div className='add_to_cart'>
              <Button
                variant='contained'
                className='float_right'
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getStepTwo = () => {
    return (
      <div className='section_two'>
        <h2>
          {props.product.type === 'Container'
            ? 'Select Contents'
            : 'Select Container'}
        </h2>
        <div className='content'>
          <div className='options'>{getStepTwoOptions()}</div>
          <div className='option_details'>
            {getStepOne(
              secondaryProducts.find(
                product => product._id === selectedSecondary,
              ),
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='detail_card'>
      <ProductCardStyles />
      <div>
        <span className='close' onClick={props.closeModal}>
          &times;
        </span>
      </div>
      {step === 1 ? getStepOne(props.product) : getStepTwo()}
    </div>
  );
};
