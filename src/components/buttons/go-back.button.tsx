import { GoArrowLeft } from "react-icons/go";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <ActionIcon
      mb={20}
      onClick={handleGoBack}
      className="cursor-pointer rounded-lg border-l-4 transition-all duration-200 hover:shadow-lg"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(10px)",
      }}
    >
      <GoArrowLeft
        style={{
          width: "70%",
          height: "70%",
          color: colorScheme === "dark" ? "white" : "black",
        }}
      />
    </ActionIcon>
  );
};

export default GoBackButton;
