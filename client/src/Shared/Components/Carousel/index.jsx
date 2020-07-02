import React, { useState } from 'react';
import { baseUrl } from '../../Utils/request';

export const Carousel = props => {
  const [currImg, setImg] = useState(0);

  const Arrow = ({ direction, clickFunction, glyph }) => (
    <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
      {glyph}
    </div>
  );

  const ImageSlide = ({ props }) => {
    const styles = {
      backgroundImage: `url(./wheat-field-2623323_1280.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    return (
      <div className='image-slide'>
        <img alt='' src={baseUrl + '/public/images/product1.jpg'} />
      </div>
    );
  };

  const nextSlide = () => {
    if (currImg + 1 === props.imgs.length) {
      setImg(0);
    } else {
      setImg(currImg++);
    }
  };

  const previousSlide = () => {
    if (currImg === 0) {
      setImg(props.imgs.length - 1);
    } else {
      setImg(currImg--);
    }
  };

  return (
    <div className='carousel'>
      <Arrow direction='left' clickFunction={previousSlide} glyph='&#9664;' />

      <ImageSlide />

      <Arrow direction='right' clickFunction={nextSlide} glyph='&#9654;' />
    </div>
  );
};
