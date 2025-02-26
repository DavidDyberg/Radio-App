import { Pressable, Text } from "react-native";
import { Image } from "react-native";
import { cn } from "@/utils/classnames";
import { SizeOption, useSize } from "@/utils/SizeProvider";

type ButtonProps = {
  isPlaying?: boolean;
  onPress: () => void;
  className?: string;
  variant: "primary" | "playButton";
  label?: string;
  isActive?: boolean;
};

export const CustomButton: React.FC<ButtonProps> = ({
  isPlaying,
  onPress,
  className,
  variant,
  label,
  isActive,
}) => {
  if (variant === "playButton" && label) {
    throw new Error("PlayButton can't have a label");
  } else if (variant === "primary" && !label) {
    throw new Error("Primary button must have a label");
  } else if (variant === "playButton" && isActive) {
    throw new Error("PlayButton can't have an isActive state");
  }

  const { appSize } = useSize();

  const playButtonSize =
    appSize === SizeOption.Large
      ? "w-14 h-14"
      : appSize === SizeOption.ExtraLarge
      ? "w-16 h-16"
      : "w-12 h-12";

  const primaryButtonSize =
    appSize === SizeOption.Large
      ? "text-xl"
      : appSize === SizeOption.ExtraLarge
      ? "text-3xl"
      : "text-base";

  return (
    <>
      {variant === "playButton" ? (
        <Pressable onPress={onPress}>
          <Image
            className={cn(playButtonSize, className)}
            source={
              isPlaying
                ? require("../assets/images/stop-button.png")
                : require("../assets/images/play-button.png")
            }
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={onPress}
          className={cn(
            "p-3 rounded-md mb-2",
            isActive ? "bg-blue-400" : "bg-gray-400",
            primaryButtonSize,
            className
          )}
        >
          <Text className={`text-white text-center ${primaryButtonSize}`}>
            {label}
          </Text>
        </Pressable>
      )}
    </>
  );
};
