/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

function Header() {
  return (
    <nav className="main-header navbar navbar-expand border-bottom navbar-dark bg-info p-2">

      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href=""><i className="fa fa-bars" /></a>
        </li>

      </ul>
      <ul className="navbar-nav ml-auto">
        <div className="user-panel d-flex">
          <div className="image">
            <img src="/img/avatar/user2-160x160.jpg" className="img-circle" alt="User" />
          </div>
          <div className="info">
            <a href="/profile" className="d-block">Alexander Pierce</a>
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Header;
