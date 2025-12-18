import { createTheme, type CSSVariablesResolver } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
});

export const mantineCssResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--tooltip-bg": theme.colors.blue[4],
  },
  light: {},
  dark: {},
});
