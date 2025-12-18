import { API_URL } from "~/configs/api.config";
import type { User } from "~/features/user/user.types";
import type { LoginCredentials } from "./auth.types";

export const loginService = async (
  credentials: LoginCredentials
): Promise<User> => {
  const response = await fetch(
    `${API_URL}/users?email=${credentials.email}&password=${credentials.password}`
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = users[0];

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    avatar: user.avatar,
  };
};
