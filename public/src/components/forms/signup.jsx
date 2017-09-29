
import React, { Component } from 'react';
import axios from 'axios';
import { findDOMNode } from 'react-dom';
import { TextFieldInput } from './form-helpers.jsx';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confPassword: '',
      email: '',
      formWarning: ''
    }

    handleSubmit(e) {
      e & e.preventDefault();

    }

    render () {
      return (
        <form on-submit={e => this.handleSubmit(e)}>
          <div class="form-group">
            <label for="username">Email address</label>
            <TextFieldInput
              class="form-control"
              id="username"
              placeholder="Enter a username"
              onChange={e => this.setState({username: e.target.value})}
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <TextFieldInput type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="confPassword">Confirm password</label>
            <TextFieldInput type="password" class="form-control" id="confPassword" placeholder="Confirm password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        );
    }
}

