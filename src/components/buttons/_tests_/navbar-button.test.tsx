import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IoHome } from "react-icons/io5";
import { setMockIsActive } from "~/mocks/navigate.mock";
import NavbarButton from "../navbar.button";

describe("NavbarButton", () => {
  it("renders the button with label and icon", () => {
    render(
      <NavbarButton
        label="labels.home"
        to="/"
        Icon={IoHome}
        closeNavbar={() => {}}
      />
    );

    expect(screen.getByTestId("router-navlink")).toBeInTheDocument();
    expect(screen.getByTestId("mantine-navlink")).toBeInTheDocument();
    expect(screen.getByText("labels.home")).toBeInTheDocument();
  });

  it("renders with active state", () => {
    setMockIsActive(true);

    render(
      <NavbarButton
        label="labels.home"
        to="/"
        Icon={IoHome}
        closeNavbar={() => {}}
      />
    );

    const navlink = screen.getByTestId("mantine-navlink");
    expect(navlink).toHaveAttribute("data-variant", "filled");
  });

  it("renders with inactive state", () => {
    setMockIsActive(false);

    render(
      <NavbarButton
        label="labels.home"
        to="/"
        Icon={IoHome}
        closeNavbar={() => {}}
      />
    );

    const navlink = screen.getByTestId("mantine-navlink");
    expect(navlink).toHaveAttribute("data-variant", "subtle");
  });
});
