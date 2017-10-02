import React, { Component } from 'react';
import '../../styles/app-styles.css';
import PulseCheck from './forms/pulse-check.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="app-wrapper">
        <div className="app-header">
          <div className="app-header-title"><span>HealthMe</span></div>
        </div>
        <div className="app-full-window">
          <div className="app-sidebar">
            <div className="sidebar-entry"><i className="mdi mdi-home-circle"></i></div>
            <div className="sidebar-entry sidebar-active"><i className="mdi mdi-chart-line"></i></div>
            <div className="sidebar-entry"><i className="mdi mdi-settings"></i></div>
            <div className="sidebar-entry"><i className="mdi mdi-logout"></i></div>
          </div>
          <div className="app-main-window">
            <div className="form-bar-wrapper">
              <div className="form-bar-button">
                <i className="mdi mdi-food"></i>
              </div>
              <div className="form-bar-button">
                <i className="mdi mdi-bike"></i>
              </div>
              <div className="form-bar-button">
                <i className="mdi mdi-heart-pulse"></i>
                <div className="entry-form-mount">
                  <PulseCheck />
                </div>
              </div>
              <div className="form-bar-button">
                <i className="mdi mdi-hotel"></i>
              </div>
              <div className="form-bar-button">
                <i className="mdi mdi-water"></i>
              </div>
            </div>
            <div className="dashboard-window">
              <div className="report-tile shadow">Report goes here</div>
              <div className="report-tile report-tile-wide shadow">Report goes here</div>
              <div className="report-tile report-tile-wide shadow">Report goes here</div>
              <div className="report-tile report-tile-wide shadow">Report goes here</div>
              <div className="report-tile report-tile-wide shadow">Report goes here</div>
            </div>
          </div>
        </div>
        <div className="app-footer">
          <div className="app-footer-content"><span>©2017 BeanieIo</span></div>
        </div>
      </div>
    );
  }
}
