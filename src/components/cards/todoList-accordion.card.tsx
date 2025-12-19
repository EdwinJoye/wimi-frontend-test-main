import {
  Badge,
  Box,
  Card,
  Collapse,
  Group,
  Paper,
  Progress,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IoCheckmarkCircle,
  IoChevronDown,
  IoTimeOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTodosByListId } from "~/features/todo/todo.hooks";
import type { TodoList } from "~/features/todoList/todoList.types";
import PrimaryButton from "../buttons/primary.button";

interface TodoListAccordionCardProps {
  todoList: TodoList;
  userId: number;
  opened: boolean;
  onToggle: () => void;
}

const TodoListAccordionCard = ({
  todoList,
  userId,
  opened,
  onToggle,
}: TodoListAccordionCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: todos = [] } = useTodosByListId(todoList.id);

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;
  const completionRate =
    todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  const handleNavigate = () => {
    navigate(`/user/${userId}/todo-lists/${todoList.id}/todos`);
  };

  return (
    <Paper
      shadow="sm"
      p="sm"
      radius="lg"
      withBorder
      className="transition-all duration-300 hover:shadow-xl hover:bg-gray-50"
      style={{
        background: opened
          ? "linear-gradient(135deg, rgba(66, 153, 225, 0.05) 0%, rgba(66, 153, 225, 0.02) 100%)"
          : undefined,
      }}
    >
      <UnstyledButton onClick={onToggle} w="100%">
        <Group justify="space-between" align="center">
          <Group gap="md">
            <motion.div
              animate={{ rotate: opened ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: opened ? "#4299E1" : "#E2E8F0",
                  transition: "all 0.3s",
                }}
              >
                <IoChevronDown
                  size={18}
                  color={opened ? "#eaeaea" : "#4A5568"}
                />
              </Box>
            </motion.div>
            <Box>
              <Group>
                <Box
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: todoList.color,
                  }}
                />
                <Text fw={600} size="lg" mb={4}>
                  {todoList.title}
                </Text>
              </Group>

              <Group gap="xs">
                <Badge size="sm" variant="light" color="blue">
                  {todos.length} {todos.length === 1 ? "tâche" : "tâches"}
                </Badge>
                <Badge
                  size="sm"
                  variant="light"
                  color={completionRate === 100 ? "green" : "gray"}
                >
                  {Math.round(completionRate)}% complété
                </Badge>
              </Group>
            </Box>
          </Group>
          <Progress
            value={completionRate}
            size="xs"
            radius="xl"
            color={todoList.color}
            w={120}
          />
        </Group>
      </UnstyledButton>

      <Collapse in={opened}>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                mt="lg"
                pt="lg"
                style={{
                  borderTop: "2px solid #E2E8F0",
                }}
              >
                <Group grow mb="md">
                  <Card p="md" radius="md" withBorder>
                    <Group gap="xs" mb="xs">
                      <IoCheckmarkCircle size={20} color="#38A169" />
                      <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                        {t("labels.completed")}
                      </Text>
                    </Group>
                    <Text size="xl" fw={700} c="green.7">
                      {completedCount}
                    </Text>
                  </Card>
                  <Card p="md" radius="md" withBorder>
                    <Group gap="xs" mb="xs">
                      <IoTimeOutline size={20} color="#DD6B20" />
                      <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                        {t("labels.pending")}
                      </Text>
                    </Group>
                    <Text size="xl" fw={700} c="orange.7">
                      {pendingCount}
                    </Text>
                  </Card>
                </Group>

                <PrimaryButton
                  onClick={handleNavigate}
                  label="actions.see_all_todos"
                  width="100%"
                  className="p-20px!"
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapse>
    </Paper>
  );
};

export default TodoListAccordionCard;
