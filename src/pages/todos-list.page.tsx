import {
  Flex,
  Grid,
  Group,
  ScrollArea,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoAdd, IoGrid, IoList, IoSearch } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import IconSegmentedButton from "~/components/buttons/icon-segmented.button";
import PrimaryButton from "~/components/buttons/primary.button";
import TodoCard from "~/components/cards/todo.card";
import TodosTable from "~/components/tables/todos.tables";
import { useTodosByListId } from "~/features/todo/todo.hooks";
import type { TodoFilter, TodoSortOption } from "~/features/todo/todo.types";
import { useTodoListById } from "~/features/todoList/todoList.hooks";
import { useUserStore } from "~/features/user/user.store";
import PageLayout from "~/layouts/page.layout";
import { useUiStore } from "~/stores/ui.store";

const TodosListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { todoListId } = useParams<{ todoListId: string }>();
  const currentUser = useUserStore((state) => state.currentUser);
  const tasksViewMode = useUiStore((state) => state.tasksViewMode);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const setTasksViewMode = useUiStore((state) => state.setTasksViewMode);
  const [sortBy, setSortBy] = useState<TodoSortOption>("dueDate");
  const { data: currentList } = useTodoListById(
    currentUser?.id || 0,
    Number(todoListId)
  );

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useTodosByListId(Number(todoListId));

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    })
    .filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.title.localeCompare(b.title);
    });

  const handleCreateTodo = () => {
    navigate(`/user/${currentUser?.id}/todo-lists/${todoListId}/todos/new`);
  };

  return (
    <PageLayout>
      <Flex justify="space-between" align="center" mb="md">
        <Group align="end">
          <Title order={1} size="h2">
            {t("titles.tasks_list")} {t("labels.off_the_list")}
          </Title>
          <Text fw={500}>{currentList?.title}</Text>
          <Text size="sm" c="blue">
            ({todos.length} {t("labels.todos")}
            {todos.length > 1 ? "s" : ""})
          </Text>
        </Group>
        <Group>
          <SegmentedControl
            color="blue"
            value={tasksViewMode}
            onChange={(value) => setTasksViewMode(value as "card" | "table")}
            classNames={{
              root: "rounded-full!",
              indicator: "rounded-full!",
            }}
            styles={{
              label: {
                minWidth: "120px",
              },
            }}
            data={[
              {
                value: "card",
                label: (
                  <IconSegmentedButton
                    icon={IoGrid}
                    label={t("labels.cards")}
                  />
                ),
              },
              {
                value: "table",
                label: (
                  <IconSegmentedButton
                    icon={IoList}
                    label={t("labels.table")}
                  />
                ),
              },
            ]}
          />
          <PrimaryButton
            leftIcon={IoAdd}
            onClick={handleCreateTodo}
            label={t("actions.create_todo")}
          />
        </Group>
      </Flex>

      <Stack gap="md" mb="md">
        <Group>
          <TextInput
            style={{ flex: 0.5 }}
            placeholder={t("placeholders.search_tasks")}
            leftSection={<IoSearch size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            style={{ flex: 0.5 }}
            placeholder={t("actions.sort_by")}
            value={sortBy}
            onChange={(value) => setSortBy(value as TodoSortOption)}
            data={[
              { value: "dueDate", label: t("labels.due_date") },
              { value: "priority", label: t("labels.priority") },
              { value: "title", label: t("labels.title") },
            ]}
          />
          <SegmentedControl
            w={400}
            value={filter}
            style={{ flex: 1 }}
            onChange={(value) => setFilter(value as TodoFilter)}
            data={[
              { label: t("labels.all"), value: "all" },
              { label: t("labels.completed"), value: "completed" },
              { label: t("labels.pending"), value: "pending" },
            ]}
            classNames={{
              root: "rounded-full!",
              indicator: "rounded-full!",
            }}
          />
        </Group>
      </Stack>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ flex: 1, overflow: "hidden" }}
      >
        {tasksViewMode === "table" ? (
          <TodosTable
            todos={filteredAndSortedTodos}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        ) : (
          <ScrollArea h="calc(100vh - 240px)">
            <Grid gutter="md">
              {filteredAndSortedTodos.map((todo, index) => (
                <Grid.Col key={todo.id} span={{ base: 12, md: 6, lg: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <TodoCard todo={todo} />
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </ScrollArea>
        )}
      </motion.div>
    </PageLayout>
  );
};

export default TodosListPage;
