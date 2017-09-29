
import React, { Component } from 'react';
import axios from 'axios';
import { findDOMNode } from 'react-dom';
import { TextFieldInput } from './form-helpers.jsx';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confPassword: '',
      formWarning: ''
    };
  }

  componentDidMount() {
    window.componentHandler.upgradeElements(findDOMNode(this));
  }

  componentWillUnmount() {
    const element = findDOMNode(this);
    window.componentHandler.downgradeElements(element);
  }

  handleSubmit(e) {
    e && e.preventDefault();
    if (this.validateForm(e)) {
      axios.post('/api/users/signup', {//TODO: be sure this endpoint matches server config, check back once db schema is finalized
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      }).then(resp => {
        if (resp.status === 201 && resp.statusText === 'Created') { // user successfully created
          this.props.onLogin(resp.data.token);//TODO: make sure this prop is defined and passed down to this component
          this.props.history.push({pathname: '/'});//TODO: make sure this prop is defined and passed down to this component
        }
      }).catch(err => this.setState({formWarning: 'Server error: ' + err}));//will this warning show up in form?
    }
  }

  validateForm(e) {
    if (this.state.password !== this.state.confPassword) {
      this.setState({formWarning: 'Passwords must match, please try again.'});
      return false;
    } else {
      return true;
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;//can be conditional if forms have special return patterns
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <form on-submit={e => this.handleSubmit(e)}>
        <div class="form-group">
          <label for="username">Email address</label>
          <input
            type="text"
            class="form-control"
            name="username"
            id="username"
            placeholder="Enter a username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <div class="form-group">
          <label for="confPassword">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confPassword"
            name="confPassword"
            placeholder="Confirm password"
            value={this.state.confPassword}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    );
  }
}