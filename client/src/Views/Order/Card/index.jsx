import React, { useEffect, useState } from 'react';
import OrderCardStyles from './OrderCardStyles';
import { Line } from 'react-chartjs-2';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export const OrderCard = props => {
  const [showItems, setShowItems] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let itemList = [];
    console.log(props.order.items);
    props.order.items.forEach(item => {
      itemList.push(
        <div className='order_item'>
          <label>Product: {item.product.name}</label>
          <label>Fill: {item.fillProduct.name}</label>
          <label>Size: {item.size}</label>
        </div>,
      );
    });
    setItems(itemList);
  }, []);

  return (
    <div className='card'>
      <OrderCardStyles />
      <div className='card_data'>
        <div className='card_title'>Order ID: {props.order._id}</div>
        {props.order.trackingId ? (
          <div className='tracking_number'>
            Tracking: {props.order.trackingId}
          </div>
        ) : null}
        <div
          className='order_items_toggle'
          onClick={() => {
            setShowItems(!showItems);
          }}
        >
          {' '}
          Items
          {showItems ? <FaCaretUp size={12} /> : <FaCaretDown size={12} />}
        </div>
        {showItems ? <div className='order_items'>{items}</div> : null}
      </div>

      <div className='card_graph'>
        <div className='flex'>
          {/* <!-- Step --> */}
          <div className='flex_1'>
            <div className='track_container'>
              <div
                className={
                  (props.order.status >= 0 ? 'circle_complete ' : '') + 'circle'
                }
              />
              <div
                className={
                  (props.order.status >= 1 ? 'connector_complete ' : '') +
                  'connector'
                }
              />
              <div
                className={
                  (props.order.status >= 1 ? 'circle_complete ' : '') + 'circle'
                }
              />
              <div
                className={
                  (props.order.status >= 2 ? 'connector_complete ' : '') +
                  'connector'
                }
              />
              <div
                className={
                  (props.order.status >= 2 ? 'circle_complete ' : '') + 'circle'
                }
              />
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='flex_1'>
            <div className='track_container'>
              <div>Processing</div>
              <div className='no_connector' />
              <div>Shipped</div>
              <div className='no_connector' />
              <div>Delivered</div>
            </div>
          </div>
        </div>
      </div>
      <div className='card_stats'></div>
    </div>
  );
};
