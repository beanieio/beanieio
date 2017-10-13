// libraries
import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

// components
import Sidenav from './sidenav.jsx';
import Dashboard from './dashboard.jsx';
import ReportDashboard from './reports/report-dashboard.jsx';
import Journal from './journal/journal.jsx';
import Settings from './settings/settings.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';

// styles
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    // check for an existing token
    // TODO: think about store this in encrypted https cookies instead for security
    const jwt = window.localStorage.getItem('healthme_jwt_token') || '';
    const loggedIn = !!jwt;
    this.state = {
      loggedIn: loggedIn,
      token: jwt,
      activeNav: 'dashboard',
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getAuth = this.getAuth.bind(this);
  }

  getAuth() { // enables child components to gain access to the auth token for their api calls
    return this.state.token;
  }

  onLogin(token) {
    this.setState({loggedIn: true, token: token});
    window.localStorage.setItem('healthme_jwt_token', token);
  }

  onLogout(e) {
    e && e.preventDefault();
    this.setState({loggedIn: false, token: ''});
    window.localStorage.removeItem('healthme_jwt_token');
  }

  renderNav() {
    if (this.state.loggedIn) {
      return (
        <Route path="/:nav?" render={props => <Sidenav {...props} onLogout={this.onLogout} />} />
      );
    }
  }

  // handling authentication based routing in react-router-4 can be a bit unintuitive
  // so we're handling here with conditional rendering based on state instead
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
          <Route path="/reports" render={props => <ReportDashboard getAuth={this.getAuth} /> } />
          <Route path="/journal" render={props => <Journal getAuth={this.getAuth} /> } />
          <Route path="/settings" render={props => <Settings getAuth={this.getAuth} /> } />
          <Redirect to="/dashboard" />
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
