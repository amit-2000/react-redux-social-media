import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Register</span>
        <div className="field">
          <input type="email" placeholder="Email" required />
        </div>
        <div className="field">
          <input type="password" placeholder="password" required />
        </div>
        <div className="field">
          <input type="password" placeholder="confirm password" required />
        </div>
        <div className="field">
          <button>Register</button>
        </div>
        <div className="field"></div>
      </form>
    );
  }
}
export default Signup;
