// libraries
import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

// components
import Meal from './forms/meal.jsx';
import Exercise from './forms/exercise.jsx';
import PulseCheck from './forms/pulse-check.jsx';
import Sleep from './forms/sleep.jsx';
import Water from './forms/water.jsx';
import EntryList from './reports/entries/entry-list.jsx';
import PieReport from './reports/pie-report.jsx';
import BarReport from './reports/bar-report.jsx';
import RatingsLineReport from './reports/ratings-line-report.jsx';

// styles
import './dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: '',
      ingredientConfig: [],
      pulseConfig: {},
      lastFormSubmitted: null,
    };
    this.closeForm = this.closeForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.signalFormSubmitted = this.signalFormSubmitted.bind(this);
  }

  componentWillMount() {
    axios.get('/api/users/formconfig', // go get user-specific form configuration data
      {headers: {'Authorization': 'bearer ' + this.props.getAuth()}}
    ).then(resp => {
      this.setState({
        ingredientConfig: resp.data.ingredients,
        pulseConfig: {emoConfig: resp.data.emotional, physConfig: resp.data.physical}
      });
    });
  }

  toggleForm(e, form) {
    e.stopPropagation();
    this.setState({openForm: this.state.openForm === form ? '' : form});
  }

  closeForm() {
    if (this.state.openForm) {
      this.setState({openForm: ''});
    }
  }

  // this sends a one-time object (pseudo-event) to each of the reports with
  // the name of the recently submitted form so they can decide if they need to update themselves
  signalFormSubmitted(formName) {
    this.setState({lastFormSubmitted: {name: formName}});
  }

  // render form handles the display or hiding of a new entry form
  // form is mounted using an absolutely (fixed in mobile) positioned div
  // a form is open or not based on if the openForm string state matches the forms name
  renderForm(FormComponent, formName, mount) {
    if (this.state.openForm === formName) {
      const formConfigData = formName === 'meal' ? this.state.ingredientConfig : formName === 'pulse' ? this.state.pulseConfig : null;
      const mountClass = classNames('entry-form-mount', {'entry-form-left': mount === 'left', 'entry-form-right': mount === 'right'});
      return (
        <div className={mountClass}>
          <FormComponent auth={this.props.getAuth} handleCancel={this.closeForm}
            formConfigData={formConfigData} signalFormSubmitted={this.signalFormSubmitted} />
        </div>
      );
    }
  }


  // dashboard is structured into a container with 2 main sections, the form-bar and the window
  // form-bar will remain fairly constant, window could be refactored to be more modular
  // each report is given a type, a title, and some standard report props
  // TODO: refactor this into an array based rendering to enable custom / modular dashboards
  render() {
    const reportProps = {auth: this.props.getAuth, lastFormSubmitted: this.state.lastFormSubmitted};
    return ( // close form on click in the dashboard to make it more natural
      <div className="dashboard-container" onClick={this.closeForm}>
        <div className="form-bar-wrapper">
          <div onClick={(e) => this.toggleForm(e, 'meal')} className="form-bar-button">
            <i className="mdi mdi-food-variant"></i>
            {this.renderForm(Meal, 'meal', 'left')}
          </div>
          <div onClick={(e) => this.toggleForm(e, 'exercise')} className="form-bar-button">
            <i className="mdi mdi-bike"></i>
            {this.renderForm(Exercise, 'exercise', 'left')}
          </div>
          <div onClick={(e) => this.toggleForm(e, 'pulse')} className="form-bar-button">
            <i className="mdi mdi-heart-pulse"></i>
            {this.renderForm(PulseCheck, 'pulse')}
          </div>
          <div onClick={(e) => this.toggleForm(e, 'sleep')} className="form-bar-button">
            <i className="mdi mdi-hotel"></i>
            {this.renderForm(Sleep, 'sleep', 'right')}
          </div>
          <div onClick={(e) => this.toggleForm(e, 'water')} className="form-bar-button">
            <i className="mdi mdi-cup-water"></i>
            {this.renderForm(Water, 'water', 'right')}
          </div>
        </div>
        <div className="dashboard-window">
          <div className="report-tile report-tile-wide shadow"><EntryList {...reportProps}/></div>
          <div className="report-tile shadow"><PieReport type="Meal" title="Current Week's Meals" {...reportProps}/></div>
          <div className="report-tile shadow"><BarReport type="Water" title="Current Week - Water" ind={3} {...reportProps}/></div>
          <div className="report-tile shadow"><BarReport type="Sleep" title="Current Week - Sleep" ind={3} {...reportProps}/></div>
          <div className="report-tile shadow"><BarReport type="Exercise" title="Current Week - Exercise" ind={3} {...reportProps}/></div>
          <div className="report-tile shadow"><RatingsLineReport type="Pulse" title="Current Week's Pulse" fields={['emotionalScore', 'physicalScore']} {...reportProps}/></div>
        </div>
      </div>
    );
  }
}
