import React, { Component } from 'react';
import axios from 'axios';
import BarChart from './charts/bar-chart.jsx';
import moment from 'moment';
import { aggregateCurrentWeek } from './report-helpers.js';
import './report.css';

typeMap = { // map from entry type to its duration/amt field in db
  'Water': 'waterAmount',
  'Exercise': 'exerciseDuration',
  'Sleep': 'sleepDuration',
};

export default class BarReport extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.field = typeMap[this.props.type];
  }

  //TODO: update get/entries route to be time dependent, not amount dependent
  componentDidMount() {
    axios.get('/api/entries', {
      params: { limit: 50, type: this.props.type },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.filterData(res.data);
    });
  }

  filterData(entries) {
    let procEntries = aggregateCurrentWeek(entries, this.field);
    let data = {
      labels: procEntries.week,
      datasets: [{
        label: ' oz of water',
        data: procEntries.totals,
        backgroundColor: [
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)'
        ],
        borderColor: [
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)'
        ],
        borderWidth: 1
      }]
    };
    this.setState({data: data});
  }

  render() {
    return (
      <div className="report-container">
        <div className="report-header">{this.props.title}</div>
        <div className="report-content">
          <BarChart data={this.state.data} id={`${this.props.ind}-${this.props.type}`}/>
        </div>
      </div>
    );
  }
}
