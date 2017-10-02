import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Combobox, DateTimePicker } from 'react-widgets';
import Rating from '../rating.jsx';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';
momentLocalizer();

const physDefaults = ['Great All Around', 'Tired', 'Sore', 'Sick'];
const emoDefaults = ['Energized', 'Relaxed', 'Stressed', 'Depressed'];

export default class Sleep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: null,
      quality: null,
      date: new Date(),
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    console.log('Submitting data: '); //TODO: wire this up to api post
    console.log({
      duration: this.state.duration,
      quality: this.state.quality,
      date: this.state.date
    });
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
          <span>How did you sleep last night?</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="duration">Hours:</label>
            <Combobox className="form-multiselect" data={[0, 2, 4, 6, 8, 10]}
              onChange={v => this.setState({duration: v})} placeholder="choose or enter an amount"
              value={this.state.duration}
            />
          </div>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="phys-score">Quality:</label>
            <Rating value={this.state.quality} onChange={v => this.setState({quality: v})}/>
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
