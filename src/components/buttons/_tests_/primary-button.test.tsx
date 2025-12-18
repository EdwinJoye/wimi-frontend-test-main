import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IoAdd, IoSave } from "react-icons/io5";
import PrimaryButton from "../primary.button";

describe("PrimaryButton", () => {
  it("renders the button with label", () => {
    render(<PrimaryButton label="actions.save" />);

    expect(screen.getByText("actions.save")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<PrimaryButton label="actions.save" onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with left icon", () => {
    render(<PrimaryButton label="actions.add" leftIcon={IoAdd} />);

    expect(screen.getByText("actions.add")).toBeInTheDocument();
  });

  it("renders with right icon", () => {
    render(<PrimaryButton label="actions.save" rightIcon={IoSave} />);

    expect(screen.getByText("actions.save")).toBeInTheDocument();
  });

  it("renders as submit type", () => {
    render(<PrimaryButton label="actions.submit" type="submit" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders disabled state", () => {
    render(<PrimaryButton label="actions.save" disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
