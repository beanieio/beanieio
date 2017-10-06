import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Combobox, DateTimePicker } from 'react-widgets';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';
momentLocalizer();

export default class Water extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      datetime: new Date(),
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    let formData = {
      type: 'Water',
      waterAmount: this.state.amount,
      datetime: this.state.datetime
    };
    axios.post('/api/formdata', formData, {headers: {'Authorization': 'bearer ' + this.props.auth()}})
      .then((res) => {
        this.props.handleCancel();
        this.props.signalFormSubmitted('Water');
      }).catch((err) => console.log('error: ', err));
  }

  render() {
    return (
      <div className="form-wrapper shadow" onClick={e => e.stopPropagation()}>
        <div className="form-header flex flex-align-center space-between">
          <span>How much water have you been drinking?</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.props.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <Combobox id="amount" data={[8, 12, 16, 20]} onChange={v => this.setState({amount: v})} placeholder="Choose/Enter a number of fl oz."/>
          </div>
          <div className="form-group flex flex-align-center">
            <DateTimePicker id="datetime" onChange={v => this.setState({datetime: v})} value={this.state.datetime}/>
          </div>
          <div className="form-submit-section flex flex-center">
            <button type="submit" className="btn form-submit-btn shadow">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
