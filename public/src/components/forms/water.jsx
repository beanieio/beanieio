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
      date: new Date(),
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    let formData = {
      type: 'Water',
      amount: this.state.amount,
      date: this.state.date
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
      <div className="form-wrapper shadow" onClick={e => e.stopPropagation()}>
        <div className="form-header flex flex-align-center space-between">
          <span>How much water have you been drinking?</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <Combobox id="amount" data={[8, 12, 16, 20]} onChange={v => this.setState({amount: v})} placeholder="Choose/Enter a number of fl oz."/>
          </div>
          <div className="form-group flex flex-align-center">
            <DateTimePicker id="date" onChange={v => this.setState({date: v})} value={this.state.date}/>
          </div>
          <div className="form-submit-section flex flex-center">
            <button type="submit" className="btn form-submit-btn shadow">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
