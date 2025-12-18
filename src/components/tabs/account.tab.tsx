import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useUserStore } from "~/features/user/user.store";

const AccountTab = () => {
  const { t } = useTranslation();
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <Tabs.Panel value="account">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="h4" mb="md">
            {t("settings.account.title")}
          </Title>
          <Stack gap="md">
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.account.email")}</Text>
                <Text size="sm" c="dimmed">
                  {currentUser?.email}
                </Text>
              </Box>
              <Button disabled variant="light" size="xs">
                {t("actions.edit")}
              </Button>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.account.password")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.account.password_modified")}
                </Text>
              </Box>
              <Button disabled variant="light" size="xs">
                {t("actions.change")}
              </Button>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.account.active_sessions")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.account.active_sessions_description")}
                </Text>
              </Box>
              <Button disabled variant="light" size="xs">
                {t("actions.view_all")}
              </Button>
            </Group>
          </Stack>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="h4" mb="md" c="red">
            {t("settings.account.danger_zone")}
          </Title>
          <Stack gap="md">
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.account.delete_account")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.account.delete_account_description")}
                </Text>
              </Box>
              <Button disabled variant="light" color="red" size="xs">
                {t("actions.delete")}
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Tabs.Panel>
  );
};

export default AccountTab;
