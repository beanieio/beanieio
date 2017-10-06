import React, { Component } from 'react';
import LineChart from './charts/line-chart.jsx';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import './chart-report.css';
const debug = process.env.DEBUG || true;

export default class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: [ ],
      pulseMatches: [ ],
      mealMatches: [ ],
    };
  }

  componentDidMount() {

    // let resData = {
    //     raw: {Meal: [], Water: [], Exercise: [], Sleep: [], Pulse: []}, // this is separated raw data for past 2 weeks
    //     pulseMatches: [], // these are the pulses in past month with that feeling
    //     mealMatches: [], // these are the meals in the 12 hours preceeding any pulse that matched a feeling
    //   };

    // example call:
    // axios.get(‘/api/reports/correlation’, {
    //       params: {feeling: ‘Tired’, type: ‘physicalTags’},
    //       headers: {‘Authorization’: ‘bearer ’ + this.props.getAuth()}
    //     }).then(resp => console.log(resp));

    axios.get('/api/correlation', {
      params: {
        feeling: this.props.feeling || 'Tired',
        type: 'physicalTags',
      },
      headers: {'Authorization': 'bearer ' + this.props.getAuth()}
    }).then(res => {
      this.handleData(res.data);
    });
  }
}

