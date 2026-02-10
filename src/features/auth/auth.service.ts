import { User, UserLogin } from "./auth.types";

export const apiLogin = async (data: UserLogin): Promise<User> => {
  return {
    id: 1,
    email: data.email,
  };
};
