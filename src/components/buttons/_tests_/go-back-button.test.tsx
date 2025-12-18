import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockNavigate } from "~/mocks/navigate.mock";
import GoBackButton from "../go-back.button";

describe("GoBackButton", () => {
  it("renders the button", () => {
    render(<GoBackButton />);

    const button = screen.getByTestId("action-icon");
    expect(button).toBeInTheDocument();
  });

  it("calls navigate(-1) when clicked", () => {
    render(<GoBackButton />);

    const button = screen.getByTestId("action-icon");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
