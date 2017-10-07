import React, { Component } from 'react';
import { DropdownList } from 'react-widgets';
import './form-styles.css';
import 'react-widgets/dist/css/react-widgets.css';

export default class ChooseFeelingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeling: null,
      tagType: null,
      physOpts: this.props.formConfigData.physConfig,
      emoOpts: this.props.formConfigData.emoConfig,
    };
  }

  handleSubmit() {
    e && e.preventDefault();
    this.props.handleSubmit(this.state.feeling, this.state.tagType);
  }

  render() {
    return (
      <div className="form-wrapper shadow" onClick={e => e.stopPropagation()}>
        <div className="form-header flex flex-align-center space-between">
          <span>Choose a feeling from either physical or emotional tags:</span>
          <button type="button" className="close" aria-label="Close" onClick={() => this.props.handleCancel()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group flex flex-align-center">
            <DropdownList className="form-multiselect" data={this.state.physOpts}
              onChange={v => this.setState({feeling: v, tagType: 'physicalTags'})}/>
          </div>
          <div className="form-group flex flex-align-center">
            <DropdownList onChange={v => this.setState({feeling: v, tagType: 'emotionalTags'})} data={this.state.emoOpts}/>
          </div>
          <div className="form-submit-section flex flex-center">
            <button type="submit" className="btn form-submit-btn shadow">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
