import React, { useEffect, useState } from 'react';
import { BottleCard } from './Card';
import { makeGet } from '../../Shared/Utils/request';
import BottleViewStyles from './BottleViewStyles';
import { FaSpinner } from 'react-icons/fa';

export const BottleView = props => {
  const [bottles, setBottles] = useState([]);
  const [bottleCards, setBottleCards] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const setBottleList = bottleList => {
    console.log(bottleList);
    setLoaded(true);
    setBottles(bottleList);
  };

  useEffect(() => {
    makeGet('/bottles/', setBottleList);
  }, []);

  useEffect(() => {
    console.log("Behavior when the value of 'foo' changes.");
    let cards = [];
    if (bottles.length > 0) {
      bottles.forEach(bottle => {
        cards.push(<BottleCard bottle={bottle} key={bottle.id} />);
        cards.push(<BottleCard bottle={bottle} key={bottle.id} />);
      });
    }
    setBottleCards(cards);
  }, [bottles]);

  const noBottles = () => {
    return (
      <div className='no_bottles'>
        {!loaded ? (
          <FaSpinner height='40' width='40' />
        ) : (
          'No containers are associated with your account'
        )}
      </div>
    );
  };

  const getBottleCards = () => {
    return <div className='card_list'>{bottleCards}</div>;
  };

  return (
    <div>
      <BottleViewStyles />
      <div className='content_header'>
        <h1>Containers</h1>
        <div className='cart_icon'>{props.getCartIcon()}</div>
      </div>
      {bottleCards.length > 0 ? getBottleCards() : noBottles()}
    </div>
  );
};
