import React, { useState } from 'react';
import { baseUrl } from '../../Utils/request';
import CarouselStyles from './CarouselStyles';

export const Carousel = props => {
  const [currImg, setImg] = useState(0);
  const [imgs, setImgs] = useState(props.imgs);

  const Arrow = ({ direction, clickFunction, glyph }) => (
    <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
      {glyph}
    </div>
  );

  const ImageSlide = ({ props }) => {
    return (
      <div className='image-slide'>
        <img alt='' src={imgs[currImg]} />
      </div>
    );
  };

  const nextSlide = () => {
    if (currImg + 1 === imgs.length) {
      setImg(0);
    } else {
      setImg(currImg + 1);
    }
  };

  const previousSlide = () => {
    if (currImg === 0) {
      setImg(imgs.length - 1);
    } else {
      setImg(currImg - 1);
    }
  };

  return (
    <div className='carousel'>
      <CarouselStyles />
      <Arrow direction='left' clickFunction={previousSlide} glyph='&#9664;' />

      <ImageSlide />

      <Arrow direction='right' clickFunction={nextSlide} glyph='&#9654;' />
    </div>
  );
};
