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

  render () {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-title">Sign Up For HealthMe</div>
          <form on-submit={e => this.handleSubmit(e)}>
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
            <div>
              <Link className="login-link" to="/login">Already have an account? Login now</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
