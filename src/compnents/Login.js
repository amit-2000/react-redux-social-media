import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, login } from '../actions/auth';
import Alert from '@mui/material/Alert';
import { Redirect } from 'react-router';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleLogInClick = (e) => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    console.log('this.props are', this.props);
    if (email.length > 1 && password.length > 1) {
      this.props.dispatch(login(email, password));
    }
    console.log(this.state.email, this.state.password);
  };

  render() {
    //   uncontroller comp : comp data is not manage my react itself.
    // controlled components using state.
    const { inProgress, error, isLoggedin } = this.props.auth;
    // console.log(is)
    if (isLoggedin) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {/* {error && <div className="alert error-dailog">{error}</div>} */}
        {error ? <Alert severity="error">{error}</Alert> : ''}
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
          {inProgress ? (
            <button onClick={this.handleLogInClick} disabled={inProgress}>
              Logging in
            </button>
          ) : (
            <button onClick={this.handleLogInClick} disabled={inProgress}>
              Log in
            </button>
          )}
        </div>
        <div className="field"></div>
      </form>
    );
  }
}
function mapstateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapstateToProps)(Login);
