import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, signup, startSingup } from '../actions/auth';
import Alert from '@mui/material/Alert';
import { Redirect } from 'react-router';
const Signup = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
     props.dispatch(clearAuthState());
  }, []);


  const handleSubmit = (e) => {
    // console.log('In handle submit');
    e.preventDefault();
    // const { email, password, confirmPassword, name } = ;

    if (email && password && confirmPassword && name) {
      props.dispatch(startSingup());
      props.dispatch(signup(email, password, confirmPassword, name));
    }
  };

  const { error, inProgress, isLoggedin } = props.auth;
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
              setName(e.target.value);
              // this.handleInputChange('name', e.target.value);
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
              setEmail(e.target.value);
              // this.handleInputChange('email', e.target.value);
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
              setPassword(e.target.value);
              // this.handleInputChange('password', e.target.value);
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
              setConfirmPassword(e.target.value);
              // this.handleInputChange('confirmPassword', e.target.value);
            }}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={handleSubmit} disabled={inProgress}>
              signing in...
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={inProgress}>
              sign in
            </button>
          )}
        </div>
      </form>
    );
  }
};
function mapStateToProps({ auth }) {
  return {
    auth: auth,
  };
}
export default connect(mapStateToProps)(Signup);
