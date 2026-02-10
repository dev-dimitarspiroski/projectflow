import { AuthActionTypes } from "../../enums/actions.enum";
import { AuthState, User } from "./auth.types";

export type AuthAction =
  | { type: AuthActionTypes.login; payload: User }
  | { type: AuthActionTypes.logout };

export const authInitialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.login:
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case AuthActionTypes.logout:
      return authInitialState;

    default:
      return state;
  }
};
