export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  todoListId: number;
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
}

export interface TodoInput {
  title: string;
  description: string;
  todoListId: number;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export type TodoFilter = "all" | "completed" | "pending";
export type TodoSortOption = "dueDate" | "priority" | "title";
