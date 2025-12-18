import { Button, Container, Flex, Grid, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoAdd } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import TodoListCard from "~/components/cards/todoList.card";
import CenteredLoader from "~/components/loaders/centered-loader";
import { useTodoLists } from "~/features/todoList/todoList.hooks";
import PageLayout from "~/layouts/page.layout";

const TodoListsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: todoLists, isLoading, isError } = useTodoLists(Number(userId));

  const handleCreateTodoList = () => {
    navigate(`/user/${userId}/todo-lists/new`);
  };

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (isError) {
    return (
      <Container>
        <Text c="red">{t("errors.error_loading_lists")}</Text>
      </Container>
    );
  }

  return (
    <PageLayout>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={1} size="h2" mb="xs">
          {t("titles.my_todo_lists")}
        </Title>
        <Button
          disabled
          leftSection={<IoAdd size={20} />}
          onClick={handleCreateTodoList}
        >
          {t("actions.create_list")}
        </Button>
      </Flex>

      <Grid gutter="md">
        {todoLists?.map((todoList, index) => (
          <Grid.Col key={todoList.id} span={{ base: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <TodoListCard todoList={todoList} />
            </motion.div>
          </Grid.Col>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default TodoListsPage;
