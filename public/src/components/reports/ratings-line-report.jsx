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
  sleepQuality: {legend: 'Sleep Quality', axis: 'Rating'},
  exerciseIntensity: {legend: 'Exercise Intensity', axis: 'Rating'},
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
        limit: 100,
        type: this.entryType || null
      },
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
    if (debug) { console.log(entries); }
    var datasets = [ ];
    _.each(this.fields, (field, i) => {
      datasets.push({label: fieldMap[field].legend, data: [ ], fill: false, borderColor: colors[i]});
      var data = { };
      _.each(entries, (entry, j) => {
        let day = moment(entries[j].datetime).startOf('day');
        if (day in data) {
          data[day].sum += entries[j][field];
          data[day].count++;
        } else {
          data[day] = { };
          data[day].sum = entries[j][field];
          data[day].count = 1;
        }
      });

      _.forIn(data, (value, key) => {
        datasets[i].data.push({x: new Date(key), y: value.sum / value.count});
      });
    });


    if (debug) { console.log('Data created in report: ', datasets); }
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
