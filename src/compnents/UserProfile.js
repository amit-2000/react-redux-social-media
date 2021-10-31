import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import { APIUrls } from '../helper/urls';
import { getToken } from '../helper/utils';
import { AddFriendSuccess, removeFriendSuccessfully } from '../actions/friends';
class UserProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      success: null,
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }
  chechIfUserIsFriend = () => {
    // console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  handleAddFriend = async () => {
    const userId = this.props.match.params.userId;
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
    console.log('data', data);

    if (data.success) {
      console.log(data);
      this.setState({
        success: data.message,
      });
      this.props.dispatch(AddFriendSuccess(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriend = async () => {
    const userId = this.props.match.params.userId;
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
    console.log('Friend remove Action response', data);

    if (data.success) {
      console.log('if remove success', data);
      this.setState({
        success: data.message,
      });
      this.props.dispatch(removeFriendSuccessfully(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    console.log('this.props.friend', this.props.friend);
    const { user, inProgress } = this.props.profile;
    if (inProgress) {
      return (
        <div className="settingsLoader">
          <CircularProgress color="error" />
        </div>
      );
    }
    const isUserIsFriend = this.chechIfUserIsFriend();
    const { success, error } = this.state;
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
            <button className="button save-btn" onClick={this.handleAddFriend}>
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriend}
            >
              remove Friend
            </button>
          )}
          {success && <Alert>{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
