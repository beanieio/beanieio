import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './dashboard.jsx';
import Sidenav from './sidenav.jsx';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router>
        <div className="app-wrapper">
          <div className="app-header">
            <div className="app-header-title"><span>HealthMe</span></div>
          </div>
          <div className="app-full-window">
            <Sidenav activeNav={'dashboard'} />
            <div className="app-main-window">
              <Dashboard />
            </div>
          </div>
          <div className="app-footer">
            <div className="app-footer-content"><span>©2017 BeanieIo</span></div>
          </div>
        </div>
      </Router>
    );
  }
}
