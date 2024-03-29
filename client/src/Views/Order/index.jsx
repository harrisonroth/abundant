import React, { useEffect, useState } from 'react';
import { OrderCard } from './Card';
import { makeGet } from '../../Shared/Utils/request';
import OrderViewStyles from './OrderViewStyles';
import { FaSpinner } from 'react-icons/fa';

export const OrderView = props => {
  const [orders, setorders] = useState([]);
  const [orderCards, setorderCards] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const setOrderList = orderList => {
    setLoaded(true);
    setorders(orderList);
  };

  useEffect(() => {
    makeGet('/order/', setOrderList);
  }, []);

  useEffect(() => {
    let cards = [];
    orders.reverse().forEach(order => {
      cards.push(<OrderCard order={order} key={order._id} />);
    });
    setorderCards(cards);
  }, [orders]);

  const noOrders = () => {
    return (
      <div className='no_orders'>
        {!loaded ? (
          <FaSpinner className='spinner' height='40' width='40' />
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
      <div className='content_header'>
        <h1>Orders</h1>
        <div className='cart_icon'>{props.getCartIcon()}</div>
      </div>
      {orderCards.length ? getOrderCards() : noOrders()}
    </div>
  );
};
