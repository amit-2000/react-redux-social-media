import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import { APIUrls } from '../helper/urls';
import { getToken } from '../helper/utils';
import { AddFriendSuccess, removeFriendSuccessfully } from '../actions/friends';
import { clearAuthState } from '../actions/auth';
const UserProfile = (props) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { match } = props;

    if (match.params.userId) {
      // dispatch an action
      props.dispatch(fetchUserProfile(match.params.userId));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSuccess(null);
    }, 3000);
    return () => clearInterval(interval);
  }, [success]);

  const chechIfUserIsFriend = () => {
    // console.log('this.props', this.props);
    const { match, friends } = props;
    const userId = match.params.userId;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleAddFriend = async () => {
    const userId = props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    // console.log('data', data);
    if (data.success) {
      setSuccess(data.message);
      props.dispatch(AddFriendSuccess(data.data.friendship));
    } else {
      // this.setState({
      //   success: null,
      //   error: data.message,
      // });
      setSuccess(null);
      setError(null);
      return;
    }
  };

  const handleRemoveFriend = async () => {
    const userId = props.match.params.userId;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    // console.log('Friend remove Action response', data);

    if (data.success) {
      // console.log('if remove success', data);
      // this.setState({
      //   success: data.message,
      // });
      setSuccess(data.message);
      props.dispatch(removeFriendSuccessfully(userId));
    } else {
      setError(null);
      setSuccess(null);
    }
  };

  // console.log('this.props.friend', this.props.friend);
  const { user, inProgress } = props.profile;
  if (inProgress) {
    return (
      <div className="settingsLoader">
        <CircularProgress color="error" />
      </div>
    );
  }
  const isUserIsFriend = chechIfUserIsFriend();
  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt="user-dp"
        />
      </div>

      <div className="field">
        <div className="field-label">Name</div>
        <div className="field-value">{user.name}</div>
      </div>

      <div className="field">
        <div className="field-label">Email</div>
        <div className="field-value">{user.email}</div>
      </div>

      <div className="btn-grp">
        {!isUserIsFriend ? (
          <button className="button save-btn" onClick={handleAddFriend}>
            Add Friend
          </button>
        ) : (
          <button className="button save-btn" onClick={handleRemoveFriend}>
            remove Friend
          </button>
        )}
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </div>
  );
};

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
