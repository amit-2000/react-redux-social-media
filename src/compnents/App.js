import React from 'react';
// connect to store.
import { fetchpost } from '../actions/post';
import { connect } from 'react-redux';
import { PostList, Navbar } from './';
import propTypes from 'prop-types';
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchpost());
  }

  render() {
    // console.log('this.props.posts', this.props);
    const { posts } = this.props;
    return (
      <div>
        <Navbar />
        <PostList posts={posts} />
      </div>
    );
  }
}

function mapstateToProps(state) {
  return {
    posts: state.posts,
  };
}
App.propTypes = {
  posts: propTypes.array.isRequired,
};

export default connect(mapstateToProps)(App);
