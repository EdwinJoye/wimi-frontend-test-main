import { Group, Text } from "@mantine/core";
import type { ElementType } from "react";

interface IconSegmentedButtonProps {
  icon: ElementType;
  label: string;
}

const IconSegmentedButton = ({
  icon: Icon,
  label,
}: IconSegmentedButtonProps) => {
  return (
    <Group justify="center" gap="xs">
      <Icon size={20} />
      <Text>{label}</Text>
    </Group>
  );
};

export default IconSegmentedButton;
