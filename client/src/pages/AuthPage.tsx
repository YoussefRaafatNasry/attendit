import React, { Component, MouseEvent } from "react";

import { request } from "../util/GraphQlRequest";

interface IProps {
  authenticateHandler: (token: string) => void
}

export default class AuthPage extends Component<IProps> {
  private emailRef: React.RefObject<HTMLInputElement> = React.createRef();
  private passwordRef: React.RefObject<HTMLInputElement> = React.createRef();

  get email() {
    return this.emailRef.current?.value;
  }

  get password() {
    return this.passwordRef.current?.value;
  }

  loginHandler = (event: MouseEvent) => {
    event.preventDefault();

    const query = `
      query {
        login(email: "${this.email}", password: "${this.password}") {
          token
        }
      }
    `;

    this.authenticate(query);
  };

  registerHandler = (event: MouseEvent) => {
    event.preventDefault();

    const query = `
      mutation {
        register(email: "${this.email}", password: "${this.password}") {
          _id
          email
        }
      }
    `;

    this.authenticate(query);
  };

  authenticate = (query: string) => {
    // TODO: Validate Email and password
    request(query).then(res => {
      // TODO: Handle register case
      const token = res.data.login?.token;
      this.props.authenticateHandler(token);
    });
  };

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
          ref={this.emailRef}
        />
        <input
          className="auth-form__input"
          id="password"
          type="password"
          placeholder="Password"
          ref={this.passwordRef}
        />

        <div className="auth-form__buttons">
          <button onClick={this.loginHandler}>Login</button>
          <button onClick={this.registerHandler}>Register</button>
        </div>
      </form>
    );
  }
}
