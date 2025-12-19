import { Container, type ContainerProps } from "@mantine/core";
import { useLocation } from "react-router-dom";
import GoBackButton from "~/components/buttons/go-back.button";

interface PageLayoutProps extends ContainerProps {
  children: React.ReactNode;
  hideGoBack?: boolean;
}

export default function PageLayout({ children, hideGoBack }: PageLayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const shouldHideGoBack = hideGoBack || isHomePage;

  return (
    <Container size="xl" py="sm" px={0} className="w-full h-full">
      {!shouldHideGoBack && <GoBackButton />}
      {children}
    </Container>
  );
}
