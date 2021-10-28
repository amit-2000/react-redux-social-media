import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, editUser } from '../actions/auth';
import Alert from '@mui/material/Alert';
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: props.auth.user.editMode,
    };
  }
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleChange = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };

  handleSave = () => {
    const { name, password, confirmPassword } = this.state;
    const userId = this.props.auth.user._id;
    if (password === confirmPassword) {
      this.props.dispatch(editUser(name, password, confirmPassword, userId));
    }
  };

  render() {
    const { user, error } = this.props.auth;
    const { editMode } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
            id="user-dp"
          />
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        {error === false && (
          <Alert severity="success">{'successfully updated the profile'}</Alert>
        )}
        <div className="field">
          <div className="field-label">email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name', e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>
        {editMode && (
          <div className="field">
            <div className="field-label">New password</div>
            <input
              type="password"
              onChange={(e) => {
                this.handleChange('password', e.target.value);
              }}
              value={this.state.password}
            />
          </div>
        )}
        {editMode && (
          <div className="field">
            <div className="field-label">confirm password</div>
            <input
              type="password"
              onChange={(e) => {
                this.handleChange('confirmPassword', e.target.value);
              }}
              value={this.state.confirmPassword}
            />
          </div>
        )}

        <div className="btn-grp">
          {editMode ? (
            <button className="btn save-btn" onClick={this.handleSave}>
              save
            </button>
          ) : (
            <button
              className="btn edit-btn"
              onClick={() => this.handleChange('editMode', true)}
            >
              Edit profile
            </button>
          )}

          {editMode && (
            <div
              className="go-back"
              onClick={() => this.handleChange('editMode', false)}
            >
              {'Back <-'}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapstateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapstateToProps)(Setting);
