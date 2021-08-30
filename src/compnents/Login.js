import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }
  handleLogInClick = (e) => {
    e.preventDefault();
    console.log(
      'this.emailInputRef',
      this.emailInputRef.current.value,
      'this.passwordInputRef',
      this.passwordInputRef.current.value
    );
  };

  render() {
    //   uncontroller comp : comp data is not manage my react itself.
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            ref={this.emailInputRef}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            ref={this.passwordInputRef}
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
export default Login;
