import React from 'react';

const App = () => (
  <div className="app-wrapper flex-col">
    <div className="app-header flex flex-start flex-align-center">
      <div className="app-header-title"><span>HealthMe</span></div>
    </div>
    <div className="app-full-window flex">
      <div className="app-sidebar flex-col flex-start">
        <div className="sidebar-entry flex flex-align-center sidebar-active"><span>Dashboard</span></div>
        <div className="sidebar-entry flex flex-align-center"><span>Reports</span></div>
        <div className="sidebar-entry flex flex-align-center"><span>Settings</span></div>
        <div className="sidebar-entry flex flex-align-center"><span>Logout</span></div>
      </div>
      <div className="app-main-window flex-1">
        <div className="form-bar-wrapper flex space-around flex-align-center">
          <div className="form-bar-button flex flex-align-center"><span>Feeling</span></div>
          <div className="form-bar-button flex flex-align-center"><span>Meal</span></div>
          <div className="form-bar-button flex flex-align-center"><span>Exercise</span></div>
          <div className="form-bar-button flex flex-align-center"><span>Sleep</span></div>
          <div className="form-bar-button flex flex-align-center"><span>Water</span></div>
        </div>
        <div className="dashboard-window flex">
          <div className="report-tile shadow">Report goes here</div>
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
