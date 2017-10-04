import React, { Component } from 'react';
import PieReport from './pie-report.jsx';
import axios from 'axios';
import _ from 'lodash';
const debug = process.env.DEBUG || true;
// componentDidMount() {
//   axios.get('/api/entries', {
//     params: {
//       type: this.props.entryType || 'Meal'
//     },
//     headers: {'Authorization': 'bearer ' + this.props.auth()}
//   }).then(res => {
//     this.setState({entries: res.data});
//   });
// }

export default class MealReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-03T17:31:04.373Z', type: 'Pulse', physicalScore: 4, emotionalScore: 2, emotionalTags: [ 'Energized', 'Relaxed' ], physicalTags: [ 'Great All Around', 'Sick' ], ingredients: [ ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-03T17:40:10.042Z', type: 'Sleep', sleepDuration: 6, sleepQuality: 4, emotionalTags: [ ], physicalTags: [ ], ingredients: [ ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-03T17:41:45.079Z', type: 'Exercise', exerciseDuration: 30, exerciseIntensity: 3, emotionalTags: [ ], physicalTags: [ ], ingredients: [ ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-03T17:46:33.186Z', type: 'Meal', emotionalTags: [ ], physicalTags: [ ], ingredients: [ 'wheat', 'dairy', 'egg' ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-03T17:46:44.786Z', type: 'Water', waterAmount: 12, emotionalTags: [ ], physicalTags: [ ], ingredients: [ ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-04T16:35:23.329Z', type: 'Sleep', sleepDuration: 6, sleepQuality: 4, emotionalTags: [ ], physicalTags: [ ], ingredients: [ ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-04T16:35:33.626Z', type: 'Exercise', exerciseDuration: 15, exerciseIntensity: 3, emotionalTags: [ ], physicalTags: [ ], ingredients: [ ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-04T16:35:41.974Z', type: 'Meal', emotionalTags: [ ], physicalTags: [ ], ingredients: [ 'dairy' ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-04T22:08:41.225Z', type: 'Meal', emotionalTags: [ ], physicalTags: [ ], ingredients: [ 'wheat', 'gluten', 'dairy', 'egg' ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-04T22:08:49.175Z', type: 'Meal', emotionalTags: [ ], physicalTags: [ ], ingredients: [ 'gluten', 'soy', 'wheat', 'shellfish' ]},
        {userId: '59d3c9561e277887d042a494', datetime: '2017-10-04T22:08:57.598Z', type: 'Meal', emotionalTags: [ ], physicalTags: [ ], ingredients: [ 'soy', 'gluten', 'tree nuts', 'shellfish', 'wheat' ]}
      ]
    };
  }

  render() {
    var tags = _.filter(this.state.entries, (entry) => {
      return entry['ingredients'].length !== 0;
    });

    tags = _.flatMap(tags, (entry) => {
      return entry['ingredients'];
    });

    tags = _.reduce(tags, (allTags, tag) => {
      if (tag in allTags) {
        allTags[tag]++;
      } else {
        allTags[tag] = 1;
      }
      return allTags;
    }, {});

    tags = _.toPairs(tags);

    tags = _.sortBy(tags, (i) => -i[1]);

    var labels = _.map(tags, (i) => i[0]).slice(0, 5);
    var values = _.map(tags, (i) => i[1]).slice(0, 5);

    // if (debug) { console.log(tags, labels, values); }

    var data = {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: [
          '#46AAC2',
          '#FFCC57',
          '#FF6B57',
          '#6CC3D7',
          '#FFD77C'
        ]
      }],
    };

    if (debug) { console.log(data); }

    return (
      <PieReport type="Meal" data={data} />
      // <p>Pie Report Here</p>
    );
  }
}