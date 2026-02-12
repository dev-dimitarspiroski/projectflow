import { ReactNode, useReducer } from "react";
import { User } from "../auth.types";
import { AuthContext } from "../authContext";
import { authInitialState, authReducer } from "../auth.reducer";
import { AuthActionTypes } from "../../../enums/actions.enum";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    authReducer,
    authInitialState,
    (initial) => {
      const storedUser = localStorage.getItem("pf_user");
      if (storedUser) {
        const user: User = JSON.parse(storedUser);

        return {
          ...initial,
          user,
          isAuthenticated: true,
        };
      }

      return initial;
    },
  );

  const login = (user: User) => {
    localStorage.setItem("pf_user", JSON.stringify(user));

    dispatch({
      type: AuthActionTypes.login,
      payload: user,
    });
  };

  const logout = () => {
    localStorage.removeItem("pf_user");

    dispatch({ type: AuthActionTypes.logout });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
