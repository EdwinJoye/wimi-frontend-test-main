import { vi } from "vitest";
import type { NavigateFunction } from "react-router-dom";

export const mockNavigate = vi.fn() as unknown as NavigateFunction;
export let mockIsActive = false;

export const setMockIsActive = (value: boolean) => {
  mockIsActive = value;
};

export const mockParams: Record<string, string> = {};

export const setMockParams = (params: Record<string, string>) => {
  Object.assign(mockParams, params);
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockParams,
    NavLink: ({
      children,
      onClick,
      className,
      to,
    }: {
      children:
        | React.ReactNode
        | ((props: {
            isActive: boolean;
            isPending: boolean;
          }) => React.ReactNode);
      onClick?: () => void;
      className?: string;
      to: string;
    }) => {
      const childrenResult =
        typeof children === "function"
          ? children({ isActive: mockIsActive, isPending: false })
          : children;
      return (
        <div
          data-testid="router-navlink"
          onClick={onClick}
          className={className}
          data-to={to}
        >
          {childrenResult}
        </div>
      );
    },
  };
});
