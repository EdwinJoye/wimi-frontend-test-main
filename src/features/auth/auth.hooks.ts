import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginService } from "./auth.services";
import type { LoginCredentials } from "./auth.types";
import type { User } from "~/features/user/user.types";
import showNotification from "~/utils/show-notification.utils";
import { useAuthStore } from "~/features/auth/auth.store";
import { useUserStore } from "../user/user.store";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  return useMutation<User, Error, LoginCredentials>({
    mutationFn: loginService,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
      setIsAuthenticated(true);
      setCurrentUser(data);

      showNotification({
        title: "Connexion réussie",
        message: `Bienvenue ${data.firstName} !`,
        color: "green",
      });

      navigate("/");
    },
    onError: (error: Error) => {
      setIsAuthenticated(false);
      setCurrentUser(null);

      showNotification({
        title: "Erreur de connexion",
        message: error.message || "Impossible de se connecter.",
        color: "red",
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
      setIsAuthenticated(false);
      setCurrentUser(null);

      showNotification({
        title: "Déconnexion réussie",
        message: "À bientôt !",
        color: "blue",
      });
    },
  });
};
