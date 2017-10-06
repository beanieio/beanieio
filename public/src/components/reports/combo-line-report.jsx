import React, { Component } from 'react';
import LineChart from './charts/line-chart.jsx';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import './chart-report.css';
const debug = process.env.DEBUG || true;

const colors = [
  '#8CB369',
  '#f6ae2d',
  '#60afff',
  '#5B5F97',
  '#f26419'
];

const fieldMap = {
  sleepDuration: {legend: 'Sleep Duration', axis: 'Hours', yAxisId: 'left-y-axis'},
  exerciseDuration: {legend: 'Exercise Duration', axis: 'Minutes', yAxisId: 'left-y-axis'},
  waterAmount: {legend: 'Water', axis: 'fl oz', yAxisId: 'right-y-axis'},
};

export default class ComboLineReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ]
    };
    this.feeling = this.props.feeling || null;
    this.fields = this.props.fields || _.keys(fieldMap);
    this.id = `'combo-'${this.fields.join('-')}`.toLowerCase;
  }

  componentDidMount() {
    axios.get('/api/entries', {
      params: {
        feeling: this.props.feeling || null
      },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.filterData(res.data);
    });
  }

  filterData(entries) {
    // Data processing using only underscore. Other libraries/packages might make this easier
    var datasets = [ ];
    _.each(this.fields, (field, index) => { // for each field passed in as a prop
      let label = fieldMap[field].legend; // give it a label based on the map of fields to labels
      // initialize the data structure
      datasets[index] = {label: label, data: [ ], backgroundColor: colors[index], yAxisId: fieldMap[field].yAxisId};
      let day = moment(entries[0].datetime).day(); // setup to do daily averages
      let date = moment(entries[0].datetime).startOf('day');
      let j = 0;
      let daySum = 0;
      let count = 0;
      while (j < entries.length) {
        if (moment(entries[j].datetime).day() === day) { // accumulate values while on the same day
          daySum += entries[j][field];
          count++;
          j++;
        } else {
          if (daySum !== 0) { datasets[index].data.push({x: date, y: daySum / count}); } //push to dataset and reset accumulators
          daySum = entries[j][field];
          day = moment(entries[j].datetime).day();
          date = moment(entries[j].datetime).startOf('day');
          count = 0;
          j++;
        }
      }
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
            <LineChart data={this.state.data} id={`line-chart-${this.id}`}/>
          </div>
        </div>
      </div>
    );
  }
}