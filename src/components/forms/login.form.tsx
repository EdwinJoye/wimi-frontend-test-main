import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
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

  if (isPending) {
    return (
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <CenteredLoader minHeight={200} />
      </Paper>
    );
  }

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label={t("labels.email")}
          placeholder="votre@email.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          label={t("labels.password")}
          placeholder="Votre mot de passe"
          mt="md"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button fullWidth mt="xl" type="submit">
          {t("labels.login")}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
