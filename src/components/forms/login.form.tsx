import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useLogin } from "~/features/auth/auth.hooks";
import CenteredLoader from "../loaders/centered-loader";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { t } = useTranslation();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Paper
      miw="300px"
      mih="300px"
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
    >
      {isPending ? (
        <CenteredLoader minHeight={200} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={3} ta="center" pb={20}>
            {t("titles.log_in")}
          </Title>
          <TextInput
            label={t("labels.email")}
            placeholder={t("labels.your_email")}
            {...register("email")}
            error={errors.email?.message}
          />
          <PasswordInput
            label={t("labels.password")}
            placeholder={t("labels.your_password")}
            mt="md"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button fullWidth mt="xl" type="submit">
            {t("labels.login")}
          </Button>
        </form>
      )}
    </Paper>
  );
};

export default LoginForm;
