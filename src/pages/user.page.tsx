import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Card,
  Group,
  Menu,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoBriefcase,
  IoEllipsisVertical,
  IoMail,
  IoPencil,
  IoSettings,
  IoShield,
  IoTrash,
} from "react-icons/io5";
import { LuListPlus } from "react-icons/lu";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import TodoListAccordionCard from "~/components/cards/todoList-accordion.card";
import CenteredLoader from "~/components/loaders/centered-loader";
import { useTodoLists } from "~/features/todoList/todoList.hooks";
import { useUserStore } from "~/features/user/user.store";
import PageLayout from "~/layouts/page.layout";

const UserPage = () => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useUserStore((state) => state.currentUser);
  const { data: todoLists } = useTodoLists(currentUser?.id || 0);
  const [openedAccordion, setOpenedAccordion] = useState<number | null>(null);

  const isOnUserPage = location.pathname === `/user/${userId}`;

  const handleNavigate = () => {
    navigate(`/user/${userId}/settings?tab=account`);
  };

  return (
    <PageLayout>
      {!currentUser ? (
        <CenteredLoader />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ height: "calc(100vh - 105px)" }}
        >
          <Group align="flex-start" gap="md" style={{ height: "100%" }}>
            <Stack
              gap="md"
              style={{ width: "300px", flexShrink: 0, height: "100%" }}
            >
              <Card shadow="sm" padding="md" radius="md" withBorder>
                <Group justify="flex-end" mb="xs">
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <IoEllipsisVertical size={20} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item disabled leftSection={<IoPencil size={16} />}>
                        {t("actions.edit_profile")}
                      </Menu.Item>
                      <Menu.Item
                        onClick={handleNavigate}
                        leftSection={<IoSettings size={16} />}
                      >
                        {t("labels.settings")}
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        disabled
                        color="red"
                        leftSection={<IoTrash size={16} />}
                      >
                        {t("settings.account.delete_account")}
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
                <Stack align="center" gap="sm">
                  <Avatar
                    src={currentUser.avatar}
                    size={100}
                    className="rounded-full"
                  />
                  <Stack gap="xs" align="center" w="100%">
                    <Title order={3} size="h4">
                      {currentUser.firstName} {currentUser.lastName}
                    </Title>
                    <Badge size="md" variant="light" color="blue">
                      {currentUser.role}
                    </Badge>
                    <Text size="xs" c="dimmed" ta="center" lineClamp={2}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </Stack>
                </Stack>
              </Card>

              <Card
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
                style={{ flex: 1 }}
              >
                <Title order={5} mb="sm">
                  {t("titles.informations")}
                </Title>
                <Stack gap="sm">
                  <Group gap="xs">
                    <IoMail size={16} />
                    <Box>
                      <Text size="xs" c="dimmed">
                        {t("labels.email")}
                      </Text>
                      <Text size="sm" fw={500}>
                        {currentUser.email}
                      </Text>
                    </Box>
                  </Group>
                  <Group gap="xs">
                    <IoBriefcase size={16} />
                    <Box>
                      <Text size="xs" c="dimmed">
                        {t("labels.role")}
                      </Text>
                      <Text size="sm" fw={500}>
                        {currentUser.role}
                      </Text>
                    </Box>
                  </Group>
                  <Group gap="xs">
                    <IoShield size={16} />
                    <Box>
                      <Text size="xs" c="dimmed">
                        {t("labels.id")}
                      </Text>
                      <Text size="sm" fw={500}>
                        #{currentUser.id}
                      </Text>
                    </Box>
                  </Group>
                </Stack>
              </Card>
            </Stack>

            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ flex: 1, height: "100%", overflow: "auto" }}
            >
              <Group justify="space-between" align="top">
                <Title order={3} mb="md">
                  {t("titles.activity")}
                </Title>
                <Tooltip withArrow label={t("actions.add_new_list")}>
                  <ActionIcon
                    disabled
                    variant="light"
                    color="blue"
                    aria-label="Voir"
                  >
                    <LuListPlus size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>

              {isOnUserPage ? (
                <Stack gap="sm">
                  {todoLists?.map((todoList, index) => (
                    <motion.div
                      key={todoList.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TodoListAccordionCard
                        todoList={todoList}
                        userId={currentUser.id}
                        opened={openedAccordion === todoList.id}
                        onToggle={() =>
                          setOpenedAccordion(
                            openedAccordion === todoList.id ? null : todoList.id
                          )
                        }
                      />
                    </motion.div>
                  ))}
                </Stack>
              ) : (
                <Outlet />
              )}
            </Card>
          </Group>
        </motion.div>
      )}
    </PageLayout>
  );
};

export default UserPage;
