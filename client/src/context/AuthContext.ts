import React from "react";

export interface IAuthContext {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export default React.createContext<IAuthContext>({
  token: null,
  login: () => {},
  logout: () => {}
});
