import { zodResolver } from "@hookform/resolvers/zod";
import { Group, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import type { Todo } from "~/features/todo/todo.types";
import PrimaryButton from "../buttons/primary.button";

const todoSchema = z.object({
  title: z.string().min(3, "Titre trop court"),
  description: z.string().min(10, "Description trop courte"),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string(),
  todoListId: z.number(),
});

type TodoFormData = z.infer<typeof todoSchema>;

interface TodoFormProps {
  todoId?: number;
  todoListId: number;
  initialData?: Todo;
  onSubmit: (data: TodoFormData) => void;
  isSubmitting?: boolean;
}

const TodoForm = ({
  todoId,
  todoListId,
  initialData,
  onSubmit,
  isSubmitting = false,
}: TodoFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todoListId,
      priority: "medium",
      title: "",
      description: "",
      dueDate: "",
    },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        dueDate: initialData.dueDate,
        todoListId: initialData.todoListId,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Titre"
          placeholder="Titre de la tâche"
          {...register("title")}
          error={errors.title?.message}
        />

        <Textarea
          label="Description"
          placeholder="Description de la tâche"
          rows={4}
          {...register("description")}
          error={errors.description?.message}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              label="Priorité"
              data={[
                { value: "low", label: "Basse" },
                { value: "medium", label: "Moyenne" },
                { value: "high", label: "Haute" },
              ]}
              {...field}
              error={errors.priority?.message}
            />
          )}
        />

        <TextInput
          label="Date limite"
          type="date"
          {...register("dueDate")}
          error={errors.dueDate?.message}
        />
        <Group justify="center">
          <PrimaryButton
            label={t("actions.cancel")}
            type="button"
            variant="light"
            loading={isSubmitting}
            onClick={handleGoBack}
          />

          <PrimaryButton
            label={todoId ? t("actions.edit") : t("actions.create")}
            type="submit"
            loading={isSubmitting}
          />
        </Group>
      </Stack>
    </form>
  );
};

export default TodoForm;
