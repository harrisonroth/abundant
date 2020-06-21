import React, { useEffect, useState } from 'react';
import { OrderCard } from './Card';
import { makeGet } from '../../Shared/Utils/request';
import OrderViewStyles from './OrderViewStyles';
import { FaSpinner } from 'react-icons/fa';

export const OrderView = () => {
  const [orders, setorders] = useState([]);
  const [orderCards, setorderCards] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const setorderList = orderList => {
    console.log(orderList);
    setLoaded(true);
    setorders(orderList);
  };

  useEffect(() => {
    makeGet('/order/', setorderList);
  }, []);

  useEffect(() => {
    console.log("Behavior when the value of 'foo' changes.");
    let cards = [];
    orders.forEach(order => {
      cards.push(<OrderCard order={order} key={order._id} />);
    });
    setorderCards(cards);
  }, [orders]);

  const noOrders = () => {
    return (
      <div className='no_orders'>
        {!loaded ? (
          <FaSpinner height='40' width='40' />
        ) : (
          'No orders are associated with your account'
        )}
      </div>
    );
  };

  const getOrderCards = () => {
    return <div className='card_list'>{orderCards}</div>;
  };

  return (
    <div>
      <OrderViewStyles />
      {orderCards.length ? getOrderCards() : noOrders()}
    </div>
  );
};
