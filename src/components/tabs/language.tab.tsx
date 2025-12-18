import {
  Box,
  Card,
  Divider,
  Group,
  Select,
  Stack,
  Switch,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useLocaleSettingsStore,
  type DateFormat,
} from "~/stores/locale-settings.store";

interface LanguageOption {
  value: string;
  label: string;
}

interface TimezoneOption {
  value: string;
  label: string;
}

const LanguageTab = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const {
    dateFormat,
    timezone,
    setDateFormat,
    setTimezone,
    showClock,
    setShowClock,
  } = useLocaleSettingsStore();

  const handleLanguageChange = (value: string | null) => {
    if (value) {
      setLanguage(value);
      i18n.changeLanguage(value);
    }
  };

  const languageOptions: LanguageOption[] = [
    { value: "fr", label: "🇫🇷 Français" },
    { value: "en", label: "🇬🇧 English" },
    { value: "ja", label: "🇯🇵 日本語" },
  ];

  const dateFormatOptions: { value: DateFormat; label: string }[] = [
    {
      value: "dd/mm/yyyy",
      label: t("settings.language.date_formats.ddmmyyyy"),
    },
    {
      value: "mm/dd/yyyy",
      label: t("settings.language.date_formats.mmddyyyy"),
    },
    {
      value: "yyyy-mm-dd",
      label: t("settings.language.date_formats.yyyymmdd"),
    },
  ];

  const timezoneOptions: TimezoneOption[] = [
    { value: "europe/paris", label: "Europe/Paris (GMT+1)" },
    { value: "america/new_york", label: "America/New_York (GMT-5)" },
    { value: "asia/tokyo", label: "Asia/Tokyo (GMT+9)" },
    { value: "europe/london", label: "Europe/London (GMT+0)" },
    { value: "america/los_angeles", label: "America/Los_Angeles (GMT-8)" },
    { value: "europe/berlin", label: "Europe/Berlin (GMT+1)" },
    { value: "asia/shanghai", label: "Asia/Shanghai (GMT+8)" },
  ];

  return (
    <Tabs.Panel value="language">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="h4" mb="md">
            {t("settings.language.title")}
          </Title>

          <Stack gap="md">
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.language.interface")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.language.interface_description")}
                </Text>
              </Box>
              <Select
                value={language}
                onChange={handleLanguageChange}
                data={languageOptions}
                w={200}
                placeholder={t("settings.language.select_language")}
                searchable
                renderOption={({ option }) => (
                  <Group>
                    <Text size="lg">{option.label.split(" ")[0]}</Text>
                    <Text>{option.label.split(" ").slice(1).join(" ")}</Text>
                  </Group>
                )}
              />
            </Group>

            <Divider />

            <Group justify="space-between" align="center">
              <Box>
                <Text fw={500}>{t("settings.language.show_clock")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.language.show_clock_description")}
                </Text>
              </Box>
              <Switch
                defaultChecked={showClock}
                onChange={(event) => setShowClock(event.currentTarget.checked)}
              />
            </Group>

            <Divider />

            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.language.dateFormat")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.language.date_format_description")}
                </Text>
              </Box>
              <Select
                disabled
                value={dateFormat}
                onChange={(value) => {
                  if (
                    value === "dd/mm/yyyy" ||
                    value === "mm/dd/yyyy" ||
                    value === "yyyy-mm-dd"
                  ) {
                    setDateFormat(value);
                  }
                }}
                data={dateFormatOptions}
                w={140}
                placeholder={t("settings.language.select_format")}
              />
            </Group>

            <Divider />

            <Group justify="space-between">
              <Box>
                <Text fw={500}>{t("settings.language.timezone")}</Text>
                <Text size="sm" c="dimmed">
                  {t("settings.language.timezone_description")}
                </Text>
              </Box>
              <Select
                disabled
                value={timezone}
                onChange={(value) => {
                  if (value) setTimezone(value);
                }}
                data={timezoneOptions}
                w={200}
                placeholder={t("settings.language.select_timezone")}
                searchable
              />
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="h4" mb="md">
            {t("settings.language.preview")}
          </Title>

          <Stack gap="sm">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {t("settings.language.current_language")}:
              </Text>
              <Text size="sm" fw={500}>
                {languageOptions.find((opt) => opt.value === language)?.label}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {t("settings.language.date_example")}:
              </Text>
              <Text size="sm" fw={500}>
                {formatdate_example(dateFormat)}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {t("settings.language.time_example")}:
              </Text>
              <Text size="sm" fw={500}>
                {new Date().toLocaleTimeString(language, {
                  timeZone: timezone.replace("_", "/"),
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Tabs.Panel>
  );
};

const formatdate_example = (format: DateFormat): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  switch (format) {
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`;
    case "mm/dd/yyyy":
      return `${month}/${day}/${year}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

export default LanguageTab;
