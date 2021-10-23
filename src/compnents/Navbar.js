import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Navbar extends Component {
  render() {
    const { isLoggedin } = this.props;
    console.log('isLoggedin', isLoggedin);
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
          <div className="user">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-dp"
              id="user-dp"
            />
            <span>John Doe</span>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                {isLoggedin ? '' : <Link to="/login"> Log in</Link>}
                {/* <Link to="/login">Log in</Link> */}
              </li>
              <li>
                {isLoggedin ? <Link to="/signup"> Log out</Link> : ''}
                {/* <Link to="/logout">Log out</Link> */}
              </li>
              <li>
                {isLoggedin ? '' : <Link to="/signup"> Register</Link>}
                {/* <Link to="/logout"> Register</Link> */}
              </li>
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
