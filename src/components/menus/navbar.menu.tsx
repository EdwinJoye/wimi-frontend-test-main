import { ActionIcon, Flex, Image, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getNavItems } from "~/configs/navbar.config";
import { useUserStore } from "~/features/user/user.store";
import NavbarButton from "../buttons/navbar.button";
import MeCard from "../cards/me.card";

type NavbarMenuProps = {
  closeNavbar: () => void;
};

const NavbarMenu = ({ closeNavbar }: NavbarMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.currentUser);
  const NAV_ITEMS = getNavItems(currentUser?.id || 0, t);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Stack
      className="h-full rounded-lg transition-all duration-300 flex justify-between! px-2.5 py-3 shadow-2xl"
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Stack>
        <Flex justify="end" align="center">
          <Image
            onClick={handleGoHome}
            src="/wimi-logo.png"
            alt="Wimi"
            h={30}
            fit="contain"
          />
          <ActionIcon
            m={4}
            className="border-0!"
            variant="outline"
            onClick={closeNavbar}
          >
            <IoClose size={20} />
          </ActionIcon>
        </Flex>
        <Stack gap="xs">
          {NAV_ITEMS.map((item) => (
            <NavbarButton closeNavbar={closeNavbar} {...item} />
          ))}
        </Stack>
      </Stack>
      <MeCard />
    </Stack>
  );
};

export default NavbarMenu;
