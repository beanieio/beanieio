import React, { Component } from 'react';
import axios from 'axios';
import ExerciseEntry from './exercise-entry';
import MealEntry from './meal-entry';
import WaterEntry from './water-entry';
import SleepEntry from './sleep-entry';
import PulseCheckEntry from './pulse-check-entry';

export default class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
  }

  // componentDidMount() {
  //   axios.get('/api/entries', {
  //     params: {limit: 5},
  //     headers: {'Authorization': 'bearer ' + this.props.auth()}
  //   }).then(res => {
  //     this.setState({entries: res.data});
  //   });
  // }

  render() {
    return (
      <div className="entry-list-container">
        <div className="entry-list-header">
          <span className="entry-list-title">Recent entries:</span>
        </div>
        <div className="entry-list">
          <WaterEntry />
          <MealEntry />
          <SleepEntry />
          <ExerciseEntry />
          <PulseCheckEntry />
        </div>
      </div>
    );
  }
}