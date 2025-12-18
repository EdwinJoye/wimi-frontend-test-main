import {
  Box,
  Card,
  Divider,
  Group,
  Stack,
  Switch,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";

const GeneralTab = () => {
  const { t } = useTranslation();

  return (
    <Tabs.Panel value="general">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="h4" mb="md">
            {t("settings.general.title")}
          </Title>

          <Stack gap="md">
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.general.reduce_motion")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.general.reduce_motion_description")}
                </Text>
              </Box>
              <Switch disabled />
            </Group>

            <Divider />

            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.general.full_names")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.general.full_names_description")}
                </Text>
              </Box>
              <Switch disabled />
            </Group>

            <Divider />

            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.general.auto_start")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.general.auto_start_description")}
                </Text>
              </Box>
              <Switch disabled />
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Tabs.Panel>
  );
};

export default GeneralTab;
