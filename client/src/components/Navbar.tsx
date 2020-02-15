import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../context/AuthContext";

interface IProps {
  logoutHandler: () => void;
}

export class NavBar extends React.Component<IProps> {
  render() {
    return (
      <nav className="main-nav">
        <h2 className="main-nav__brand">
          <NavLink to="/">attendit</NavLink>
        </h2>
        <AuthContext.Consumer>
          {context => (
            <ul className="main-nav__links">
              <li className="main-nav__link-item">
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.token ? (
                <React.Fragment>
                  <li className="main-nav__link-item">
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li className="main-nav__link-item">
                    <NavLink to="/auth" onClick={this.props.logoutHandler}>
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              ) : (
                <li className="main-nav__link-item">
                  <NavLink to="/auth">Authenticate</NavLink>
                </li>
              )}
            </ul>
          )}
        </AuthContext.Consumer>
      </nav>
    );
  }
}
