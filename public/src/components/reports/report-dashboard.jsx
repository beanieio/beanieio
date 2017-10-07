import React, { Component } from 'react';
import ComboLineReport from './combo-line-report.jsx';
import ComboPieReport from './combo-pie-report.jsx';
import ChooseFeelingForm from '../forms/choose-feeling-form.jsx';
import axios from 'axios';
import classNames from 'classnames';
import '../dashboard.css';
const debug = process.env.DEBUG || false;

export default class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: '',
      pulseConfig: {},
      feeling: 'select a feeling',
      tagType: 'physicalTags',
      data: { },
    };
    this.closeForm = this.closeForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleFeeling = this.handleFeeling.bind(this);
  }

  componentDidMount() {

    axios.get('/api/users/formconfig',
      {headers: {'Authorization': 'bearer ' + this.props.getAuth()}}
    ).then(resp => {
      this.setState({
        ingredientConfig: resp.data.ingredients,
        pulseConfig: {emoConfig: resp.data.emotional, physConfig: resp.data.physical}
      });
    });

    axios.get('/api/reports/correlation', {
      params: {
        feeling: this.state.feeling,
        type: this.state.tagType,
      },
      headers: {'Authorization': 'bearer ' + this.props.getAuth()}
    }).then(res => {
      this.setState({data: res.data});
      if (debug) { console.log(res.data); }
    });
  }

  toggleForm(e, form) {
    e.stopPropagation();
    this.setState({openForm: this.state.openForm === form ? '' : form});
  }

  closeForm() {
    this.setState({openForm: ''});
  }

  handleFeeling(feeling, tagType) {
    axios.get('/api/reports/correlation', {
      params: {
        feeling: feeling,
        type: tagType,
      },
      headers: {'Authorization': 'bearer ' + this.props.getAuth()}
    }).then(res => {
      this.closeForm();
      this.setState({feeling: feeling, tagType: tagType, data: res.data});
      if (debug) { console.log(res.data); }
    });
  }

  renderForm(FormComponent, formName, mount) {
    if (this.state.openForm === formName) {
      const formConfigData = this.state.pulseConfig || null;
      const mountClass = classNames('entry-form-mount', {'entry-form-left': mount === 'left', 'entry-form-right': mount === 'right'});
      return (
        <div className={mountClass}>
          <FormComponent handleCancel={this.closeForm} formConfigData={formConfigData} handleSubmit={this.handleFeeling}/>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="dashboard-container" onClick={this.closeForm}>
        <div className="form-bar-wrapper">
          <div onClick={(e) => this.toggleForm(e, 'pulse')} className="form-bar-button">
            <span>Choose a physical or emotional tag:</span>
            {this.renderForm(ChooseFeelingForm, 'pulse')}
          </div>
        </div>
        <div className="dashboard-window">
          <div className="report-tile report-tile-wide shadow"><ComboLineReport data={this.state.data} title="Summary:" feeling={this.state.feeling}/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.mealMatches} type="Meal" title="Ingredients:"/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.pulseMatches} type="PulseEmo" title="Emotional tags:"/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.pulseMatches} type="PulsePhys" title="Tags:"/></div>
        </div>
      </div>
    );
  }
}