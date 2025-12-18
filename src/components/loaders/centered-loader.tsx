import { Center, Loader } from "@mantine/core";

interface CenteredLoaderProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  minHeight?: number;
}

const CenteredLoader = ({
  size = "lg",
  minHeight = 400,
}: CenteredLoaderProps) => {
  return (
    <Center style={{ minHeight }}>
      <Loader size={size} />
    </Center>
  );
};

export default CenteredLoader;
