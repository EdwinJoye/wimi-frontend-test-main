import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Menu,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  IoCalendar,
  IoEllipsisVertical,
  IoEye,
  IoPencil,
  IoTrash,
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

import {
  useDeleteTodo,
  useToggleTodoCompleted,
} from "~/features/todo/todo.hooks";
import type { Todo } from "~/features/todo/todo.types";
import { useUserStore } from "~/features/user/user.store";
import { getPriorityColor } from "~/utils/colors.utils";
import openDeleteModal from "../modals/delete.modal";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { todoListId } = useParams();
  const currentUser = useUserStore((state) => state.currentUser);
  const { mutate: toggleCompleted } = useToggleTodoCompleted();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompleted({ todoId: todo.id, completed: !todo.completed });
  };

  const handleViewDetails = () => {
    navigate(
      `/user/${currentUser?.id}/todo-lists/${todoListId}/todos/${todo.id}`
    );
  };

  const handleEdit = () => {
    navigate(
      `/user/${currentUser?.id}/todo-lists/${todoListId}/todos/${todo.id}/edit`
    );
  };

  const handleDelete = () => {
    openDeleteModal({
      t,
      onConfirm: () => deleteTodo(todo.id),
    });
  };

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      h={200}
      className="transition-all duration-200 hover:shadow-lg"
      style={{
        backgroundColor: todo.completed ? "rgba(0, 0, 0, 0.1)" : undefined,
      }}
    >
      <Stack
        gap="sm"
        h="100%"
        justify="space-between"
        style={{ opacity: todo.completed ? 0.6 : 1 }}
      >
        <Group justify="space-between" align="flex-start">
          <Stack gap={4} style={{ flex: 1 }}>
            <Text
              fw={600}
              size="lg"
              td={todo.completed ? "line-through" : undefined}
              lineClamp={1}
            >
              {todo.title}
            </Text>
            <Text
              size="sm"
              c="dimmed"
              lineClamp={2}
              td={todo.completed ? "line-through" : undefined}
            >
              {todo.description}
            </Text>
          </Stack>
          <Group gap="xs" style={{ opacity: 1 }}>
            <Badge
              color={getPriorityColor(todo.priority)}
              variant="light"
              size="sm"
            >
              {todo.priority}
            </Badge>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray" size="sm">
                  <IoEllipsisVertical size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IoEye size={16} />}
                  onClick={handleViewDetails}
                >
                  {t("actions.view_details")}
                </Menu.Item>
                <Menu.Item
                  color="blue"
                  leftSection={<IoPencil size={16} />}
                  onClick={handleEdit}
                >
                  {t("actions.edit")}
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IoTrash size={16} />}
                  onClick={handleDelete}
                >
                  {t("actions.delete")}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <IoCalendar size={14} />
            <Text size="xs" c="dimmed">
              {new Date(todo.dueDate).toLocaleDateString()}
            </Text>
          </Group>
          <Switch
            checked={todo.completed}
            onClick={handleToggle}
            size="sm"
            style={{ opacity: 1 }}
          />
        </Group>
      </Stack>
    </Card>
  );
};

export default TodoCard;
