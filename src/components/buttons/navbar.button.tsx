import { NavLink as NavLinkMantine } from "@mantine/core";
import type { ElementType } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

type NavbarButtonProps = {
  closeNavbar: () => void;
  label: string;
  to: string;
  Icon: ElementType;
  activeDefault?: boolean;
  end?: boolean;
};

const NavbarButton = ({
  label,
  to,
  Icon,
  activeDefault = true,
  end,
}: NavbarButtonProps) => {
  const { t } = useTranslation();

  return (
    <NavLink end={end} to={to} className="group w-full">
      {({ isActive, isPending }) => (
        <NavLinkMantine
          component="div"
          label={t(label)}
          leftSection={<Icon className="w-6 h-6" />}
          variant={isActive ? "filled" : "subtle"}
          active={activeDefault}
          disabled={isPending}
          className="rounded-full transition-colors duration-200 ease-in-out"
        />
      )}
    </NavLink>
  );
};

export default NavbarButton;
