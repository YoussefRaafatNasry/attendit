import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import EventsPage from "./pages/EventsPage";
import BookingsPage from "./pages/BookingsPage";

import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import AuthContext, { IAuthContext } from "./context/AuthContext";

import "./styles/main.scss";

export class App extends React.Component<{}, IAuthContext> {
  public state: IAuthContext = {
    token: null
  };

  authenticateHandler = (token: string) => this.setState({ token });
  logoutHandler = () => this.setState({ token: null });

  render() {
    const isAuth = this.state.token;
    return (
      <BrowserRouter>
        <AuthContext.Provider value={this.state}>
          <NavBar logoutHandler={this.logoutHandler} />
          <main>
            <Switch>
              <Route exact path="/">
                <Redirect to={isAuth ? "/events" : "/auth"} />
              </Route>
              <Route path="/auth">
                {isAuth ? (
                  <Redirect to="/events" />
                ) : (
                  <AuthPage authenticateHandler={this.authenticateHandler} />
                )}
              </Route>
              <Route path="/events" component={EventsPage} />
              {isAuth && <Route path="/bookings" component={BookingsPage} />}
            </Switch>
          </main>
          <Footer />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}
