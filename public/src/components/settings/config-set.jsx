import React, { Component } from 'react';
import axios from 'axios';
import './settings.css';

const typeMap = {'Meal': 'ingredients', 'Emo': 'emotional', 'Phys': 'physical'};

export default class ConfigSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configData: [],
      newItem: '',
    };
    this.configType = typeMap[this.props.type];
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  componentWillMount() {
    axios.get('/api/users/formconfig', {
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(resp => {
      let configData = resp.data[this.configType].map(el => ({name: el, active: true}));
      this.setState({configData});
    }).catch(err => console.log(err));
  }

  toggleStatus(i) {
    console.log('Toggle selected on element: ', i);
    let newConfig = this.state.configData.slice();
    newConfig[i].active = !newConfig[i].active;
    this.setState({configData: newConfig});
  }

  addItem() {
    console.log('Adding item: ', this.state.newItem);
  }



  render() {
    return (
      <div className="config-container shadow">
        <div className="config-header"><span>{this.props.type}</span></div>
        <div className="config-panel">
          <div className="config-list">
            {this.state.configData.length && this.state.configData.map((el, i) => {
              return (
                <ConfigListItem name={el.name} active={el.active}
                  i={i} key={`c-${i}`} toggleStatus={this.toggleStatus} />
              );
            })}
          </div>
          <div className="config-list-new-item input-group">
            <input type="text" className="form-control" value={this.state.newItem}
              placeholder="Add a new item..." aria-label="Add a new item..."
              onChange={e => this.setState({newItem: e.target.value})}/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={() => this.addItem()}>+</button>
            </span>
          </div>
          <div className="config-submit">
            <button className="btn btn-primary">Reset</button>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const ConfigListItem = ({name, active, i, toggleStatus}) => (
  <div className={'config-list-item ' + (active ? '' : 'config-list-item-inactive') }>
    <div>{name}</div>
    <button type="button" className="close" aria-label="Close" onClick={() => toggleStatus(i)}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);
