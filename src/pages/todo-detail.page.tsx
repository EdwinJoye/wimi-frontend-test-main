import { Badge, Card, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoCalendar, IoPencil, IoTime, IoTrash } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "~/components/buttons/primary.button";

import CenteredLoader from "~/components/loaders/centered-loader";
import openDeleteModal from "~/components/modals/delete.modal";
import { useDeleteTodo, useTodoById } from "~/features/todo/todo.hooks";
import { useUserStore } from "~/features/user/user.store";
import PageLayout from "~/layouts/page.layout";
import { getPriorityColor } from "~/utils/colors.utils";

const TodoDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { todoListId, todoId } = useParams();
  const currentUser = useUserStore((state) => state.currentUser);
  const { data: todo, isLoading } = useTodoById(Number(todoId));
  const { mutate: deleteTodo } = useDeleteTodo();

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
        <Text c="red">Tâche non trouvée</Text>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Group justify="end" mb="xl">
        <PrimaryButton
          color="red"
          leftIcon={IoTrash}
          variant="light"
          label="actions.delete"
          onClick={handleDelete}
        />
        <PrimaryButton
          leftIcon={IoPencil}
          label="actions.edit"
          onClick={handleEdit}
        />
      </Group>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card shadow="md" padding="xl" radius="lg" withBorder>
          <Stack gap="lg">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs" style={{ flex: 1 }}>
                <Title
                  order={2}
                  td={todo.completed ? "line-through" : undefined}
                >
                  {todo.title}
                </Title>
                <Badge
                  color={getPriorityColor(todo.priority)}
                  variant="light"
                  size="lg"
                >
                  {todo.priority}
                </Badge>
              </Stack>
              <Badge
                size="xl"
                color={todo.completed ? "green" : "gray"}
                variant="light"
              >
                {todo.completed ? t("labels.completed") : t("labels.pending")}
              </Badge>
            </Group>

            <Divider />

            <Stack gap="md">
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
          </Stack>
        </Card>
      </motion.div>
    </PageLayout>
  );
};

export default TodoDetailPage;
