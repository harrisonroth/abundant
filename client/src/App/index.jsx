import React, { Fragment, useState, useEffect } from 'react';
import './FontStyles.css';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import { LogInScreen } from '../Views/Login';
import { checkAuth } from '../Shared/Utils/request';
import { FaBars } from 'react-icons/fa';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const validateAuthentication = () => {
    let authResponse = checkAuth();
    if (authResponse !== 'Error' && authResponse !== undefined) {
      this.setState({ loggedIn: true });
    }
    console.log(authResponse);
  };

  const handleLogIn = value => {
    console.log('loggedin: ' + value);
    setLoggedIn(value);
  };

  useEffect(() => {
    validateAuthentication();
  }, []);

  const Drawer = () => (
    <div>
      <Divider />
      <div className='menu_links'>
        {['Bottles', 'Orders', 'Store', 'Notifications', 'Settings'].map(
          text => (
            <Link to={'/' + text.toLowerCase()} key={text}>
              <ListItem button>
                <ListItemText primary={text} />
              </ListItem>
              {/* <div className="menu_link">
              <span>
                {text}
              </span> */}
              {/* </div> */}
            </Link>
          ),
        )}
      </div>
      <Divider />
    </div>
  );

  return loggedIn ? (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <div className='content'>
        <Router>
          {/* Header */}
          <header>
            <div className='header_menu_button'>
              <FaBars
                size='4x'
                height='120'
                width='120'
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </div>
            <div className='header_title'>
              <h1>abundant</h1>
            </div>
          </header>
          {showSidebar ? (
            <div className='collapsable_sidebar'>
              <Drawer />
            </div>
          ) : null}
          {/* Sidebar */}
          <aside className='sidebar'>
            <h1>abundant</h1>
            <Drawer />
          </aside>

          {/* Main */}
          <main className='main'>
            <Switch>
              {/* <Route exact path="/bottles" ><BottleView /></Route>
            <Route path="/orders"><OrderView /></Route>
            <Route path="/store"><StoreView /></Route>
            <Route path="/notifications"><NotificationView /></Route>
            <Route path="/settings"><SettingsView /></Route> */}
            </Switch>
          </main>
        </Router>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <LogInScreen setLoggedIn={handleLogIn} />
    </Fragment>
  );
};

export default App;
