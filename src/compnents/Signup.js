import React, { Component } from 'react';
import { signup, startSingup } from '../actions/auth';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    };
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = this.state;

    if (email && password && confirmPassword && name) {
       this.props.dispatch(startSingup());
       this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };

  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header" style={{ letterSpacing: 1 }}>
          Sign up
        </span>
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => {

              this.handleInputChange('name', e.target.value);
              // this.setState({ name: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
               this.handleInputChange('email', e.target.value);
              // this.setState({ email: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => {
               this.handleInputChange('password', e.target.value);
              // this.setState({ password: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="confirm password"
            required
            onChange={(e) => {
               this.handleInputChange('confirmPassword', e.target.value);
            }}
          />
        </div>
        <div className="field">
          <button>
            <span style={{ letterSpacing: 1.5 }}>Sign up</span>{' '}
          </button>
        </div>
        <div className="field"></div>
      </form>
    );
  }
}
export default Signup;
