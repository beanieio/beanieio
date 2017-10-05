import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
const debug = process.env.DEBUG || false;

export default class LineChart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = new Chart(this.props.id, {
      type: 'scatter',
      data: this.props.data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true
        },
      }
    });
  }

  componentWillReceiveProps (props) {
    if (debug) { console.log('Will rec: ', props.data); }
    this.chart.data = props.data;
    this.chart.update();
  }

  render() {
    if (debug) {
      console.log('Pie chart is rendering.');
      console.log(Chart.defaults.global.layout);
    }
    return <canvas id={this.props.id}></canvas>;
  }
}