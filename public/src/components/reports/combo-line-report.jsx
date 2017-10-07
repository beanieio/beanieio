import React, { Component } from 'react';
import ComboLineChart from './charts/combo-line-chart.jsx';
import _ from 'lodash';
import moment from 'moment';
import './report.css';
const debug = process.env.DEBUG || false;


export default class ComboLineReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { },
      feeling: '',
    };

  }

  componentWillReceiveProps (props) {
    if (debug) { console.log('Raw Data received by combo-line-report: ', props.data); }
    this.handleData(props.data, props.feeling);
  }

  handleData(data, feeling) {
    console.log(data.raw);
    const rawData = data.raw;
    const fields = {
      Sleep: {field: 'sleepDuration', label: 'Sleep Duration', yAxisID: 'hours-y-axis', borderColor: '#8CB369', data: [ ]},
      Water: {field: 'waterAmount', label: 'Exercise Duration', yAxisID: 'minutes-y-axis', borderColor: '#f6ae2d', data: [ ]},
      Exercise: {field: 'exerciseDuration', label: 'Water', yAxisID: 'fl-oz-y-axis', borderColor: '#60afff', data: [ ]},
    };
    var datasets = [ ];

    _.forIn(rawData, (value, key) => {
      if (key in fields) {
        let field = fields[key].field;
        let entries = rawData[key];
        let data = { };
        _.each(entries, entry => {
          let day = moment(entry.datetime).startOf('day');
          if (day in data) {
            data[day].sum += entry[field];
            data[day].count++;
          } else {
            data[day] = { };
            data[day].sum = entry[field];
            data[day].count = 1;
          }
        });
        let points = [ ];
        _.forIn(data, (value, key) => {
          points.push({x: new Date(key), y: value.sum / value.count});
        });
        points = _.sortBy(points, point => point.x);
        datasets.push({label: fields[key].label, yAxisID: fields[key].yAxisID, borderColor: fields[key].borderColor, fill: false, data: points});
      }
    });

    const matchData = data.pulseMatches;
    let points = [ ];
    _.forIn(matchData, entry => {
      points.push({x: new Date(entry.datetime), y: entry.physicalScore});
      points.push({x: new Date(entry.datetime), y: entry.emotionalScore});
    });

    let matchDataset = {
      label: feeling,
      borderColor: 'red',
      pointBorderColor: 'red',
      showLine: false,
      fill: false,
      data: points,
      yAxisID: 'ratings-y-axis'};
    datasets.push(matchDataset);


    if (debug) { console.log('matchDataset created in report: ', points); }

    this.setState({data: datasets, feeling: feeling});
  }


  render() {
    return (
      <div className="report-container">
        <div className="report-header">{this.props.title}</div>
        <div className="report-content">
          <ComboLineChart data={this.state.data} id='combo-report'/>
        </div>
      </div>
    );
  }
}