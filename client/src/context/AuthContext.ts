import React from "react";

export interface IAuthContext {
  token: string | null;
}

export default React.createContext<IAuthContext>({
  token: null
});
