import { notifications } from "@mantine/notifications";

interface showNotificationProps {
  title: string;
  message: string;
  color?: "blue" | "red" | "green" | "yellow";
  autoClose?: number;
  withCloseButton?: boolean;
}

const showNotification = ({
  title,
  message,
  color = "blue",
  autoClose = 5000,
  withCloseButton = true,
}: showNotificationProps) => {
  notifications.show({
    title,
    message,
    color,
    autoClose,
    withCloseButton,
  });
};

export default showNotification;
