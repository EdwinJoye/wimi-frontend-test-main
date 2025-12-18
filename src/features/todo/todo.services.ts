import { API_URL } from "~/configs/api.config";
import type { Todo, TodoInput } from "./todo.types";

export const getAllTodosService = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

export const getTodosByListIdService = async (
  todoListId: number
): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos?todoListId=${todoListId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

export const createTodoService = async (
  todo: Omit<Todo, "id" | "createdAt" | "completed">
): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...todo,
      completed: false,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
};

export const getTodoByIdService = async (todoId: number): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${todoId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }

  return response.json();
};

export const updateTodoService = async (
  todoId: number,
  data: TodoInput
): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const deleteTodoService = async (todoId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${todoId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

export const toggleTodoCompletedService = async (
  todoId: number,
  completed: boolean
): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to toggle todo");
  }

  return response.json();
};
