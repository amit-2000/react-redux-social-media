import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, login } from '../actions/auth';
import Alert from '@mui/material/Alert';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    props.dispatch(clearAuthState());
  }, []);

  const handleLogInClick = (e) => {
    e.preventDefault();
    if (email.length > 1 && password.length > 1) {
      props.dispatch(login(email, password));
    }
    // console.log(email, password);
  };

  //   uncontroller comp : comp data is not manage my react itself.
  // controlled components using state.
  const { inProgress, error, isLoggedin } = props.auth;
  // console.log(props);
  const { from } = props.location.state || { from: { pathname: '/' } };
  // console.log(from);
  if (isLoggedin) {
    // 'to' can also accept an object !
    return <Redirect to={from.pathname} />;
  }
  return (
    <form className="login-form">
      <span className="login-signup-header">Log In</span>
      {error ? <Alert severity="error">{error}</Alert> : ''}
      <Alert severity="info">prash@gmail.com</Alert>
      <div className="field">
        <input
          type="email"
          placeholder="Email"
          required
          // ref={this.emailInputRef}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="password"
          required
          // ref={this.passwordInputRef}
          // onChange={this.handlePasschange}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="field">
        {inProgress ? (
          <button onClick={handleLogInClick} disabled={inProgress}>
            Logging in
          </button>
        ) : (
          <button onClick={handleLogInClick} disabled={inProgress}>
            Log in
          </button>
        )}
      </div>

      <div className="field">
        {' '}
        <Link to="/signup">
          <button>Register</button>
        </Link>
      </div>
    </form>
  );
};

function mapstateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapstateToProps)(Login);
