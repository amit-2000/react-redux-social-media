import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import CircularProgress from '@mui/material/CircularProgress';
class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }
  chechIfUserIsFriend = () => {
    console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  render() {
    console.log(this.props.friend);
    const { user, inProgress } = this.props.profile;
    if (inProgress) {
      return (
        <div className="settingsLoader">
          <CircularProgress color="error" />
        </div>
      );
    }
    const isUserIsFriend = this.chechIfUserIsFriend();
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
            <button className="button save-btn">Add Friend</button>
          ) : (
            <button className="button save-btn">remove Friend</button>
          )}
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
