import React, { Component } from 'react';
import PulseCheck from './forms/pulse-check.jsx';
import './dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-container">
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
    );
  }
}
