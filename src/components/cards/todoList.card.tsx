import { Badge, Group, Stack, Text } from "@mantine/core";
import { IoCalendar, IoFolderOpen } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useTodosByListId } from "~/features/todo/todo.hooks";
import type { TodoList } from "~/features/todoList/todoList.types";
import TextLoader from "../loaders/text-loader";
import { useTranslation } from "react-i18next";

interface TodoListCardProps {
  todoList: TodoList;
}

const TodoListCard = ({ todoList }: TodoListCardProps) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: todos, isLoading } = useTodosByListId(todoList.id);

  const handleClick = () => {
    navigate(`/user/${userId}/todo-lists/${todoList.id}/todos`);
  };

  const todosCount = todos?.length || 0;

  return (
    <Group
      p="md"
      className="cursor-pointer rounded-lg border-l-4 transition-all duration-200 hover:shadow-lg"
      style={{
        borderLeftColor: todoList.color,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(10px)",
      }}
      onClick={handleClick}
      align="flex-start"
      justify="space-between"
    >
      <Group align="flex-start">
        <IoFolderOpen size={24} color={todoList.color} />
        <Stack gap={4}>
          <Text fw={600} size="lg">
            {todoList.title}
          </Text>
          <Group gap="xs">
            <IoCalendar size={14} />
            <Text size="xs" c="dimmed">
              {t("labels.create_at")}
              {new Date(todoList.createdAt).toLocaleDateString()}
            </Text>
          </Group>
          <Text size="xs" c="dimmed">
            {isLoading ? (
              <TextLoader minHeight={0} centered={false} />
            ) : (
              `${todosCount} tâche${todosCount > 1 ? "s" : ""}`
            )}
          </Text>
        </Stack>
      </Group>
      <Badge
        size="sm"
        variant="dot"
        style={{
          backgroundColor: `${todoList.color}20`,
          color: todoList.color,
        }}
      >
        ID: {todoList.id}
      </Badge>
    </Group>
  );
};

export default TodoListCard;
