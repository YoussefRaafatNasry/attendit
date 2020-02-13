import React, { Component } from "react";

export default class AuthPage extends Component {
  render() {
    return (
      <form className="auth-form">
        <h2>attendit</h2>
        <p className="auth-form__header">
          Attendit let you explore and book events near you. Start now by
          creating an account or login if you already have one.
        </p>
        <input
          className="auth-form__input"
          id="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="auth-form__input"
          id="password"
          type="password"
          placeholder="Password"
        />

        <div className="auth-form__buttons">
          <button>Login</button>
          <button>Register</button>
        </div>
      </form>
    );
  }
}
