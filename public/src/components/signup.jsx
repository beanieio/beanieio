import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

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


  handleSubmit(e) {
    e && e.preventDefault();
    if (this.validateForm(e)) {
      axios.post('/api/users/signup', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      }).then(resp => {
        if (resp.status === 201 && resp.statusText === 'Created') { // user successfully created
          this.props.onLogin(resp.data.token);
        }
      }).catch(err => {
        this.setState({formWarning: err.response.data});
      });
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

  render () {
    return (
      <div className="login-wrapper">
        <div className="login-container flex flex-col flex-center">
          <div className="login-title">Sign Up For HealthMe</div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              className="login-form-control"
              id="username"
              placeholder="Username"
              onChange={e => this.setState({username: e.target.value})}
            />
            <input
              type="email"
              className="login-form-control"
              id="email"
              placeholder="Email"
              onChange={e => this.setState({'email': e.target.value})}
            />
            <input
              type="password"
              className="login-form-control"
              id="password"
              placeholder="Password"
              onChange={e => this.setState({'password': e.target.value})}
            />
            <input
              type="password"
              className="login-form-control"
              id="confPassword"
              placeholder="Confirm password"
              onChange={e => this.setState({'confPassword': e.target.value})}
            />
            <button type="submit" className="login-btn login-form-control">Sign Up</button>
            {this.state.formWarning && (<div className="login-warning">{this.state.formWarning}</div>)}
            <div>
              <Link className="login-link" to="/login">Already have an account? Login now</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
