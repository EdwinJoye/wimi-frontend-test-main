import { API_URL } from "~/configs/api.config";
import type { TodoList } from "./todoList.types";

export const getTodoListsService = async (
  userId: number
): Promise<TodoList[]> => {
  const response = await fetch(`${API_URL}/todoLists?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch todo lists");
  }

  return response.json();
};
