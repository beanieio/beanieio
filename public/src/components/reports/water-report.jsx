import React, { Component } from 'react';
import axios from 'axios';
import BarChart from './charts/bar-chart.jsx';
import moment from 'moment';


export default class WaterReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ]
    };
  }

  componentDidMount() {
    axios.get('/api/entries', {
      params: {
        limit: 50,
        type: 'Water'
      },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.filterData(res.data);
    });
  }

  filterData(entries) {
    let week = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0
    };
    let totals = [];
    for (let i = 0; i < entries.length; i++) {
      week[moment(entries[i].datetime).format('dddd')] += entries[i].waterAmount;
    }
    for (let j in week) {
      totals.push(week[j]);
    }
    let data = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [{
        label: 'oz of water',
        data: totals,
        backgroundColor: [
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)'
        ],
        borderColor: [
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)',
          'rgb(70,170,194)',
          'rgb(255,193,53)',
          'rgb(255,107,87)'
        ],
        borderWidth: 1
      }]
    };
    this.setState({data: data});
  }

  render() {
    return (
      <div>
        <BarChart data={this.state.data} id={'water'}/>
      </div>
    );
  }
}
