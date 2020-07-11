import React, { useEffect, useState } from 'react';
import NotificationViewStyles from './NotificationViewStyles';
import { FaSpinner } from 'react-icons/fa';
import { makeGet, makePost } from '../../Shared/Utils/request';

export const NotificationView = props => {
  const [notifications, setNotifications] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const setNotificationList = user => {
    setLoaded(true);
    console.log(user);
    setNotifications(user.notifications);
  };

  useEffect(() => {
    let user = props.user;
    if (user === null) {
      makeGet('/auth/userData', setNotificationList);
    } else {
      setNotificationList(user);
    }
  }, []);

  const noNotifications = () => {
    return (
      <div className='no_notifications'>
        {'You do not have any notifications'}
      </div>
    );
  };

  const deleteNotification = index => {
    notifications.splice(index, 1);
    props.updateNotifications(notifications);
    makePost('/auth/updateNotifications', { notifications: notifications });
  };

  const getCards = () => {
    if (!loaded) {
      return (
        <div className='no_notifications'>
          <FaSpinner height='40' width='40' />
        </div>
      );
    }
    let cards = [];
    if (notifications !== undefined && notifications.length > 0) {
      var index = 0;
      notifications.forEach(notification => {
        cards.push(
          <div className='card'>
            <div>
              <span
                className='close'
                onClick={index => deleteNotification(index)}
              >
                &times;
              </span>
            </div>
            <div>
              <p>{notification.value}</p>
            </div>
          </div>,
        );
        index++;
      });
    } else {
      return noNotifications();
    }
    return <div className='card_list'>{cards}</div>;
  };

  return (
    <div>
      <NotificationViewStyles />
      <div className='content_header'>
        <h1>Notifications</h1>
        <div className='cart_icon'>{props.getCartIcon()}</div>
      </div>
      {getCards()}
    </div>
  );
};
