import { Avatar, Card, Container, Stack, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageLayout from "~/layouts/page.layout";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container size="md" py="xl">
          <Card shadow="lg" padding="xl" radius="lg" withBorder>
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
        </Container>
      </motion.div>
    </PageLayout>
  );
};

export default HomePage;
