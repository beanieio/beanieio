import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Multiselect, DateTimePicker } from 'react-widgets';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';
momentLocalizer();

export default class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsTags: [],
      datetime: new Date(),
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    let formData = {
      type: 'Meal',
      datetime: this.state.datetime,
      ingredients: this.state.ingredientsTags
    };
    axios.post('/api/formdata', formData, {headers: {'Authorization': 'bearer ' + this.props.auth()}})
      .then((res) => {
        this.props.handleCancel();
        this.props.signalFormSubmitted('Meal');
      }).catch((err) => console.log('error: ', err));
  }

  render() {
    return (
      <div className="form-wrapper shadow" onClick={e => e.stopPropagation()}>
        <div className="form-header flex flex-align-center space-between">
          <span>Select the ingredients you want to track for this meal.</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.props.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <Multiselect className="form-multiselect" data={this.props.formConfigData}
              onChange={v => this.setState({ingredientsTags: v})} placeholder="Type or select ingredients here"
              value={this.state.ingredientsTags}
            />
          </div>
          <div className="form-group flex flex-align-center">
            <DateTimePicker id="datetime" className="form-datetimepicker"
              onChange={v => this.setState({datetime: v})} value={this.state.datetime}
            />
          </div>
          <div className="form-submit-section flex flex-center">
            <button type="submit" className="btn form-submit-btn shadow">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
