import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Card,
  Grid,
  Group,
  Menu,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
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
import { Outlet } from "react-router-dom";
import CenteredLoader from "~/components/loaders/centered-loader";
import { useUserStore } from "~/features/user/user.store";
import PageLayout from "~/layouts/page.layout";

const UserPage = () => {
  const { t } = useTranslation();
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <PageLayout>
      {!currentUser ? (
        <CenteredLoader />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Grid gutter="md" mb="xl">
              <Grid.Col span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="flex-end" mb="md">
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <IoEllipsisVertical size={20} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          disabled
                          leftSection={<IoPencil size={16} />}
                        >
                          {t("actions.edit_profile")}
                        </Menu.Item>
                        <Menu.Item
                          disabled
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

                  <Stack align="center" gap="md">
                    <Avatar
                      src={currentUser.avatar}
                      size={150}
                      className="rounded-full"
                    />
                    <Stack gap="xs" align="center" w="100%">
                      <Title order={2} size="h3">
                        {currentUser.firstName} {currentUser.lastName}
                      </Title>
                      <Badge size="lg" variant="light" color="blue">
                        {currentUser.role}
                      </Badge>
                      <Text size="sm" c="dimmed" ta="center" mt="sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore.
                      </Text>
                    </Stack>
                  </Stack>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                  <Title order={4} mb="md">
                    Informations
                  </Title>
                  <Stack gap="md">
                    <Group gap="xs">
                      <IoMail size={18} />
                      <Box>
                        <Text size="xs" c="dimmed">
                          Email
                        </Text>
                        <Text size="sm" fw={500}>
                          {currentUser.email}
                        </Text>
                      </Box>
                    </Group>

                    <Group gap="xs">
                      <IoBriefcase size={18} />
                      <Box>
                        <Text size="xs" c="dimmed">
                          Rôle
                        </Text>
                        <Text size="sm" fw={500}>
                          {currentUser.role}
                        </Text>
                      </Box>
                    </Group>

                    <Group gap="xs">
                      <IoShield size={18} />
                      <Box>
                        <Text size="xs" c="dimmed">
                          ID
                        </Text>
                        <Text size="sm" fw={500}>
                          #{currentUser.id}
                        </Text>
                      </Box>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={8}>
                <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                  <Title order={3} mb="md">
                    Activité
                  </Title>
                  <Outlet />
                </Card>
              </Grid.Col>
            </Grid>
          </motion.div>
        </>
      )}
    </PageLayout>
  );
};
export default UserPage;
