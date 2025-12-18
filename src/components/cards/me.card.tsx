import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Popover,
  Text,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoEllipsisVertical, IoLogOut, IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TextLoader from "~/components/loaders/text-loader";
import { useLogout } from "~/features/auth/auth.hooks";
import { useUserStore } from "~/features/user/user.store";

const MeCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();
  const [opened, setOpened] = useState(false);
  const currentUser = useUserStore((state) => state.currentUser);
  const ref = useClickOutside(() => setOpened(false));

  const handleLogout = () => {
    logout();
    setOpened(false);
  };

  const handleProfile = () => {
    navigate(`/user/${currentUser?.id}`);
    setOpened(false);
  };

  const getInitials = () => {
    if (currentUser?.firstName && currentUser?.lastName) {
      return `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase();
    }
    return "??";
  };

  if (!currentUser) {
    return (
      <Card
        shadow="sm"
        padding={8}
        radius="xl"
        className="rounded-lg border-l-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        <TextLoader minHeight={60} />
      </Card>
    );
  }

  return (
    <Card
      shadow="sm"
      padding={8}
      radius="xl"
      className="flex justify-center rounded-full! h-60px px-12px!"
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom-end"
        withArrow
        shadow="md"
        offset={15}
      >
        <Popover.Target>
          <Flex
            align="center"
            justify="space-between"
            className="cursor-pointer"
            onClick={() => setOpened((o) => !o)}
          >
            <Flex align="center" gap={10}>
              <Avatar src={currentUser.avatar} radius="xl" color="blue">
                {!currentUser.avatar && getInitials()}
              </Avatar>
              <Flex gap={5}>
                <Text size="sm">{currentUser.firstName}</Text>
                <Text size="sm">{currentUser.lastName}</Text>
              </Flex>
            </Flex>
            <ActionIcon variant="transparent">
              <IoEllipsisVertical size={20} />
            </ActionIcon>
          </Flex>
        </Popover.Target>

        <Popover.Dropdown ref={ref} p={5}>
          <Button
            justify="left"
            leftSection={<IoPerson size={20} />}
            variant="subtle"
            onClick={handleProfile}
            fullWidth
          >
            {t("labels.profile")}
          </Button>
          <Button
            justify="left"
            leftSection={<IoLogOut size={20} />}
            color="red"
            variant="subtle"
            onClick={handleLogout}
            fullWidth
          >
            {t("actions.logout")}
          </Button>
        </Popover.Dropdown>
      </Popover>
    </Card>
  );
};

export default MeCard;
