import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import showNotification from "~/utils/show-notification.utils";
import {
  createTodoService,
  deleteTodoService,
  getAllTodosService,
  getTodoByIdService,
  getTodosByListIdService,
  toggleTodoCompletedService,
  updateTodoService,
} from "./todo.services";
import type { TodoInput } from "./todo.types";

export const useAllTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodosService,
  });
};

export const useTodosByListId = (todoListId: number) => {
  return useQuery({
    queryKey: ["todos", todoListId],
    queryFn: () => getTodosByListIdService(todoListId),
    enabled: !!todoListId,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodoService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      showNotification({
        title: "Tâche créée",
        message: "La tâche a été créée avec succès",
        color: "green",
      });
    },
    onError: () => {
      showNotification({
        title: "Erreur",
        message: "Impossible de créer la tâche",
        color: "red",
      });
    },
  });
};

export const useTodoById = (todoId: number) => {
  return useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => getTodoByIdService(todoId),
    enabled: !!todoId,
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, data }: { todoId: number; data: TodoInput }) =>
      updateTodoService(todoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      showNotification({
        title: "Tâche modifiée",
        message: "La tâche a été modifiée avec succès",
        color: "green",
      });
    },
    onError: () => {
      showNotification({
        title: "Erreur",
        message: "Impossible de modifier la tâche",
        color: "red",
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      showNotification({
        title: "Tâche supprimée",
        message: "La tâche a été supprimée avec succès",
        color: "green",
      });
    },
    onError: () => {
      showNotification({
        title: "Erreur",
        message: "Impossible de supprimer la tâche",
        color: "red",
      });
    },
  });
};

export const useToggleTodoCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todoId,
      completed,
    }: {
      todoId: number;
      completed: boolean;
    }) => toggleTodoCompletedService(todoId, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
