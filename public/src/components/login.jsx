import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formWarning: ''
    };
  }

  handleSubmit(e) {
    e && e.preventDefault();
    if (this.validateForm()) {
      axios.post('/api/users/login', {
        username: this.state.username,
        password: this.state.password,
      }).then(resp => {
        if (resp.status === 200 && resp.statusText === 'OK') {
          this.props.onLogin(resp.data.token);
        }
      }).catch(err => {
        if (err.response.status === 401) {
          this.setState({formWarning: 'Incorrect username or password, please try again.'});
        }
      });
    }
  }

  validateForm() {
    if (!this.state.username) {
      this.setState({formWarning: 'Please enter a username'});
    } else if (!this.state.password) {
      this.setState({formWarning: 'Please enter a password.'});
    } else {
      return true;
    }
  }

  render () {
    return (
      <div className="login-wrapper">
        <div className="login-container flex flex-col flex-center">
          <div className="login-title">Login To HealthMe</div>
          <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              className="login-form-control"
              id="username"
              placeholder="Username"
              onChange={e => this.setState({'username': e.target.value})}
            />
            <input
              type="password"
              className="login-form-control"
              id="password"
              placeholder="Password"
              onChange={e => this.setState({'password': e.target.value})}
            />
            <div>
              <button type="submit" className="login-btn login-form-control">Login</button>
            </div>
            {this.state.formWarning && (<div className="login-warning">{this.state.formWarning}</div>)}
            <div>
              <Link className="login-link" to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
