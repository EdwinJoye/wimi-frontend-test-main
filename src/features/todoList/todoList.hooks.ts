import { useQuery } from "@tanstack/react-query";
import { getTodoListsService } from "./todoList.services";

export const useTodoLists = (userId: number) => {
  return useQuery({
    queryKey: ["todoLists", userId],
    queryFn: () => getTodoListsService(userId),
    enabled: !!userId,
  });
};

export const useTodoListById = (userId: number, todoListId: number) => {
  const { data: todoLists, ...rest } = useTodoLists(userId);
  const todoList = todoLists?.find((list) => list.id === todoListId);

  return {
    data: todoList,
    ...rest,
  };
};
