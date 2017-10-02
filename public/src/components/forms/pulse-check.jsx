import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Multiselect, DateTimePicker } from 'react-widgets';
import Rating from '../rating.jsx';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';

moment.locale('en');
momentLocalizer();

const physDefaults = ['Great All Around', 'Tired', 'Sore', 'Sick'];
const emoDefaults = ['Energized', 'Relaxed', 'Stressed', 'Depressed'];

export default class PulseCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phys: null,
      emo: null,
      physOpts: physDefaults, //TODO: serve this with an api call on mount
      emoOpts: emoDefaults, //TODO: serve this with an api call on mount
      physTags: [],
      emoTags: [],
    };
  }

  render() {
    return (
      <div className="form-wrapper shadow">
        <div className="form-header flex flex-align-center space-between">
          <span>How are you feeling?</span>
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="phys-score">Physically:</label>
            <Rating onChange={v => this.setState({phys: v})}/>
          </div>
          <div className="form-group flex flex-align-center">
            <Multiselect className="form-multiselect" data={this.state.physOpts}
              onChange={v => this.setState({physTags: v})} placeholder="Anything in particular?"
            />
          </div>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="phys-score">Emotionally:</label>
            <Rating onChange={v => this.setState({emo: v})}/>
          </div>
          <div className="form-group flex flex-align-center">
            <Multiselect className="form-multiselect" data={this.state.emoOpts}
              onChange={v => this.setState({emoTags: v})} placeholder="Anything in particular?"
            />
          </div>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="date">Date:</label>
            <DateTimePicker id="date" className="form-datetimepicker"/>
          </div>
          <div className="form-submit-section flex flex-center">
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
