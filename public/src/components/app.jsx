import React from 'react';

const App = () => (
  <div className="app-wrapper">
    <div className="app-header">
      <div className="app-header-title"><span>HealthMe</span></div>
    </div>
    <div className="app-full-window">
      <div className="app-sidebar">
        <div className="sidebar-entry sidebar-active"><span>Dashboard</span></div>
        <div className="sidebar-entry"><span>Reports</span></div>
        <div className="sidebar-entry"><span>Settings</span></div>
        <div className="sidebar-entry"><span>Logout</span></div>
      </div>
      <div className="app-main-window">
        <div className="form-bar-wrapper">
          <div className="form-bar-button"><span>Feeling</span></div>
          <div className="form-bar-button"><span>Meal</span></div>
          <div className="form-bar-button"><span>Exercise</span></div>
          <div className="form-bar-button"><span>Sleep</span></div>
          <div className="form-bar-button"><span>Water</span></div>
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
      <div className="app-footer-content"><span>©2017 BeanieIO</span></div>
    </div>
  </div>
);










export default App;
