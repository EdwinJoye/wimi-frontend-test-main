import { Container, type ContainerProps } from "@mantine/core";
import GoBackButton from "~/components/buttons/go-back.button";

interface PageLayoutProps extends ContainerProps {
  children: React.ReactNode;
}

export default function PageLayout({ children, ...props }: PageLayoutProps) {
  return (
    <Container size="xl" py="sm" {...props} className="w-full">
      <GoBackButton />
      {children}
    </Container>
  );
}
