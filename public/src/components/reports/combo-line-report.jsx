import React, { Component } from 'react';
import LineChart from './charts/line-chart.jsx';
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

const fields = {
  Sleep: {legend: 'Sleep Duration', axis: 'Hours', yAxisId: 'hours-y-axis'},
  Water: {legend: 'Exercise Duration', axis: 'Minutes', yAxisId: 'minutes-y-axis'},
  Exercise: {legend: 'Water', axis: 'fl oz', yAxisId: 'fl-oz-y-axis'},
};

export default class ComboLineReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { },
    };

  }

  componentWillReceiveProps (props) {
    this.handleData(this.props.data);
  }

  handleData(resData) {
    var datasets = [ ];


    if (debug) { console.log('Dataset created in report: ', datasets); }

    var chartData = {
      type: 'line',
      data: {
        datasets: datasets,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            id: 'hours-y-axis',
            type: 'linear',
            position: 'left',
            gridLines: {
              display: false,
            },
            scaleLabel: {
              labelString: 'Sleep (hours)',
            },
          }, {
            id: 'minutes-y-axis',
            type: 'linear',
            position: 'left',
            gridLines: {
              display: false,
            },
            scaleLabel: {
              labelString: 'Exercise (minutes)',
            },
          }, {
            id: 'fl-oz-y-axis',
            type: 'linear',
            position: 'right',
            gridLines: {
              display: false,
            },
            scaleLabel: {
              labelString: 'Water Consumed (fl oz)',
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            type: 'time',
            time: {
              min: moment().startOf('week'),
              max: moment().endOf('week'),
              unit: 'day',
              unitStepSize: 1,
              toolTipFormat: 'ddd',
              displayFormats: {
                day: 'ddd',
              },
            },
            position: 'bottom'
          }]
        }
      }
    };
    this.setState({data: chartData});
  }


  render() {
    return (
      <div className="pie-report">
        <div className="pie-report-container">
          <div className="pie-report-header">{this.props.title}</div>
          <div className="pie-report-content">
            <ComboLineChart data={this.state.data} id='combo-report'/>
          </div>
        </div>
      </div>
    );
  }
}