import React from "react";
import { Link } from 'react-router-dom'
export default () => (
  <footer className="footer footer-default">
    <div className="container">
      <nav className="float-left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </nav>
      <div className="copyright float-right">
        © 2020 by <a href="https://github.com/kelanik8" target="_blank">Kelani Tolulope</a>
      </div>
    </div>
  </footer>
);
