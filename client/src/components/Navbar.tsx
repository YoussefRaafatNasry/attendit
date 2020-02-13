import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => (
  <nav className="main-nav">
    <h2 className="main-nav__brand">
      <NavLink to="/">attendit</NavLink>
    </h2>
    <ul className="main-nav__links">
      <li className="main-nav__link-item">
        <NavLink to="/auth">Authenticate</NavLink>
      </li>
      <li className="main-nav__link-item">
        <NavLink to="/events">Events</NavLink>
      </li>
      <li className="main-nav__link-item">
        <NavLink to="/bookings">Bookings</NavLink>
      </li>
    </ul>
  </nav>
);
