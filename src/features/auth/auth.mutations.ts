import { useMutation } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3001";

type RegisterPayload = {
  email: string;
  password: string;
};

type User = {
  id: number;
  email: string;
  password: string;
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const existingUser = await fetchExistingUser(payload.email);

      if (existingUser.length) {
        throw new Error("Email is already registered");
      }

      return registerUser(payload);
    },
  });
};

const fetchExistingUser = async (email: string): Promise<User[]> => {
  const res = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(email)}`,
  );
  if (!res.ok) throw new Error("Failed to validate email");
  return res.json();
};

const registerUser = async (payload: RegisterPayload): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
};
