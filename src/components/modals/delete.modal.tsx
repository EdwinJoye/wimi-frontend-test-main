import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

interface DeleteModalProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  t: (key: string) => string;
}

const openDeleteModal = ({
  title,
  message,
  onConfirm,
  confirmLabel,
  cancelLabel,
  t,
}: DeleteModalProps) => {
  modals.openConfirmModal({
    title: title || t("titles.confirm_delete"),
    children: <Text>{message || t("messages.confirm_delete_item")}</Text>,
    labels: {
      confirm: confirmLabel || t("actions.delete"),
      cancel: cancelLabel || t("actions.cancel"),
    },
    confirmProps: { color: "red" },
    onConfirm: () => {
      onConfirm();
      modals.closeAll();
    },
  });
};

export default openDeleteModal;
