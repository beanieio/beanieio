import React, { Component } from 'react';
import ComboLineReport from './combo-line-report.jsx';
import axios from 'axios';
import './dashboard.css';
const debug = process.env.DEBUG || true;

export default class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // openForm: '',
      // ingredientConfig: [],
      // pulseConfig: {},
      raw: [ ],
      pulseMatches: [ ],
      mealMatches: [ ],
      feeling: null,
      outcome: null,
    };
    // this.closeForm = this.closeForm.bind(this);
    // this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {

    // axios.get('/api/users/formconfig',
    //   {headers: {'Authorization': 'bearer ' + this.props.getAuth()}}
    // ).then(resp => {
    //   this.setState({
    //     ingredientConfig: resp.data.ingredients,
    //     pulseConfig: {emoConfig: resp.data.emotional, physConfig: resp.data.physical}
    //   });
    // });

    axios.get('/api/correlation', {
      params: {
        feeling: 'Tired',
        type: 'physicalTags',
      },
      headers: {'Authorization': 'bearer ' + this.props.getAuth()}
    }).then(res => {
      this.handleData(res.data);
    });
  }


  // Complete this once drowpown formas are created
  // toggleForm(e, form) {
  //   e.stopPropagation();
  //   this.setState({openForm: this.state.openForm === form ? '' : form});
  // }

  // closeForm() {
  //   this.setState({openForm: ''});
  // }
  // renderForm(FormComponent, formName, mount) {
  //   if (this.state.openForm === formName) {
  //     const formConfigData = formName === 'meal' ? this.state.ingredientConfig : formName === 'pulse' ? this.state.pulseConfig : null;
  //     const mountClass = classNames('entry-form-mount', {'entry-form-left': mount === 'left', 'entry-form-right': mount === 'right'});
  //     return (
  //       <div className={mountClass}>
  //         <FormComponent auth={this.props.getAuth} handleCancel={this.closeForm} formConfigData={formConfigData} />
  //       </div>
  //     );
  //   }
  // }

  handleData(resData) {
    this.handleRawData(resData.raw);
    this.handlePulseData(resData.pulseMatches);
    this.handleMealData(resData.mealMatches);
  }

  handleRawData () {

  }

  handlePulseData () {

  }

  handleMealData () {

  }

  render() {
    return (
      <div className="dashboard-container" onClick={this.closeForm}>
        <div className="form-bar-wrapper">
        </div>
        <div className="dashboard-window">
          <div className="report-tile report-tile-wide shadow"><ComboLineReport /></div>
        </div>
      </div>
    );
  }
}
// TODO: incoporate these elements

// <div className="report-tile report-tile-wide shadow"><ComboPieReport auth={this.props.getAuth} /></div>

// <div onClick={(e) => this.toggleForm(e, 'meal')} className="form-bar-button">
//   <i className="mdi mdi-food-variant"></i>
//   {this.renderForm(Meal, 'meal', 'left')}
// </div>
// <div onClick={(e) => this.toggleForm(e, 'exercise')} className="form-bar-button">
//   <i className="mdi mdi-bike"></i>
//   {this.renderForm(Exercise, 'exercise', 'left')}
// </div>
// <div onClick={(e) => this.toggleForm(e, 'pulse')} className="form-bar-button">
//   <i className="mdi mdi-heart-pulse"></i>
//   {this.renderForm(PulseCheck, 'pulse')}
// </div>
// <div onClick={(e) => this.toggleForm(e, 'sleep')} className="form-bar-button">
//   <i className="mdi mdi-hotel"></i>
//   {this.renderForm(Sleep, 'sleep', 'right')}
// </div>
// <div onClick={(e) => this.toggleForm(e, 'water')} className="form-bar-button">
//   <i className="mdi mdi-cup-water"></i>
//   {this.renderForm(Water, 'water', 'right')}
// </div>
