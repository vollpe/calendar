import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-1 overflow-x-hidden">
      <a href="/" className="brand-link bg-info pl-5">
        <span className="white-space-wrap brand-text font-weight-bold">Home&nbsp;Inventory Management</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                <i className="nav-icon fa fa-user" />
                <p>
                  My Profile
                </p>
              </NavLink>
            </li>

            <div className="sidebar-divider" />

            <li className="nav-item">
              <NavLink to="/assignments" className="nav-link">
                <i className="nav-icon fa fa-list" />
                <p>
                  Assigned Requests
                </p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/calendar" className="nav-link">
                <i className="nav-icon fa fa-calendar" />
                <p>
                  My Availability Calendar
                </p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/visits" className="nav-link">
                <i className="nav-icon fa fa-bus" />
                <p>
                  My Visits For A Day
                </p>
              </NavLink>
            </li>

            <div className="sidebar-divider" />

            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                <i className="nav-icon fa fa-dashboard" />
                <p>
                  Dashboard
                </p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/technicians" className="nav-link">
                <i className="nav-icon fa fa-users" />
                <p>
                  Technicians List
                </p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/requests" className="nav-link">
                <i className="nav-icon fa fa-bomb" />
                <p>
                  Requests List
                </p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                <i className="nav-icon fa fa-users" />
                <p>
                  Users List
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
