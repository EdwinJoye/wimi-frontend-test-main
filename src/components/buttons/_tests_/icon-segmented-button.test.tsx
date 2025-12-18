import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IoHome } from "react-icons/io5";
import IconSegmentedButton from "../icon-segmented.button";

describe("IconSegmentedButton", () => {
  it("renders the icon and label", () => {
    render(<IconSegmentedButton icon={IoHome} label="Home" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders with different props", () => {
    render(<IconSegmentedButton icon={IoHome} label="Dashboard" />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
