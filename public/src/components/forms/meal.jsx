import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Multiselect, DateTimePicker } from 'react-widgets';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';
momentLocalizer();

const ingredientsDefaults = ['peanuts', 'wheat', 'gluten', 'dairy', 'egg', 'soy', 'tree nuts', 'corn', 'shellfish', 'sesame', 'fish', 'red meat', 'chicken', 'strawberries', 'sucralose', 'high-fructose corn syrup'];

export default class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsOpts: ingredientsDefaults, //TODO: serve this with an api get on mount
      ingredientsTags: [],
      date: new Date(),
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    console.log('Submitting data: ');
    console.log({
      ingredientsTags: this.state.ingredientsTags,
      date: this.state.date
    });
    let formData = {
      type: 'Meal',
      datetime: this.state.datetime,
      ingredients: this.state.ingredients
    };
    axios.post('/api/formdata', formData, {headers: {'Authorization': 'bearer ' + this.props.auth()}})
      .then((res) => this.props.history.push({pathname: '/'}))
      .catch((err) => console.log('error: ', err));
  }

  handleCancel() {
    if (!this.props.handleCancel) {
      console.log('Error: missing cancel handler...'); //TODO: remove this once mounted
    } else {
      this.props.handleCancel();
    }
  }

  render() {
    return (
      <div className="form-wrapper shadow">
        <div className="form-header flex flex-align-center space-between">
          <span>Select the ingredients you want to track for this meal.</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <Multiselect className="form-multiselect" data={this.state.ingredientsOpts}
              onChange={v => this.setState({ingredientsTags: v})} placeholder="Type or select ingredients here"
              value={this.state.ingredientsTags}
            />
          </div>
          <div className="form-group flex flex-align-center">
            <DateTimePicker id="date" className="form-datetimepicker"
              onChange={v => this.setState({date: v})} value={this.state.date}
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
