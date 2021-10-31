import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostList } from './';
import FriendList from './FriendList';
const Home = (props) => {
  const { posts, friends } = props;

  return (
    <div className="home">
      <PostList posts={posts} />
      <FriendList friends={props.friends} />
    </div>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
