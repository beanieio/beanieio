import React, { Component } from 'react';
import axios from 'axios';
import EntryItem from './entry-item.jsx';
import './entry-styles.css';

export default class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
  }

  componentDidMount() {
    axios.get('/api/entries', {
      params: {limit: 5},
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.setState({entries: res.data});
    });
  }

  render() {
    return (
      <div className="entry-list-container">
        <div className="entry-list-header">
          <span className="entry-list-title">Recent entries:</span>
        </div>
        <div className="entry-list">
          {this.state.entries && this.state.entries.map((entry, i) => <EntryItem entry={entry} key={`f${i}`}/>)}
        </div>
      </div>
    );
  }
}
