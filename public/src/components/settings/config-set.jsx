import React, { Component } from 'react';
import axios from 'axios';
import './settings.css';

const typeMap = {'Meal Ingredients': 'ingredients', 'Emotional Tags': 'emotional', 'Physical Tags': 'physical'};

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
    this.refreshConfigData();
  }

  refreshConfigData() {
    axios.get('/api/users/formconfig', {
      headers: {'Authorization': 'bearer ' + this.props.auth()}
    }).then(resp => {
      let configData = resp.data[this.configType].map(el => ({name: el, active: true}));
      this.setState({configData});
    }).catch(err => console.log(err));
  }

  toggleStatus(i) {
    let newConfig = this.state.configData.slice();
    newConfig[i].active = !newConfig[i].active;
    this.setState({configData: newConfig});
  }

  addItem() {
    let newConfig = this.state.configData.slice();
    newConfig.push({name: this.state.newItem, active: true});
    this.setState({configData: newConfig, newItem: ''});
  }

  saveConfigData() {
    let data = this.state.configData.reduce((actives, el) => {
      if (el.active) { actives.push(el.name); }
      return actives;
    }, []);
    axios.put('/api/users/formconfig',
      {type: this.configType, configData: data},
      {headers: {'Authorization': 'bearer ' + this.props.auth()}}
    ).then(() => this.refreshConfigData())
      .catch(err => console.log(err));
  }

  renderConfigList() {
    if (this.state.configData.length) {
      return this.state.configData.map((el, i) => (
        <ConfigListItem name={el.name} active={el.active} i={i}
          key={`c-${i}`} toggleStatus={this.toggleStatus} />
      ));
    } else { return null; }
  }

  render() {
    return this.state.configData.length ? (
      <div className="config-container shadow">
        <div className="config-header"><span>{this.props.type}</span></div>
        <div className="config-panel">
          <div className="config-list">
            {this.renderConfigList()}
          </div>
          <div className="config-list-new-item input-group">
            <input type="text" className="form-control" value={this.state.newItem}
              placeholder="Add a new item..." aria-label="Add a new item..."
              onChange={e => this.setState({newItem: e.target.value})}
              onKeyPress={e => { if (e.key === 'Enter') { this.addItem(); } }}
            />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={() => this.addItem()}>+</button>
            </span>
          </div>
          <div className="config-submit">
            <button className="btn shadow" onClick={() => this.refreshConfigData()}>Reset</button>
            <button className="btn shadow" onClick={() => this.saveConfigData()}>Save</button>
          </div>
        </div>
      </div>
    ) : ( null );
  }
}

const ConfigListItem = ({name, active, i, toggleStatus}) => (
  <div className={'config-list-item ' + (active ? '' : 'config-list-item-inactive') }>
    <div className="config-list-item-name">{name}</div>
    <button type="button" className="close" aria-label="Close" onClick={() => toggleStatus(i)}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);
