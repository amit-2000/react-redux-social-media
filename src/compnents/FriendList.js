import React from 'react';
import { connect } from 'react-redux';
import FriendListItem from './FriendListItem';

const FriendList = (props) => {
  // console.log(props.firends);
  // console.log('Friends in friendList', props.friends);
  
  return (
    <div className="friends-list">
      <div className="header">Friends </div>
      {/* {props.firends && props.firends.length === 0 && (
        <div className="no-friends">No friends found</div>
      )} */}
      {props.friends.map((friend, idx) => {
        // console.log('In friends map', friend.to_user.name);
        return <FriendListItem friend={friend.to_user} key={idx} />;
      })}
    </div>
  );
};

function mapStateToProps({ friends }) {
  return {
    friends,
  };
}

export default connect(mapStateToProps)(FriendList);
