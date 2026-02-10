import { ReactNode, useReducer } from "react";
import { UserLogin } from "./auth.types";
import { AuthContext } from "./authContext";
import { authInitialState, authReducer } from "./auth.reducer";
import { AuthActionTypes } from "../../enums/actions.enum";
import { apiLogin } from "./auth.service";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const login = async (credentials: UserLogin) => {
    const user = await apiLogin({
      email: credentials.email,
      password: credentials.password,
    });

    dispatch({
      type: AuthActionTypes.login,
      payload: user,
    });
  };

  const logout = () => {
    dispatch({ type: AuthActionTypes.logout });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
