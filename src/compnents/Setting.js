import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, editUser } from '../actions/auth';
import Alert from '@mui/material/Alert';
import setRef from '@mui/utils/setRef';
const Setting = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: props.auth.user.name,
  //     password: '',
  //     confirmPassword: '',
  //     editMode: props.auth.user.editMode,
  //   };
  // }
  const [name, setname] = useState(props.auth.user.name);
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmpassword] = useState('');
  const [editMode, seteditMode] = useState(props.auth.user.editMode);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    props.dispatch(clearAuthState());
  }, []);
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  // componentWillUnmount() {
  //   this.props.dispatch(clearAuthState());
  // }

  const { user, error } = props.auth;

  useEffect(() => {
    const interval = setInterval(() => {
      props.dispatch(clearAuthState());
    }, 3000);
    return () => clearInterval(interval);
  }, [error]);

  const handleSave = () => {
    // const { name, password, confirmPassword } = this.state;
    const userId = props.auth.user._id;
    if (password === confirmPassword) {
      props.dispatch(editUser(name, password, confirmPassword, userId));
    }
  };

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
      {error == false && (
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
            onChange={(e) => setname(e.target.value)}
            value={name}
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
              setpassword(e.target.value);
              // this.handleChange('password', e.target.value);
            }}
            value={password}
          />
        </div>
      )}
      {editMode && (
        <div className="field">
          <div className="field-label">confirm password</div>
          <input
            type="password"
            onChange={(e) => {
              setconfirmpassword(e.target.value);
              // this.handleChange('confirmPassword', e.target.value);
            }}
            value={confirmPassword}
          />
        </div>
      )}

      <div className="btn-grp">
        {editMode ? (
          <button className="btn save-btn" onClick={handleSave}>
            save
          </button>
        ) : (
          <button className="btn edit-btn" onClick={() => seteditMode(true)}>
            Edit profile
          </button>
        )}

        {editMode && (
          <div className="go-back" onClick={() => seteditMode(false)}>
            {'Back <-'}
          </div>
        )}
      </div>
    </div>
  );
};

function mapstateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapstateToProps)(Setting);
