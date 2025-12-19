import {
  Badge,
  Card,
  Divider,
  Group,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoCalendar, IoPencil, IoTime, IoTrash } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "~/components/buttons/primary.button";
import CenteredLoader from "~/components/loaders/centered-loader";
import openDeleteModal from "~/components/modals/delete.modal";
import {
  useDeleteTodo,
  useTodoById,
  useToggleTodoCompleted,
} from "~/features/todo/todo.hooks";
import { useUserStore } from "~/features/user/user.store";
import PageLayout from "~/layouts/page.layout";
import { getPriorityColor } from "~/utils/colors.utils";

const TodoDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { todoListId, todoId } = useParams();
  const currentUser = useUserStore((state) => state.currentUser);
  const { data: todo, isLoading } = useTodoById(Number(todoId));
  const { mutate: toggleCompleted } = useToggleTodoCompleted();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleToggle = () => {
    if (todo) {
      toggleCompleted({
        todoId: todo.id,
        completed: !todo.completed,
      });
    }
  };

  const handleEdit = () => {
    navigate(
      `/user/${currentUser?.id}/todo-lists/${todoListId}/todos/${todoId}/edit`
    );
  };

  const handleDelete = () => {
    openDeleteModal({
      t,
      onConfirm: () => {
        deleteTodo(Number(todoId));
        navigate(`/user/${currentUser?.id}/todo-lists/${todoListId}/todos`);
      },
    });
  };

  if (isLoading) {
    return (
      <PageLayout>
        <CenteredLoader />
      </PageLayout>
    );
  }

  if (!todo) {
    return (
      <PageLayout>
        <Text c="red">{t("texts.todo_not_found")}</Text>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card shadow="md" padding="xl" radius="lg" withBorder>
          <Stack gap="lg">
            <Group justify="space-between" align="center">
              <Switch
                checked={todo.completed}
                onChange={handleToggle}
                size="md"
                label={
                  todo.completed ? t("labels.completed") : t("labels.pending")
                }
              />
              <Group>
                <PrimaryButton
                  color="red"
                  leftIcon={IoTrash}
                  variant="light"
                  label={t("actions.delete")}
                  onClick={handleDelete}
                />
                <PrimaryButton
                  leftIcon={IoPencil}
                  label={t("actions.edit")}
                  onClick={handleEdit}
                />
              </Group>
            </Group>

            <Divider />

            <Stack gap="xs">
              <Title order={2} td={todo.completed ? "line-through" : undefined}>
                {todo.title}
              </Title>
              <Badge
                color={getPriorityColor(todo.priority)}
                variant="light"
                size="lg"
                w="fit-content"
              >
                {todo.priority}
              </Badge>
            </Stack>

            <div>
              <Text size="sm" c="dimmed" fw={500} mb="xs">
                {t("labels.description")}
              </Text>
              <Text>{todo.description}</Text>
            </div>

            <Group>
              <Group gap="xs">
                <IoCalendar size={18} />
                <div>
                  <Text size="sm" c="dimmed" fw={500}>
                    {t("labels.due_date")}
                  </Text>
                  <Text size="sm">
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </Text>
                </div>
              </Group>

              <Group gap="xs">
                <IoTime size={18} />
                <div>
                  <Text size="sm" c="dimmed" fw={500}>
                    {t("labels.created_at")}
                  </Text>
                  <Text size="sm">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </Text>
                </div>
              </Group>
            </Group>
          </Stack>
        </Card>
      </motion.div>
    </PageLayout>
  );
};

export default TodoDetailPage;
