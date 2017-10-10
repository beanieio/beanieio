import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Combobox, DateTimePicker } from 'react-widgets';
import Rating from '../rating.jsx';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';
momentLocalizer();

export default class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: null,
      intensity: null,
      datetime: new Date(),
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    let formData = {
      type: 'Exercise',
      excDuration: this.state.duration,
      excIntensity: this.state.intensity,
      datetime: this.state.datetime
    };
    axios.post('/api/formdata', formData, {headers: {'Authorization': 'bearer ' + this.props.auth()}})
      .then((res) => {
        this.props.handleCancel();
        this.props.signalFormSubmitted('Exercise');
      }).catch((err) => console.log('error: ', err));
  }

  // stop propagation on clicks allows form interaction to be contained within the form
  // otherwise dashboard-level click handlers would also fire... not helpful!
  render() {
    return (
      <div className="form-wrapper shadow" onClick={e => e.stopPropagation()}>
        <div className="form-header flex flex-align-center space-between">
          <span>How was your workout?</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.props.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <Combobox className="form-multiselect" data={[15, 30, 45, 60]}
              onChange={v => this.setState({duration: v})} placeholder="How many minutes?"
              value={this.state.duration}
            />
          </div>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="phys-score">Intensity:</label>
            <Rating value={this.state.intensity} onChange={v => this.setState({intensity: v})}/>
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
