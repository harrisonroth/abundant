import React, { Fragment } from 'react';
import './FontStyles.css';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import { LogInScreen } from '../Views/Login';
import { checkAuth } from '../Shared/Utils/request';
import { FaBars } from 'react-icons/fa';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class App extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      "loggedIn": false,
      "showSidebar": false,
    };
  }

  validateAuth() {
    let validateAuth = checkAuth();
    if (validateAuth !== "Error" && validateAuth !== undefined) {
      this.setState({"loggedIn" : true});
    }
    console.log(validateAuth);
  }

  setLoggedIn(value) {
    console.log("loggedin: " + value);
    this.setState({"loggedIn": value});
  }

  componentDidMount() {
    this.validateAuth();
  }

  getDrawer() {
    return (
      <div>
        <Divider />
        <div className="menu_links">
          {['Bottles', 'Orders', 'Store', 'Notifications', 'Settings'].map((text) => (
            <Link to={"/" + text.toLowerCase()} key={text}>
              <ListItem button>
              <ListItemText primary={text} />
              </ListItem>
              {/* <div className="menu_link">
                <span>
                  {text}
                </span> */}
              {/* </div> */}
            </Link>
          ))}
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
          <div className="content">
            <Router>
              {/* Header */}
              <header>
                <div className="header_menu_button">
                  <FaBars size="4x" height="120" width="120" onClick={() => {
                    this.setState({ showSidebar: !this.state.showSidebar })
                  }}/>
                </div>
                <div className="header_title">
                  <h1>abundant</h1>
                </div>
              </header>
              { this.state.showSidebar ?
                <div className="collapsable_sidebar">
                  {this.getDrawer()}
                </div>
                : null
              }
              {/* Sidebar */}
              <aside className="sidebar">
                <h1>abundant</h1>
                {this.getDrawer()}
              </aside>
              
              {/* Main */}
              <main className="main">
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
      );
    } else {
      return (
        <Fragment>
          <NormalizeStyles />
          <BaseStyles />
          <LogInScreen setLoggedIn={(x) => this.setLoggedIn(x)} />
        </Fragment>
      )
    }
  }
}

export default App;
