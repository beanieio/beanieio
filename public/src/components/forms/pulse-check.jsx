import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Multiselect, DateTimePicker } from 'react-widgets';
import Rating from '../rating.jsx';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';
momentLocalizer();

const physDefaults = ['Great All Around', 'Tired', 'Sore', 'Sick'];
const emoDefaults = ['Energized', 'Relaxed', 'Stressed', 'Depressed'];

export default class PulseCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phys: null,
      emo: null,
      physOpts: this.props.formConfigData.physConfig,
      emoOpts: this.props.formConfigData.emoConfig,
      physTags: [],
      emoTags: [],
      datetime: new Date(),
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    let formData = {
      type: 'Pulse',
      phys: this.state.phys,
      emo: this.state.emo,
      physTags: this.state.physTags,
      emoTags: this.state.emoTags,
      datetime: this.state.datetime
    };
    axios.post('/api/formdata', formData, {headers: {'Authorization': 'bearer ' + this.props.auth()}})
      .then((res) => {
        this.props.handleCancel();
        this.props.signalFormSubmitted('Pulse');
      }).catch((err) => console.log('error: ', err));
  }

  // stop propagation on clicks allows form interaction to be contained within the form
  // otherwise dashboard-level click handlers would also fire... not helpful!
  render() {
    return (
      <div className="form-wrapper shadow" onClick={e => e.stopPropagation()}>
        <div className="form-header flex flex-align-center space-between">
          <span>How are you feeling?</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.props.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="phys-score">Physically:</label>
            <Rating value={this.state.phys} onChange={v => this.setState({phys: v})}/>
          </div>
          <div className="form-group flex flex-align-center">
            <Multiselect className="form-multiselect" data={this.state.physOpts}
              onChange={v => this.setState({physTags: v})} placeholder="Anything in particular?"
              value={this.state.physTags}
            />
          </div>
          <div className="form-group flex flex-align-center">
            <label className="form-label" htmlFor="phys-score">Emotionally:</label>
            <Rating value={this.state.emo} onChange={v => this.setState({emo: v})}/>
          </div>
          <div className="form-group flex flex-align-center">
            <Multiselect className="form-multiselect" data={this.state.emoOpts}
              onChange={v => this.setState({emoTags: v})} placeholder="Anything in particular?"
              value={this.state.emoTags}
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
