import { Container, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "~/components/forms/todo.form";
import {
  useCreateTodo,
  useTodoById,
  useUpdateTodo,
} from "~/features/todo/todo.hooks";
import type { TodoInput } from "~/features/todo/todo.types";
import { useUserStore } from "~/features/user/user.store";
import PageLayout from "~/layouts/page.layout";

const TodoFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { todoListId, todoId } = useParams<{
    todoListId: string;
    todoId?: string;
  }>();
  const currentUser = useUserStore((state) => state.currentUser);
  const { data: currentTodo } = useTodoById(todoId ? Number(todoId) : 0);
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();

  const handleCreateTodo = async (data: TodoInput) => {
    createTodo(data, {
      onSuccess: () => {
        navigate(`/user/${currentUser?.id}/todo-lists/${todoListId}/todos`);
      },
    });
  };

  const handleEditTodo = async (data: TodoInput) => {
    if (!todoId) return;

    updateTodo(
      { todoId: Number(todoId), data },
      {
        onSuccess: () => {
          navigate(`/user/${currentUser?.id}/todo-lists/${todoListId}/todos`);
        },
      }
    );
  };

  const handleSubmit = async (data: TodoInput) => {
    if (todoId) {
      await handleEditTodo(data);
    } else {
      await handleCreateTodo(data);
    }
  };

  return (
    <PageLayout>
      <Title order={1} size="h2" mb="xs" className="text-center">
        {todoId ? t("titles.edit_todo") : t("titles.create_todo")}
      </Title>
      <Container size={700}>
        <TodoForm
          todoId={todoId ? Number(todoId) : undefined}
          todoListId={Number(todoListId)}
          initialData={currentTodo}
          onSubmit={handleSubmit}
          isSubmitting={isCreating || isUpdating}
        />
      </Container>
    </PageLayout>
  );
};

export default TodoFormPage;
