import React, { Component } from 'react';
import Chart from 'chart.js';
import PieceLabel from 'chart.piecelabel.js';
const debug = process.env.DEBUG || false;

Chart.defaults.global.defaultFontSize = 12;

export default class PieChart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = new Chart(this.props.id, {
      type: 'pie',
      data: this.props.data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false
        },
        pieceLabel: {
          render: 'label',
          showZero: false,
          fontColor: 'white',
          fontStyle: 'italic',
          position: 'border',
        }
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