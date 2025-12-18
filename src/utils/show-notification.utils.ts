import { notifications } from "@mantine/notifications";
import i18next from "~/configs/i18n.config";

interface ShowNotificationProps {
  titleKey: string;
  messageKey: string;
  titleValues?: Record<string, string | number>;
  messageValues?: Record<string, string | number>;
  color?: "blue" | "red" | "green" | "yellow";
  autoClose?: number;
  withCloseButton?: boolean;
}

const showNotification = ({
  titleKey,
  messageKey,
  titleValues,
  messageValues,
  color = "blue",
  autoClose = 5000,
  withCloseButton = true,
}: ShowNotificationProps) => {
  notifications.show({
    title: i18next.t(titleKey, titleValues),
    message: i18next.t(messageKey, messageValues),
    color,
    autoClose,
    withCloseButton,
  });
};

export default showNotification;
