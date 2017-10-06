import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
const debug = process.env.DEBUG || false;

export default class RatingsLineChart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = new Chart(this.props.id, this.props.data);
  }

  componentWillReceiveProps (props) {
    if (debug) { console.log('Will rec: ', props.data); }
    this.chart.data.datasets = props.data;
    this.chart.update();
  }

  render() {
    if (debug) { console.log('Line chart is rendering.'); }
    return <canvas id={this.props.id}></canvas>;
  }
}