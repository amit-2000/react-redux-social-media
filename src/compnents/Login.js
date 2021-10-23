import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import auth from '../reducers/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleLogInClick = (e) => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    console.log('this.props are', this.props);
    if (email.length>1 && password.length>1) {
      this.props.dispatch(login(email, password));
    }
    console.log(this.state.email, this.state.password);
  };

  render() {
    //   uncontroller comp : comp data is not manage my react itself.
    // controlled components using state.
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            // ref={this.passwordInputRef}
            // onChange={this.handlePasschange}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="field">
          <button onClick={this.handleLogInClick}>Log in</button>
        </div>
        <div className="field"></div>
      </form>
    );
  }
}
function mapstateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapstateToProps)(Login);
