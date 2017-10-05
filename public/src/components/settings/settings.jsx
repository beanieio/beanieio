import React, { Component } from 'react';
import ConfigSet from './config-set.jsx';
import './settings.css';

const Settings = (props) => (
  <div className="settings-container">
    <div className="settings-header"><span>Settings</span></div>
    <div className="settings-window">
      <ConfigSet type={'Meal Ingredients'} auth={props.getAuth} />
      <ConfigSet type={'Emotional Tags'} auth={props.getAuth} />
      <ConfigSet type={'Physical Tags'} auth={props.getAuth} />
    </div>
  </div>
);

export default Settings;
