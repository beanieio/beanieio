import React, { Component } from 'react';
import axios from 'axios';
import BarChart from './charts/bar-chart.jsx';
import moment from 'moment';
import { aggregateCurrentWeek } from './report-helpers.js';
import './report.css';

const typeMap = { // map from entry type to its duration/amt field in db
  'Water': {field: 'waterAmount', label: 'oz'},
  'Exercise': {field: 'exerciseDuration', label: 'minutes'},
  'Sleep': {field: 'sleepDuration', label: 'hours'}
};

export default class BarReport extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.config = typeMap[this.props.type];
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() { this.updateData(); }

  updateData() { //TODO: update get/entries route to be time dependent, not amount dependent
    axios.get('/api/entries', {
      params: { limit: 50, type: this.props.type },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.filterData(res.data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastFormSubmitted !== nextProps.lastFormSubmitted &&
        this.props.type === nextProps.lastFormSubmitted.name) {
      this.updateData();
    }
  }

  filterData(entries) {
    let procEntries = aggregateCurrentWeek(entries, this.config.field);
    let data = {
      labels: procEntries.week,
      datasets: [{
        label: ' ' + this.config.label,
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
