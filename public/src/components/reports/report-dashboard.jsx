import React, { Component } from 'react';
import ComboLineReport from './combo-line-report.jsx';
import ComboPieReport from './combo-pie-report.jsx';
import { DropdownList } from 'react-widgets';
import axios from 'axios';
import classNames from 'classnames';
import './report-dashboard.css';
const debug = process.env.DEBUG || false;

export default class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feelings: [ ],
      feeling: null,
      data: { },
    };
    this.handleFeeling = this.handleFeeling.bind(this);
  }

  componentDidMount() {
    this.getUserConfig();
  }

  getUserConfig() {
    axios.get('/api/users/formconfig',
      {headers: {'Authorization': 'bearer ' + this.props.getAuth()}}
    ).then(resp => {
      const data = resp.data;
      console.log(data);
      let feelings = [ ];
      data.emotional.forEach(feeling => feelings.push({group: 'Emotional', field: 'emotionalTags', text: feeling}));
      data.physical.forEach(feeling => feelings.push({group: 'Physical', field: 'physicalTags', text: feeling}));
      this.setState({
        feelings: feelings
      });
    });
  }

  handleFeeling() {
    axios.get('/api/reports/correlation', {
      params: {
        feeling: this.state.feeling.text,
        type: this.state.feeling.group,
      },
      headers: {'Authorization': 'bearer ' + this.props.getAuth()}
    }).then(res => {
      this.setState({data: res.data});
      if (debug) { console.log(res.data); }
    });
  }


  render() {
    return (
      <div className="dashboard-container">
        <div className="report-bar-wrapper">
          <div className="report-bar-label">Correlate observations with:</div>
          <div className="report-bar-dropdown">
            <DropdownList
              value={this.state.feeling} data={this.state.feelings}
              textField="text" groupBy="group"
              onChange={feeling => {
                this.setState({feeling}, this.handleFeeling);
              }} />
          </div>
        </div>
        <div className="dashboard-window">
          <div className="report-tile report-tile-wide shadow"><ComboLineReport data={this.state.data} title="Summary:" feeling={this.state.feeling ? this.state.feeling.text : ''}/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.mealMatches} type="Meal" title="Ingredients:"/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.pulseMatches} type="PulseEmo" title="Emotional tags:"/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.pulseMatches} type="PulsePhys" title="Tags:"/></div>
        </div>
      </div>
    );
  }
}
