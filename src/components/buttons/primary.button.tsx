import { Button } from "@mantine/core";
import type { ElementType } from "react";
import { useTranslation } from "react-i18next";

interface PrimaryButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: string;
  color?: string;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  width?: string;
  className?: string;
}

const PrimaryButton = ({
  label,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  variant = "",
  color,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  width,
  className,
}: PrimaryButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      px={30}
      radius={100}
      variant={variant}
      color={color}
      type={type}
      w={width}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      leftSection={LeftIcon && <LeftIcon size={18} />}
      rightSection={RightIcon && <RightIcon size={18} />}
      className={`transition-all duration-200 ${className || ""}`}
    >
      {t(label)}
    </Button>
  );
};

export default PrimaryButton;
