import React from 'react';
// connect to store.
import { fetchpost } from '../actions/post';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Navbar, Home, Page404, Login, Signup, Setting } from './';
// import * as jwtDecode from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import { persistUser } from '../actions/auth';

// Private Route Component
// component : Component => simply rename this component
const PrivateRoute = ({ path, component: Component, isLoggedin }) => {
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchpost());
    // localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    // console.log(token);
    // console.log('user token', token);
    if (token) {
      const user = jwt_decode(token);
      // console.log('user', user);
      this.props.dispatch(
        persistUser({
          email: user.email,
          password: user.password,
          name: user.name,
          _id: user._id,
        })
      );
    }
  }

  render() {
    // console.log('this.props.posts', this.props);
    const { posts, auth } = this.props;
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
            <PrivateRoute
              path="/settings"
              component={Setting}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapstateToProps({ posts, auth }) {
  return {
    posts: posts,
    auth,
  };
}
App.propTypes = {
  posts: propTypes.array.isRequired,
};

export default connect(mapstateToProps)(App);
