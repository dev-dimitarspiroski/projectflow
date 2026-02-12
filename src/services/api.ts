import { BASE_URL } from "../consts/api.const";
import { User, LoginPayload } from "../interfaces/api.interface";

export const apiFetch = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};

export const loginApi = async ({
  email,
  password,
}: LoginPayload): Promise<User> => {
  const res = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(email)}`,
  );

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const users = (await res.json()) as User[];
  const user = users[0];

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  return { id: user.id, email: user.email, password: user.password };
};
