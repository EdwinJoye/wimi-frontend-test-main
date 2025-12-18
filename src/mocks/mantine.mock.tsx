import { vi } from "vitest";
import type { ReactNode } from "react";

interface BaseProps {
  children?: ReactNode;
  className?: string;
}

interface ActionIconProps extends BaseProps {
  onClick?: () => void;
  variant?: string;
  size?: string | number;
  radius?: string | number;
  disabled?: boolean;
  "aria-label"?: string;
  "data-testid"?: string;
  "data-loading"?: boolean;
}

interface ButtonProps extends BaseProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  mt?: string | number;
}

interface NavLinkProps {
  label?: string;
  leftSection?: ReactNode;
  variant?: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

interface GroupProps extends BaseProps {
  justify?: string;
  mt?: string | number;
}

interface TextProps extends BaseProps {
  size?: string;
  mt?: string | number;
  mb?: string | number;
}

vi.mock("@mantine/core", () => ({
  ActionIcon: ({
    children,
    onClick,
    variant,
    size,
    radius,
    className,
    disabled,
    "aria-label": ariaLabel,
    "data-testid": testId,
    "data-loading": loading,
  }: ActionIconProps) => (
    <button
      data-testid={testId || "action-icon"}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      data-radius={radius}
      data-loading={loading}
      className={className}
    >
      {children}
    </button>
  ),
  Button: ({
    children,
    onClick,
    disabled,
    loading,
    type,
    fullWidth,
    mt,
  }: ButtonProps) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-loading={loading}
      data-fullwidth={fullWidth}
      data-mt={mt}
      type={type}
    >
      {children}
    </button>
  ),
  NavLink: ({
    label,
    leftSection,
    variant,
    active,
    disabled,
    className,
  }: NavLinkProps) => (
    <div
      data-testid="mantine-navlink"
      data-label={label}
      data-variant={variant}
      data-active={active}
      data-disabled={disabled}
      className={className}
    >
      {leftSection}
      {label && <span>{label}</span>}
    </div>
  ),
  Group: ({ children, justify, mt, className }: GroupProps) => (
    <div className={className} data-justify={justify} data-mt={mt}>
      {children}
    </div>
  ),
  Text: ({ children, size, mt, mb }: TextProps) => (
    <div data-size={size} data-mt={mt} data-mb={mb}>
      {children}
    </div>
  ),
  useMantineColorScheme: () => ({
    colorScheme: "light",
    setColorScheme: vi.fn(),
    toggleColorScheme: vi.fn(),
    clearColorScheme: vi.fn(),
  }),
}));

vi.mock("@mantine/hooks", () => ({
  useMediaQuery: vi.fn(),
}));
