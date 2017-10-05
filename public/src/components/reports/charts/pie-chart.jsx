import React, { Component } from 'react';
import Chart from 'chart.js';
import PieceLabel from 'chart.piecelabel.js';
const debug = process.env.DEBUG || true;

export default class PieChart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = new Chart(this.props.id, {
      type: 'pie',
      data: this.props.data,
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false
        },
        pieceLabel: {
          render: 'label',
          showZero: false,
          fontColor: 'white',
          fontSize: 12,
          fontStyle: 'italic',
          position: 'border',
        }
      }
    });
  }

  componentWillReceiveProps (props) {
    console.log('Will rec: ', props.data);
    this.chart.data = props.data;
    this.chart.update();
  }

  render() {
    if (debug) { console.log('Pie chart is rendering.'); }
    return <canvas id={this.props.id}></canvas>;
  }
}