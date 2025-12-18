import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { mantineCssResolver } from "~/configs/theme.config";
import { useEffect } from "react";
import { useAccessibilityStore } from "~/stores/accessibility.store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 500 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export function App() {
  const screenReaderMode = useAccessibilityStore(
    (state) => state.screenReaderMode
  );

  useEffect(() => {
    if (screenReaderMode) {
      document.documentElement.classList.add("screen-reader-mode");
    } else {
      document.documentElement.classList.remove("screen-reader-mode");
    }
  }, [screenReaderMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider cssVariablesResolver={mantineCssResolver}>
        <Notifications />
        <ModalsProvider>
          <AppRouter />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
