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
    if (this.validateForm(e)) {
      axios.post('/api/users/login', {//TODO: be sure this endpoint matches server config, check back once db schema is finalized
        username: this.state.username,
        password: this.state.password,
      }).then(resp => {
        if (resp.status === 200 && resp.statusText === 'OK') { // TODO: make sure this statusText matches response from server
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
            <div>
              <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// {/* <a href="" className="login-link" onClick={(e) => this.goToSignup(e)}>Sign Up</a> */}
