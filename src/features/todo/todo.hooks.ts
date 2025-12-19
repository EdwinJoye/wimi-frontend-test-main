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
        titleKey: "notifs.success.titles.todo_creation",
        messageKey: "notifs.success.messages.todo_creation",
        color: "green",
      });
    },
    onError: () => {
      showNotification({
        titleKey: "notifs.errors.titles.todo_creation",
        messageKey: "notifs.errors.messages.todo_creation",
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
        titleKey: "notifs.errors.titles.todo_edition",
        messageKey: "notifs.errors.messages.todo_edition",
        color: "green",
      });
    },
    onError: () => {
      showNotification({
        titleKey: "notifs.errors.titles.todo_edition",
        messageKey: "notifs.errors.messages.todo_edition",
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
        titleKey: "notifs.success.titles.todo_deletion",
        messageKey: "notifs.success.messages.todo_deletion",
        color: "green",
      });
    },
    onError: () => {
      showNotification({
        titleKey: "notifs.errors.titles.todo_deletion",
        messageKey: "notifs.errors.messages.todo_deletion",
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
    onSuccess: (_, { todoId }) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });
};
