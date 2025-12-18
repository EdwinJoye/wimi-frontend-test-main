import { Container, Title, Image, Stack, Center } from "@mantine/core";
import { useTranslation } from "react-i18next";
import LoginForm from "~/components/forms/login.form";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Center style={{ minHeight: "100vh", paddingBottom: "10vh" }}>
      <Container size={420}>
        <Stack align="center" gap="md">
          <Image src="/wimi-logo.png" alt="Wimi" h={30} fit="contain" />
          <Title ta="center">{t("titles.welcome_to_wimi")}</Title>
          <LoginForm />
        </Stack>
      </Container>
    </Center>
  );
};

export default LoginPage;
