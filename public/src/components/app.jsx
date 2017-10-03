import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';
import Dashboard from './dashboard.jsx';
import Sidenav from './sidenav.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      token: '',
      activeNav: 'dashboard',
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getAuth = this.getAuth.bind(this);
  }

  getAuth() {
    return this.state.token;
  }

  onLogin(token) {
    this.setState({loggedIn: true, token: token});
    window.sessionStorage.setItem('healthme_jwt_token', token);
  }

  onLogout(e) {
    e && e.preventDefault();
    this.setState({loggedIn: false, token: ''});
    window.sessionStorage.removeItem('healthme_jwt_token');
  }

  renderNav() {
    if (this.state.loggedIn) {
      return (
        <Route path="/:nav?" component={Sidenav}/>
      );
    }
  }

  renderMainWindow() {
    if (!this.state.loggedIn) {
      return (
        <Switch>
          <Route path="/login" render={props => <Login onLogin={this.onLogin} />} />
          <Route path="/signup" render={props => <Signup onLogin={this.onLogin} />} />
          <Redirect to="/login" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/dashboard" render={props => <Dashboard getAuth={this.getAuth} /> } />
          <Route path="/reports" render={props => <ReportsPlaceholder getAuth={this.getAuth} /> } />
          <Route path="/settings" render={props => <SettingsPlaceholder getAuth={this.getAuth} /> } />
          <Route path="/" render={props => <Redirect to="/dashboard" />} />
        </Switch>
      );
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app-header">
          <Link to="/dashboard" className="app-header-title"><span>HealthMe</span></Link>
        </div>
        <div className="app-full-window">
          {this.renderNav()}
          <div className="app-main-window">
            {this.renderMainWindow()}
          </div>
        </div>
        <div className="app-footer">
          <div className="app-footer-content"><span>©2017 BeanieIo</span></div>
        </div>
      </div>
    );
  }
}

const ReportsPlaceholder = () => (<div>Reports go here!</div>);
const SettingsPlaceholder = () => (<div>Settings go here!</div>);

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn ? (<Component {...props} {...rest}/>) : (<Redirect to="/login"/>)
  )}/>
);
