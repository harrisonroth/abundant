import React, { Fragment } from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loggedIn: false,
      showSidebar: false,
      showShoppingSidebar: false,
      user: null,
    };
  }

  validateAuth() {
    let validateAuth = checkAuth(user =>
      this.setState({ loggedIn: true, user: user }),
    );
  }

  setLoggedIn(value) {
    this.setState({ loggedIn: value });
  }

  updateUserNotifications(notifications) {
    let updatedValue = this.state.user;
    updatedValue.notifications = notifications;
    this.setState({ user: updatedValue });
  }

  updateUserSettings(settings) {
    let updatedValue = this.state.user;
    updatedValue.settings = settings;
    this.setState({ user: updatedValue });
  }

  componentDidMount() {
    this.validateAuth();
  }

  logout() {
    this.setState({ loggedIn: false });
    localStorage.clear();
  }

  getCartIcon() {
    return (
      <FaShoppingCart
        size={28}
        onClick={() => {
          this.setState({
            showShoppingSidebar: !this.state.showShoppingSidebar,
          });
        }}
      />
    );
  }

  getDrawer() {
    console.log(this.state.user);
    let notifications_alert = null;
    if (this.state.user !== null && this.state.user.notifications.length > 0) {
      notifications_alert = (
        <div className='notification_alert'>
          {this.state.user.notifications.length}
        </div>
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
              this.logout();
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
  }

  render() {
    if (this.state.loggedIn) {
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
                      this.setState({ showSidebar: !this.state.showSidebar });
                    }}
                  />
                </div>
                <div className='header_title'>
                  <h1>abundant</h1>
                </div>
                <div className='header_menu_button'>{this.getCartIcon()}</div>
              </header>
              {this.state.showSidebar ? (
                <div className='collapsable_sidebar'>{this.getDrawer()}</div>
              ) : null}
              {this.state.showShoppingSidebar ? (
                <CartDrawer
                  setIsVisible={value =>
                    this.setState({ showShoppingSidebar: value })
                  }
                  isVisible={this.state.showSidebar}
                />
              ) : null}
              {/* Sidebar */}
              <aside className='sidebar'>
                <h1>abundant</h1>
                {this.getDrawer()}
              </aside>

              {/* Main */}
              <main className='main'>
                <Switch>
                  <Route exact path='/'>
                    <BottleView getCartIcon={this.getCartIcon.bind(this)} />
                  </Route>
                  <Route path='/orders'>
                    <OrderView getCartIcon={this.getCartIcon.bind(this)} />
                  </Route>
                  <Route path='/store'>
                    <StoreView getCartIcon={this.getCartIcon.bind(this)} />
                  </Route>
                  <Route path='/notifications'>
                    <NotificationView
                      getCartIcon={this.getCartIcon.bind(this)}
                      user={this.state.user}
                      updateNotifications={this.updateUserNotifications.bind(
                        this,
                      )}
                    />
                  </Route>
                  <Route path='/settings'>
                    <SettingsView
                      getCartIcon={this.getCartIcon.bind(this)}
                      user={this.state.user}
                      updateSettings={this.updateUserSettings.bind(this)}
                    />
                  </Route>
                </Switch>
              </main>
            </Router>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <NormalizeStyles />
          <BaseStyles />
          <LogInScreen setLoggedIn={x => this.setLoggedIn(x)} />
        </Fragment>
      );
    }
  }
}

export default App;
