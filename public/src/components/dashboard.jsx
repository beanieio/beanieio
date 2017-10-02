import React, { Component } from 'react';
import Meal from './forms/meal.jsx';
import Exercise from './forms/exercise.jsx';
import PulseCheck from './forms/pulse-check.jsx';
import Sleep from './forms/sleep.jsx';
import Water from './forms/water.jsx';
import classNames from 'classnames';
import './dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openForm: '',
    };

    this.closeForm = this.closeForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm(form) {
    this.setState({openForm: this.state.openForm === form ? '' : form});
  }

  closeForm() {
    this.setState({openForm: ''});
  }

  renderForm(FormComponent, formName, mount) {
    if (this.state.openForm === formName) {
      const mountClass = classNames('entry-form-mount', {'entry-form-left': mount === 'left', 'entry-form-right': mount === 'right'});
      return (
        <div className={mountClass}>
          <FormComponent auth={this.props.getAuth} handleCancel={this.closeForm} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="form-bar-wrapper">
          <div onClick={() => this.toggleForm('meal')} className="form-bar-button">
            <i className="mdi mdi-food"></i>
            {this.renderForm(Meal, 'meal', 'left')}
          </div>
          <div onClick={() => this.toggleForm('exercise')} className="form-bar-button">
            <i className="mdi mdi-bike"></i>
            {this.renderForm(Exercise, 'exercise', 'left')}
          </div>
          <div onClick={() => this.toggleForm('pulse')} className="form-bar-button form-bar-button-wide">
            <i className="mdi mdi-heart-pulse"></i>
            {this.renderForm(PulseCheck, 'pulse')}
          </div>
          <div onClick={() => this.toggleForm('sleep')} className="form-bar-button">
            <i className="mdi mdi-hotel"></i>
            {this.renderForm(Sleep, 'sleep', 'right')}
          </div>
          <div onClick={() => this.toggleForm('water')} className="form-bar-button">
            <i className="mdi mdi-water"></i>
            {this.renderForm(Water, 'water', 'right')}
          </div>
        </div>
        <div className="dashboard-window">
          <div className="report-tile shadow">Report goes here</div>
          <div className="report-tile report-tile-wide shadow">Report goes here</div>
          <div className="report-tile report-tile-wide shadow">Report goes here</div>
          <div className="report-tile report-tile-wide shadow">Report goes here</div>
          <div className="report-tile report-tile-wide shadow">Report goes here</div>
        </div>
      </div>
    );
  }
}
