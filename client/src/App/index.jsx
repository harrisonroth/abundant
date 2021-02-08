import React, { Fragment, useState, useEffect } from 'react';
import './FontStyles.css';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import { LogInScreen } from '../Views/Login';
import { checkAuth } from '../Shared/Utils/request';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { BottleView } from '../Views/Bottle';
import { OrderView } from '../Views/Order';
import { StoreView } from '../Views/Store';
import { getCartContents } from '../Shared/Utils/cart';
import { CartDrawer } from '../Shared/Components/CartDrawer';
import { NotificationView } from '../Views/Notifications';
import { SettingsView } from '../Views/Settings';
import { AdminView } from '../Views/Admin';
import { validateAddress } from '../Shared/Utils/variableValidation';
import { LoadingAnimation } from '../Shared/Components/LoadingAnimation';

const App = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showShoppingSidebar, setShowShoppingSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [checkingForUser, setCheckingForUser] = useState(true);

  useEffect(() => {
    checkAuth(user => {
      setLoggedIn(true);
      setUser(user);
      setCheckingForUser(false);
    });
  }, []);

  const updateUserNotifications = notifications => {
    let updatedValue = user;
    updatedValue.notifications = notifications;
    setUser(updatedValue);
  };

  const updateUserSettings = settings => {
    let updatedValue = user;
    updatedValue.settings = settings;
    setUser(updatedValue);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
  };

  const getCartIcon = () => {
    return (
      <FaShoppingCart
        size={28}
        onClick={() => {
          setShowShoppingSidebar(!showShoppingSidebar);
        }}
      />
    );
  };

  const getDrawer = () => {
    let notifications_alert = null;
    if (user !== null && user.notifications.length > 0) {
      notifications_alert = (
        <div className='notification_alert'>{user.notifications.length}</div>
      );
    }
    return (
      <div>
        <Divider />
        <div className='menu_links'>
          {['Bottles', 'Orders', 'Store', 'Notifications', 'Settings'].map(
            text => (
              <Link
                to={'/' + (text === 'Bottles' ? '' : text.toLowerCase())}
                key={text}
              >
                <ListItem button>
                  {text === 'Notifications' ? notifications_alert : null}
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ),
          )}
          <Link
            to={''}
            key='Logout'
            onClick={() => {
              logout();
            }}
          >
            <ListItem button>
              <ListItemText primary='Logout' />
            </ListItem>
          </Link>
        </div>
        <Divider />
      </div>
    );
  };

  const siteContents = () => {
    return (
      <Fragment>
        <NormalizeStyles />
        <BaseStyles />
        <div className='content'>
          <Router>
            {/* Header */}
            <header>
              <div className='header_menu_button'>
                <FaBars
                  size={28}
                  onClick={() => {
                    setShowSidebar(!showSidebar);
                  }}
                />
              </div>
              <div className='header_title'>
                <h1>
                  <Link to={'/' + (user != null && user.admin ? 'admin' : '')}>
                    abundant
                  </Link>
                </h1>
              </div>
              <div className='header_menu_button'>{getCartIcon()}</div>
            </header>
            {showSidebar ? (
              <div className='collapsable_sidebar'>{getDrawer()}</div>
            ) : null}
            {showShoppingSidebar ? (
              <CartDrawer
                setIsVisible={value => setShowShoppingSidebar(value)}
                isVisible={showSidebar}
                user={user}
              />
            ) : null}
            {/* Sidebar */}
            <aside className='sidebar'>
              <h1>
                <Link to={'/' + (user != null && user.admin ? 'admin' : '')}>
                  abundant
                </Link>
              </h1>
              {getDrawer()}
            </aside>

            {/* Main */}
            <main className='main'>
              <Switch>
                <Route exact path='/'>
                  <BottleView getCartIcon={getCartIcon.bind(this)} />
                </Route>
                <Route path='/orders'>
                  <OrderView getCartIcon={getCartIcon.bind(this)} />
                </Route>
                <Route path='/store'>
                  <StoreView
                    getCartIcon={getCartIcon.bind(this)}
                    setCartIsVisible={value => setShowShoppingSidebar(value)}
                  />
                </Route>
                <Route path='/notifications'>
                  <NotificationView
                    getCartIcon={getCartIcon.bind(this)}
                    user={user}
                    updateNotifications={updateUserNotifications.bind(this)}
                  />
                </Route>
                <Route path='/settings'>
                  <SettingsView
                    getCartIcon={getCartIcon.bind(this)}
                    user={user}
                    updateSettings={updateUserSettings.bind(this)}
                  />
                </Route>
                <Route path='/admin'>
                  <AdminView user={user} />
                </Route>
              </Switch>
            </main>
          </Router>
        </div>
      </Fragment>
    );
  };

  if (checkingForUser) {
    return null;
  }

  if (loggedIn) {
    return siteContents();
  } else {
    return (
      <Fragment>
        <NormalizeStyles />
        <BaseStyles />
        <LogInScreen setLoggedIn={x => setLoggedIn(x)} />
      </Fragment>
    );
  }
};

export default App;
