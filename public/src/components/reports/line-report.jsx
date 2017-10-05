import React, { Component } from 'react';
import LineChart from './charts/line-chart.jsx';
import axios from 'axios';
import _ from 'lodash';
import './chart-report.css';
const debug = process.env.DEBUG || true;

export default class PieReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ]
    };
    this.entryType = this.props.type || 'combo';
    this.fields = this.props.fields;
  }

  componentDidMount() {
    axios.get('/api/entries', {
      params: {
        type: this.entryType || null
      },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.filterData(res.data);
    });
  }

  filterData(entries) {
    //handle data...
    if (debug) { console.log(tags, labels, values); }
    if (debug) { console.log(data); }
    this.setState({data: data});
  }

  render() {
    return (
      <div className="pie-report">
        <div className="pie-report-container">
          <div className="pie-report-header">{this.props.title}</div>
          <div className="pie-report-content">
            <LineChart data={this.state.data} id={`line-chart-${this.entryType.toLowerCase()}`}/>
          </div>
        </div>
      </div>
    );
  }
}