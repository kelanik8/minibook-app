/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

const Header = props => (
  <nav
    className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg"
    color-on-scroll="100"
  >
    <div className="container">
      <div className="navbar-translate">
        <Link className="navbar-brand" to="/">
          MiniBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {props.currentUser ? (
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
          ) : (
            ""
          )}
          {props.currentUser ? (
            <li className="nav-item">
              <Link to="/edit-profile" className="nav-link">
                Edit Profile
              </Link>
            </li>
          ) : (
            ""
          )}
          {!props.currentUser ? (
            <li className="nav-item">
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <a onClick={props.signOut} className="nav-link">
                Sign Out
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);
