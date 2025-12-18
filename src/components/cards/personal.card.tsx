import { Avatar, Card, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const PersonalCard = () => {
  const { t } = useTranslation();

  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      className="w-full md:w-[70%]"
    >
      <Stack align="center" gap="xl">
        <Avatar src="/edwin-photo.png" size={150} radius="xl" />
        <Stack align="center" gap="md">
          <Title order={1} ta="center">
            {t("texts.hello")} !
          </Title>
          <Text size="lg" ta="center" maw={600}>
            {t("texts.welcome")} <strong>Wimi</strong>.
          </Text>
          <Text size="md" c="dimmed" ta="center" maw={600}>
            {t("texts.history")}
          </Text>
          <Text size="md" ta="center" fw={500}>
            {t("texts.hope")} ✨
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            {t("texts.enjoy_visit")},
            <br />
            <strong>Edwin Joye</strong>
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PersonalCard;
