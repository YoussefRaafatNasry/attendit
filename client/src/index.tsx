import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import EventsPage from "./pages/EventsPage";
import BookingsPage from "./pages/BookingsPage";
import { NavBar } from "./components/Navbar";

import AuthContext, { IAuthContext } from "./context/AuthContext";

import "./styles/main.scss";

interface IState {
  token: string | null;
}

class App extends React.Component<{}, IState> {
  public state: IState = {
    token: null
  };

  get contextValue(): IAuthContext {
    return {
      token: this.state.token,
      login: token => this.setState({ token }),
      logout: () => this.setState({ token: null })
    };
  }

  render() {
    const isAuth = this.state.token;
    return (
      <BrowserRouter>
        <AuthContext.Provider value={this.contextValue}>
          <NavBar />
          <main>
            <Switch>
              <Route exact path="/" component={BookingsPage}>
                <Redirect to={isAuth ? "/events" : "/auth"} />
              </Route>
              <Route path="/auth" component={AuthPage}>
                {isAuth && <Redirect to="/events" />}
              </Route>
              <Route path="/events" component={EventsPage} />
              {isAuth && <Route path="/bookings" component={BookingsPage} />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
