import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
class Navbar extends Component {
  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logout());
  };
  render() {
    const { isLoggedin, user } = this.props;
    // console.log('user.name', user.name);
    // console.log('isLoggedin', isLoggedin);
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" />

          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {isLoggedin && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{user.name}</span>
            </div>
          )}
          <div className="nav-links">
            <ul>
              {!isLoggedin && (
                <li>
                  <Link to="/login"> Log in</Link>
                </li>
              )}
              {isLoggedin && (
                <li onClick={this.handleLogout}>
                  <Link className="" to="/signup">
                    Log out
                  </Link>
                </li>
              )}
              {!isLoggedin && (
                <li>
                  <Link to="/signup"> Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapstateToProps({ auth }) {
  return {
    user: auth.user,
    isLoggedin: auth.isLoggedin,
  };
}

export default connect(mapstateToProps)(Navbar);
