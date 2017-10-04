import React, { Component } from 'react';
import axios from 'axios';
import EntryItem from './entry-item.jsx';
import '../../../styles/entry-styles.css';

export default class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        // { "_id" : ("59d3c9671e277887d042a495"), "userId" : ("59d3c9561e277887d042a494"), "datetime" : ("2017-10-03T17:31:04.373Z"), "type" : "Pulse", "physicalScore" : 4, "emotionalScore" : 2, "emotionalTags" : [ "Energized", "Relaxed" ], "physicalTags" : [ "Great All Around", "Sick" ], "ingredients" : [ ], "__v" : 0 },
        // { "_id" : ("59d3cb8058e33a88d957cb21"), "userId" : ("59d3c9561e277887d042a494"), "datetime" : ("2017-10-03T17:40:10.042Z"), "type" : "Sleep", "sleepDuration" : 6, "sleepQuality" : 4, "emotionalTags" : [ ], "physicalTags" : [ ], "ingredients" : [ ], "__v" : 0 },
        // { "_id" : ("59d3cbeb9e949e88f795db87"), "userId" : ("59d3c9561e277887d042a494"), "datetime" : ("2017-10-03T17:41:45.079Z"), "type" : "Exercise", "exerciseDuration" : 30, "exerciseIntensity" : 3, "emotionalTags" : [ ], "physicalTags" : [ ], "ingredients" : [ ], "__v" : 0 },
        // { "_id" : ("59d3ccff9e949e88f795db88"), "userId" : ("59d3c9561e277887d042a494"), "datetime" : ("2017-10-03T17:46:33.186Z"), "type" : "Meal", "emotionalTags" : [ ], "physicalTags" : [ ], "ingredients" : [ "wheat", "dairy", "egg" ], "__v" : 0 },
        // { "_id" : ("59d3cd099e949e88f795db89"), "userId" : ("59d3c9561e277887d042a494"), "datetime" : ("2017-10-03T17:46:44.786Z"), "type" : "Water", "waterAmount" : 12, "emotionalTags" : [ ], "physicalTags" : [ ], "ingredients" : [ ], "__v" : 0 }
      ]
    };
  }

  componentDidMount() {
    axios.get('/api/entries', {
      params: {limit: 5},
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(res => {
      this.setState({entries: res.data});
    });
  }

  render() {

    return (
      <div className="entry-list-container">
        <div className="entry-list-header">
          <span className="entry-list-title">Recent entries:</span>
        </div>
        <div className="entry-list">
          {this.state.entries && this.state.entries.map((entry, i) => <EntryItem entry={entry} key={`f${i}`}/>)}
        </div>
      </div>
    );
  }
}