import { BASE_URL } from "../consts/api.const";

export const apiFetch = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};
