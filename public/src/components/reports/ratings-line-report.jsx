import React, { Component } from 'react';
import RatingsLineChart from './charts/ratings-line-chart.jsx';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import './report.css';
const debug = process.env.DEBUG || false;

const colors = [
  '#8CB369',
  '#f6ae2d',
  '#60afff',
  '#5B5F97',
  '#f26419'
];

const fieldMap = {
  physicalScore: {legend: 'Physical Score', axis: 'Rating'},
  emotionalScore: {legend: 'Emotional Score', axis: 'Rating'},
  sleepDuration: {legend: 'Sleep Duration', axis: 'Hours'},
  sleepQuality: {legend: 'Sleep Quality', axis: 'Rating'},
  exerciseDuration: {legend: 'Exercise Duration', axis: 'Minutes'},
  exerciseIntensity: {legend: 'Exercise Intensity', axis: 'Rating'},
  waterAmount: {legend: 'Water', axis: 'fl oz'},
};

export default class RatingsLineReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ]
    };
    this.entryType = this.props.type || 'combo';
    this.fields = this.props.fields;
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() { this.updateData(); }

  updateData() {
    axios.get('/api/entries', {
      params: {
        type: this.entryType || null
      },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      console.log(res.data);
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
    // Data processing using only underscore. Other libraries/packages might make this easier
    var datasets = [ ];
    _.each(this.fields, (field, index) => { // for each field passed in as a prop
      let label = fieldMap[field].legend; // give it a label based on the map of fields to labels
      datasets[index] = {label: label, data: [ ], backgroundColor: colors[index]}; // give it a color
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
      <div className="report-container">
        <div className="report-header">{this.props.title}</div>
        <div className="report-content">
          <RatingsLineChart data={this.state.data} id={`line-chart-${this.entryType.toLowerCase()}`}/>
        </div>
      </div>
    );
  }
}
