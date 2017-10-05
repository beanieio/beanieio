import React, { Component } from 'react';
import axios from 'axios';
import BarChart from './charts/bar-chart.jsx';


export default class SleepTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ]
    };
  }

  componentDidMount() {
    axios.get('/api/entries', {
      params: {
        limit: 7,
        type: 'Water'
      },
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.filterData(res.data);
    });
  }

  filterData(entries) {
    let newArr = [];
    for (let i = 0; i < entries.length; i++) {
      newArr.push(entries[i].waterAmount);
    }
    let data = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [{
        label: 'oz of water',
        data: newArr,
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
