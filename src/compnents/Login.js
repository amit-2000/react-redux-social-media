import React, { Component } from 'react';

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
export default Login;
