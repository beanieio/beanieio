import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
const debug = process.env.DEBUG || false;
Chart.defaults.global.defaultFontSize = 12;

export default class BarChart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = new Chart(this.props.id, {
      type: 'bar',
      data: this.props.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
            }
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            type: 'time',
            time: {
              min: moment().startOf('week').subtract(12, 'hours'),
              max: moment().endOf('week'),
              unit: 'day',
              unitStepSize: 1,
              tooltipFormat: 'dddd',
              displayFormats: {
                day: 'dd',
              },
            },
            position: 'bottom'
          }]
        }
      }
    });
  }

  componentWillReceiveProps (props) {
    if (debug) { console.log('Bar chart will rec: ', props.data); }
    this.chart.data = props.data;
    this.chart.update();
  }

  render() {
    if (debug) { console.log('Bar chart is rendering.'); }
    return <canvas id={this.props.id}></canvas>;
  }
}
