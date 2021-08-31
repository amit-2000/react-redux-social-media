import React from 'react';
// connect to store.
import { fetchpost } from '../actions/post';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Navbar, Home, Page404, Login, Signup } from './';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchpost());
  }

  render() {
    // console.log('this.props.posts', this.props);
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                // this is how we pass props in route.
                return <Home posts={posts} {...props} />;
              }}
            ></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route component={Page404}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapstateToProps({ posts }) {
  return {
    posts: posts,
  };
}
App.propTypes = {
  posts: propTypes.array.isRequired,
};

export default connect(mapstateToProps)(App);
