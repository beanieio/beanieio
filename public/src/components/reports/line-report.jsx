import React, { Component } from 'react';
import LineChart from './charts/line-chart.jsx';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import './chart-report.css';
const debug = process.env.DEBUG || false;

const fieldMap = {
  physicalScore: 'Physical Rating',
  emotionalScore: 'Emotional Rating',
  sleepDuration: 'Hours of Sleep',
  exerciseDuration: 'Minutes of Exercise',
  waterAmount: 'Water Consumption',
};

export default class PieReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ]
    };
    this.entryType = this.props.type || 'combo';
    this.fields = this.props.fields;
  }

  componentDidMount() {
    axios.get('/api/entries', {
      params: {
        type: this.entryType || null
      },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.filterData(res.data);
    });
  }

  filterData(entries) {
    var datasets = [ ];
    _.each(this.fields, (field, index) => {
      let label = fieldMap[field];
      datasets[index] = {label: label, data: [ ]};
      _.each(entries, entry => {
        if (entry[field] !== null) { datasets[index].data.push({x: entry.datetime, y: entry[field]}); }
      });
    });

    if (debug) { console.log('Dataset created in report: ', datasets); }
    this.setState({data: datasets});
  }

  render() {
    return (
      <div className="pie-report">
        <div className="pie-report-container">
          <div className="pie-report-header">{this.props.title}</div>
          <div className="pie-report-content">
            <LineChart data={this.state.data} id={`line-chart-${this.entryType.toLowerCase()}`}/>
          </div>
        </div>
      </div>
    );
  }
}