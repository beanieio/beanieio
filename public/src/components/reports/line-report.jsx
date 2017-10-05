import React, { Component } from 'react';
import LineChart from './charts/line-chart.jsx';
import axios from 'axios';
import _ from 'lodash';
import './chart-report.css';
const debug = process.env.DEBUG || true;

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
    var chartData = {
      datasets: [ ],
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    };
    _.each(this.fields, (field, index) => {
      let label = fieldMap[field];
      chartData.datasets[index] = {label: label, data: [ ]};
      _.each(entries, entry => {
        if (entry[field] !== null) { chartData.datasets[index].data.push({x: entry.datetime, y: entry[field]}); }
      });
    });

    if (debug) { console.log(chartData); }
    this.setState({data: chartData});
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