import React, { Component } from 'react';
import './settings.css';

export default class ConfigSet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="config-container">
        <div class="config-header"><span>{this.props.type}</span></div>
      </div>
    );
  }
}
