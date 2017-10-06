import React, { Component } from 'react';
import PieChart from './charts/pie-chart.jsx';
import _ from 'lodash';
import './chart-report.css';
const debug = process.env.DEBUG || true;

const typeMap = {
  Meal: {type: 'Meal', field: 'ingredients'},
  PulseEmo: {type: 'Pulse', field: 'emotionalTags'},
  PulsePhys: {type: 'Pulse', field: 'physicalTags'},
};

export default class ComboPieReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { },
    };

    this.entryType = typeMap[this.props.type].type;
    this.field = typeMap[this.props.type].field;
  }

  componentWillReceiveProps(props) {
    if (debug) { console.log('Combo pie report received props: ', props.data); }
    this.filterData(props.data);
  }

  filterData(entries) {
    var tags = _.flatMap(entries, (entry) => {
      return entry[this.field];
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
    var data = {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: [
          '#8CB369',
          '#5B5F97',
          '#60afff',
          '#f6ae2d',
          '#f26419'
        ]
      }],
    };
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
            <PieChart data={this.state.data} id={`combo-pie-chart-${this.type.toLowerCase()}`}/>
          </div>
        </div>
      </div>
    );
  }
}