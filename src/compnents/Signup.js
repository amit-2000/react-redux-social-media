import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, signup, startSingup } from '../actions/auth';
import Alert from '@mui/material/Alert';
import { Redirect } from 'react-router';
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
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  handleSubmit = (e) => {
    // console.log('In handle submit');
    e.preventDefault();
    const { email, password, confirmPassword, name } = this.state;

    if (email && password && confirmPassword && name) {
      this.props.dispatch(startSingup());
      this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };
  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    if (isLoggedin) {
      return <Redirect to="/" />;
    } else {
      return (
        <form className="login-form">
          <span className="login-signup-header" style={{ letterSpacing: 1 }}>
            Sign up
          </span>
          <Alert severity="success">amit55@gmail.com</Alert>
          {error ? <Alert severity="warning">{error}</Alert> : ''}
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
            {inProgress ? (
              <button onClick={this.handleSubmit} disabled={inProgress}>
                signing in...
              </button>
            ) : (
              <button onClick={this.handleSubmit} disabled={inProgress}>
                sign in
              </button>
            )}
          </div>
        </form>
      );
    }
  }
}
function mapStateToProps({ auth }) {
  return {
    auth: auth,
  };
}
export default connect(mapStateToProps)(Signup);
