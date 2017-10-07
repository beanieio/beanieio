import React, { Component } from 'react';
import ComboLineReport from './combo-line-report.jsx';
import ComboPieReport from './combo-pie-report.jsx';
import axios from 'axios';
import '../dashboard.css';
const debug = process.env.DEBUG || false;

export default class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // openForm: '',
      // ingredientConfig: [],
      // pulseConfig: {},
      feeling: null,
      outcome: null,
      data: { },
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

    axios.get('/api/reports/correlation', {
      params: {
        feeling: 'tired',
        type: 'physicalTags',
      },
      headers: {'Authorization': 'bearer ' + this.props.getAuth()}
    }).then(res => {
      this.setState({data: res.data});
      if (debug) { console.log(res.data); }
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

  render() {
    return (
      <div className="dashboard-container" onClick={this.closeForm}>
        <div className="form-bar-wrapper">
        </div>
        <div className="dashboard-window">
          <div className="report-tile report-tile-wide shadow"><ComboLineReport data={this.state.data} title="Summary: "/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.mealMatches} type="Meal" title="Ingredients:"/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.pulseMatches} type="PulseEmo" title="Emotional tags:"/></div>
          <div className="report-tile shadow"><ComboPieReport data={this.state.data.pulseMatches} type="PulsePhys" title="Physical tags:"/></div>
        </div>
      </div>
    );
  }
}
// TODO: incoporate these elements


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
