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

class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loggedIn: false,
      showSidebar: false,
      cart: [],
    };
  }

  validateAuth() {
    let validateAuth = checkAuth(() => this.setState({ loggedIn: true }));
    console.log(validateAuth);
  }

  setLoggedIn(value) {
    console.log('loggedin: ' + value);
    this.setState({ loggedIn: value });
  }

  componentDidMount() {
    this.validateAuth();
  }

  logout() {
    localStorage.removeItem('token');
  }

  getDrawer() {
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
                    size='4x'
                    height='120'
                    width='120'
                    onClick={() => {
                      this.setState({ showSidebar: !this.state.showSidebar });
                    }}
                  />
                </div>
                <div className='header_title'>
                  <h1>abundant</h1>
                </div>
                <div className='header_menu_button'>
                  <FaShoppingCart
                    size='4x'
                    height='120'
                    width='120'
                    onClick={() => {
                      this.setState({
                        showShoppingSidebar: !this.state.showShoppingSidebar,
                      });
                    }}
                  />
                  <div
                    className={this.state.cart.length > 0 ? 'indicator' : ''}
                  />
                </div>
              </header>
              {this.state.showSidebar ? (
                <div className='collapsable_sidebar'>{this.getDrawer()}</div>
              ) : null}
              {this.state.showShoppingSidebar ? (
                <div className='collapsable_sidebar_right'></div>
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
                    <BottleView />
                  </Route>
                  <Route path='/orders'>
                    <OrderView />
                  </Route>
                  <Route path='/store'>
                    <StoreView />
                  </Route>
                  {/* <Route path="/notifications"><NotificationView /></Route>
                  <Route path="/settings"><SettingsView /></Route> */}
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
