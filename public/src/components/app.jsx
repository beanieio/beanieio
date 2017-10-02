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
      loggedIn: true,
      token: '',
      activeNav: 'dashboard',
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getAuth = this.getAuth.bind(this);
  }

  getAuth() {
    return `bearer ${this.state.token}`;
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

  render() {
    return (
      <div className="app-wrapper">
        <div className="app-header">
          <div className="app-header-title"><span>HealthMe</span></div>
        </div>
        <div className="app-full-window">
          <Switch>
            <Route path="/login" render={props => (this.state.loggedIn) ? (<Redirect to="/dashboard" />) : (<Login onLogin={this.onLogin} {...props} />)} />
            <Route path="/signup" render={props => (this.state.loggedIn) ? (<Redirect to="/dashboard" />) : (<Signup onLogin={this.onLogin} {...props} />)} />
            <Route path="/:nav?" component={Sidenav}/>
          </Switch>
          <div className="app-main-window">
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} loggedIn={this.state.loggedIn} getAuth={this.getAuth} />
              <PrivateRoute path="/reports" component={ReportsPlaceholder} loggedIn={this.state.loggedIn} getAuth={this.getAuth} />
              <PrivateRoute path="/settings" component={SettingsPlaceholder} loggedIn={this.state.loggedIn} getAuth={this.getAuth} />
              <Route exact path="/" render={props => <Redirect to="/dashboard" />} />
            </Switch>
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
