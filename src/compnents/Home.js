import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostList } from './';
import FriendList from './FriendList';
class Home extends Component {
  render() {
    const { posts, friends } = this.props;


    return (
      <div className="home">
        <PostList posts={posts} />
        <FriendList friends={this.props.friends} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
