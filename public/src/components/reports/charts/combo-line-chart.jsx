import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
const debug = process.env.DEBUG || false;

export default class ComboLineChart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = new Chart(this.props.id, {
      type: 'line',
      data: {
        datasets: this.props.data,
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
              display: true,
              labelString: 'Sleep (hours)',
            },
            ticks: {
              beginAtZero: true,
            },
          }, {
            id: 'minutes-y-axis',
            type: 'linear',
            position: 'left',
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Exercise (minutes)',
            },
            ticks: {
              beginAtZero: true,
            }
          }, {
            id: 'fl-oz-y-axis',
            type: 'linear',
            position: 'right',
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Water Consumed (fl oz)',
            },
            ticks: {
              beginAtZero: true,
            },
          }, {
            id: 'ratings-y-axis',
            type: 'linear',
            position: 'right',
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Emotional/Physical Rating',
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              max: 5,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            type: 'time',
            time: {
              unit: 'day',
              unitStepSize: 1,
              tooltipFormat: 'ddd',
              displayFormats: {
                day: 'ddd',
              },
            },
            position: 'bottom'
          }]
        }
      }
    });
  }

  componentWillReceiveProps (props) {
    if (debug) { console.log('Data received by combo-line-chart ', props.data); }
    this.chart.data.datasets = props.data;
    this.chart.update();
  }

  render() {
    if (debug) { console.log('Line chart is rendering.'); }
    return <canvas id={this.props.id}></canvas>;
  }
}