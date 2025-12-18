import { AppShell, Box, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Suspense } from "react";
import { IoArrowForward } from "react-icons/io5";
import { Outlet } from "react-router";
import NavbarMenu from "~/components/menus/navbar.menu";
import CenteredLoader from "~/components/loaders/centered-loader";

export const MainLayout = () => {
  const [opened, { toggle, close }] = useDisclosure(true);

  return (
    <AppShell
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { desktop: !opened },
      }}
      padding="xs"
      layout="alt"
      withBorder={false}
    >
      {!opened && (
        <Box
          onClick={toggle}
          className="absolute z-2000 rounded-tr-full rounded-br-full p-2 cursor-pointer"
          bg="blue.6"
          style={{
            top: 20,
            left: 0,
            width: 35,
          }}
        >
          <IoArrowForward size={18} color="white" />
        </Box>
      )}

      <AppShell.Navbar className="transition-all duration-300 p-2.5 pr-0">
        <NavbarMenu closeNavbar={close} />
      </AppShell.Navbar>

      <AppShell.Main className="flex max-h-dvh relative">
        <Stack className="relative flex max-h-full flex-1 overflow-auto rounded-lg shadow-sm p-3 z-10">
          <Suspense fallback={<CenteredLoader />}>
            <Outlet />
          </Suspense>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};
