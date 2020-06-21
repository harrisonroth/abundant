import React, { useEffect, useState } from 'react';
import OrderCardStyles from './OrderCardStyles';
import { Line } from 'react-chartjs-2';

export const OrderCard = props => {
  return (
    <div className='card'>
      <OrderCardStyles />
      <div className='card_data'>
        <div className='card_title'>{props.order.type}</div>
        <div className='tracking_number'>
          Tracking: UPS - {props.order.trackingId}
        </div>
      </div>

      <div className='card_graph'>
        <div className='flex'>
          {/* <!-- Step --> */}
          <div className='flex_1'>
            <div className='track_container'>
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
              <div
                className={
                  (props.order.status >= 3 ? 'connector_complete ' : '') +
                  'connector'
                }
              />
              <div
                className={
                  (props.order.status >= 3 ? 'circle_complete ' : '') + 'circle'
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
