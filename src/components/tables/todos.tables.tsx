import {
  ActionIcon,
  Badge,
  Box,
  Checkbox,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTodo,
  useToggleTodoCompleted,
} from "~/features/todo/todo.hooks";
import type { Todo } from "~/features/todo/todo.types";
import { useUserStore } from "~/features/user/user.store";
import { getPriorityColor } from "~/utils/colors.utils";
import openDeleteModal from "../modals/delete.modal";

interface TodosTableProps {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
}

export default function TodosTable({
  todos,
  isLoading,
  isError,
  error,
}: TodosTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { todoListId } = useParams();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: toggleCompleted } = useToggleTodoCompleted();
  const currentUser = useUserStore((state) => state.currentUser);
  const handleEdit = (todoId: number) => {
    navigate(
      `/user/${currentUser?.id}/todo-lists/${todoListId}/todos/${todoId}/edit`
    );
  };

  const handleDelete = (todoId: number) => {
    openDeleteModal({
      t,
      onConfirm: () => deleteTodo(todoId),
    });
  };

  const handleToggleComplete = (todoId: number, currentCompleted: boolean) => {
    toggleCompleted({ todoId, completed: !currentCompleted });
  };

  const handleSeeDetails = (todoId: number) => {
    navigate(
      `/user/${currentUser?.id}/todo-lists/${todoListId}/todos/${todoId}`
    );
  };

  return (
    <Paper>
      <Stack className="h-fit overflow-hidden">
        <Box pb={9}>
          {isError && (
            <Text c="red" size="sm">
              {error?.message || "Erreur lors du chargement"}
            </Text>
          )}
        </Box>
      </Stack>

      <Box className="relative h-[calc(100vh-230px)]">
        <ScrollArea className="h-full overflow-auto rounded-md">
          <Table>
            <Table.Thead className="sticky top-0 z-10 bg-gray-50 shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
              <Table.Tr>
                <Table.Th>{t("labels.status")}</Table.Th>
                <Table.Th>{t("labels.title")}</Table.Th>
                <Table.Th>{t("labels.description")}</Table.Th>
                <Table.Th>{t("labels.priority")}</Table.Th>
                <Table.Th>{t("labels.limited_date")}</Table.Th>
                <Table.Th>{t("labels.actions")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isLoading ? (
                <Table.Tr>
                  <Table.Td colSpan={6} className="text-center">
                    <Loader size="sm" />
                  </Table.Td>
                </Table.Tr>
              ) : todos.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={6} className="text-center text-gray-500">
                    {t("labels.no_todo")}
                  </Table.Td>
                </Table.Tr>
              ) : (
                todos
                  .slice()
                  .reverse()
                  .map((todo) => (
                    <Table.Tr key={todo.id}>
                      <Table.Td>
                        <Checkbox
                          className="cursor-pointer"
                          checked={todo.completed}
                          onChange={() =>
                            handleToggleComplete(todo.id, todo.completed)
                          }
                        />
                      </Table.Td>
                      <Table.Td>
                        <Text
                          fw={500}
                          td={todo.completed ? "line-through" : undefined}
                        >
                          {todo.title}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" lineClamp={2}>
                          {todo.description}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={getPriorityColor(todo.priority)}
                          variant="light"
                          size="sm"
                        >
                          {todo.priority}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          {new Date(todo.dueDate).toLocaleDateString()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip withArrow label="Voir les détails">
                            <ActionIcon
                              variant="subtle"
                              color="green"
                              aria-label="Voir"
                              onClick={() => handleSeeDetails(todo.id)}
                            >
                              <IoEye size={16} />
                            </ActionIcon>
                          </Tooltip>

                          <Tooltip withArrow label="Modifier">
                            <ActionIcon
                              variant="subtle"
                              color="blue"
                              onClick={() => handleEdit(todo.id)}
                              aria-label="Éditer"
                            >
                              <IoPencil size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip withArrow label="Supprimer">
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              onClick={() => handleDelete(todo.id)}
                              aria-label="Supprimer"
                            >
                              <IoTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    </Paper>
  );
}
