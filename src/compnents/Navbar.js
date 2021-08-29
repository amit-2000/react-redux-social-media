import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="nav">
          <div className="left-nav">
            <img src="" alt="logo" />
          </div>
          <div className="search-container">
            <input type="text" placeholder="search" />
            <div className="search-results">
              <ul>
                <li className="search-results-row">
                  <img src="" alt="avatar" />
                  <span>John Doe</span>
                </li>
                <li className="search-results-row">
                  <img src="" alt="avatar" />
                  <span>John Doe</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-nav">
            <div className="user">
              <img src="" alt="user" />
              <span>Jenny..</span>
            </div>
            <div className="nav-links">
              <ul>
                <li>log in</li>
                <li>log out</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapstateToProps() {
  return {
    name: 'amit',
  };
}

export default connect(mapstateToProps)(Navbar);
