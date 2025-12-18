import { Center, Text } from "@mantine/core";

interface TextLoaderProps {
  minHeight?: number;
  message?: string;
  centered?: boolean;
  font_size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const TextLoader = ({
  minHeight = 400,
  message = "Chargement...",
  centered = true,
  font_size = "sm",
}: TextLoaderProps) => {
  const content = <Text size={font_size}>{message}</Text>;

  return centered ? <Center style={{ minHeight }}>{content}</Center> : content;
};

export default TextLoader;
