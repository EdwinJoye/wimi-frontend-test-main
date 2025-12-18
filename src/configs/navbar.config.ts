import {
  IoHomeOutline,
  IoPersonOutline,
  IoList,
  IoSettingsOutline,
} from "react-icons/io5";

export const getNavItems = (userId: number, t: (key: string) => string) => [
  { label: t("labels.home"), to: "/", Icon: IoHomeOutline, end: true },
  {
    label: t("labels.profile"),
    to: `/user/${userId}`,
    Icon: IoPersonOutline,
    end: true,
  },
  {
    label: t("labels.todo_lists"),
    to: `/user/${userId}/todo-lists`,
    Icon: IoList,
    end: false,
  },
  {
    label: t("labels.settings"),
    to: `/user/${userId}/settings`,
    Icon: IoSettingsOutline,
    end: true,
  },
];
