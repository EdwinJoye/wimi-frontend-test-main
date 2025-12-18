import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoGrid,
  IoList,
} from "react-icons/io5";
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Group,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccessibilityStore } from "~/stores/accessibility.store";
import { useUiStore } from "~/stores/ui.store";

const AppearanceTab = () => {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");
  const { screenReaderMode, setScreenReaderMode } = useAccessibilityStore();
  const { tasksViewMode, setTasksViewMode } = useUiStore();

  const handlecolorScheme = (scheme: "light" | "dark") => {
    document.documentElement.setAttribute("data-mantine-color-scheme", scheme);
    setColorScheme(scheme);
    setDarkMode(scheme === "dark");
  };

  return (
    <Tabs.Panel value="appearance">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="h4" mb="md">
            {t("settings.appearance.title")}
          </Title>
          <Stack gap="md">
            <Divider />
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.appearance.screen_reader")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.appearance.screen_reader_description")}
                </Text>
              </Box>
              <Group gap="xs">
                <ActionIcon
                  variant={!screenReaderMode ? "filled" : "light"}
                  color="blue"
                  onClick={() => setScreenReaderMode(false)}
                >
                  <IoEyeOffOutline width={20} />
                </ActionIcon>
                <ActionIcon
                  style={{
                    backgroundColor: "rgba(255, 215, 0, 1)",
                    color: "black",
                  }}
                  onClick={() => setScreenReaderMode(true)}
                >
                  <IoEyeOutline width={20} />
                </ActionIcon>
              </Group>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.appearance.dark_mode")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.appearance.dark_mode_description")}
                </Text>
              </Box>
              <Group gap="xs">
                <ActionIcon
                  variant={!darkMode ? "filled" : "light"}
                  onClick={() => handlecolorScheme("light")}
                >
                  <IoSunnyOutline width={20} />
                </ActionIcon>
                <ActionIcon
                  variant={darkMode ? "filled" : "light"}
                  color="blue"
                  onClick={() => handlecolorScheme("dark")}
                >
                  <IoMoonOutline width={20} />
                </ActionIcon>
              </Group>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.appearance.tasks_view")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.appearance.tasks_view_description")}
                </Text>
              </Box>
              <Group gap="xs">
                <ActionIcon
                  variant={tasksViewMode === "card" ? "filled" : "light"}
                  color="blue"
                  onClick={() => setTasksViewMode("card")}
                >
                  <IoGrid size={20} />
                </ActionIcon>
                <ActionIcon
                  variant={tasksViewMode === "table" ? "filled" : "light"}
                  color="blue"
                  onClick={() => setTasksViewMode("table")}
                >
                  <IoList size={20} />
                </ActionIcon>
              </Group>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.appearance.color_scheme")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.appearance.color_scheme_description")}
                </Text>
              </Box>
              <Select
                disabled
                value="blue"
                data={[
                  {
                    value: "blue",
                    label: t("settings.appearance.colors.blue"),
                  },
                  {
                    value: "green",
                    label: t("settings.appearance.colors.green"),
                  },
                  {
                    value: "purple",
                    label: t("settings.appearance.colors.purple"),
                  },
                  {
                    value: "orange",
                    label: t("settings.appearance.colors.orange"),
                  },
                ]}
                w={120}
              />
            </Group>
            <Divider />
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.appearance.font_size")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.appearance.font_size_description")}
                </Text>
              </Box>
              <Select
                disabled
                value="medium"
                data={[
                  {
                    value: "small",
                    label: t("settings.appearance.font_sizes.small"),
                  },
                  {
                    value: "medium",
                    label: t("settings.appearance.font_sizes.medium"),
                  },
                  {
                    value: "large",
                    label: t("settings.appearance.font_sizes.large"),
                  },
                ]}
                w={120}
              />
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Tabs.Panel>
  );
};

export default AppearanceTab;
