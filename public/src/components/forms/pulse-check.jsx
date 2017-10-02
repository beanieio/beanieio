import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Multiselect from 'react-widgets/lib/Multiselect';
import Rating from '../rating.jsx';
import './form-styles.css';

const physDefaults = ['Great All Around', 'Tired', 'Sore', 'Sick'];
const emoDefaults = ['Energized', 'Relaxed', 'Stressed', 'Depressed'];

export default class PulseCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phys: null,
      emo: null,
      physTags: physDefaults, //TODO: serve this with an api call on mount
      emoTags: emoDefaults, //TODO: serve this with an api call on mount
    };
  }

  render() {
    return (
      <div className="form-wrapper shadow">
        <div className="form-header">How are you feeling?</div>
        <form>
          <div class="form-group flex flex-align-center">
            <label class="form-label" for="phys-score">Physically:</label>
            <Rating onChange={v => this.setState({phys: v})}/>
          </div>
          <div class="form-group flex flex-align-center">
            <label class="form-label" for="phys-score">Emotionally:</label>
            <Rating onChange={v => this.setState({emo: v})}/>
          </div>
        </form>
      </div>
    );
  }
}
