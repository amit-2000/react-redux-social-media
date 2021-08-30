import React from 'react';
// connect to store.
import { fetchpost } from '../actions/post';
import { connect } from 'react-redux';
import { PostList, Navbar } from './';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Temp from './Temp';

const Login = () => <div>Login</div>;

const Signup = () => <div>Signup</div>;
const Home = () => <div>Signup</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchpost());
  }

  render() {
    // console.log('this.props.posts', this.props);
    const { posts } = this.props;
    return (
      <div>
        <Router>
          <Navbar />
            <ul>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/logout">Log out</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          <Route path="/" exact>
            <PostList posts={posts} />
          </Route>
          <Route path="/home" exact>
            <Temp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <Signup />
          </Route>
        </Router>
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
