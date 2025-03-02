import { Pressable, Text } from "react-native";
import { cn } from "@/utils/classnames";
import { SizeOption, useSize } from "@/utils/SizeProvider";
import * as Haptics from "expo-haptics";
import PlayIcon from "@/assets/images/play-icon.svg";
import PauseIcon from "@/assets/images/pause-icon.svg";

type ButtonProps = {
  onPress: () => void;
  variant: "primary" | "playButton";
  isPlaying?: boolean;
  isActive?: boolean;
  label?: string;
  className?: string;
};

export const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  isPlaying,
  isActive,
  className,
  variant,
  label,
}) => {
  if (variant === "playButton" && label) {
    throw new Error("PlayButton can't have a label");
  } else if (variant === "primary" && !label) {
    throw new Error("Primary button must have a label");
  } else if (variant === "playButton" && isActive) {
    throw new Error("PlayButton can't have an isActive prop");
  } else if (variant === "primary" && isPlaying) {
    throw new Error("Primary button can't have an isPlaying prop");
  }

  const { appSize } = useSize();

  const playButtonSize =
    appSize === SizeOption.Large
      ? 64
      : appSize === SizeOption.ExtraLarge
      ? 80
      : 48;

  const primaryButtonSize =
    appSize === SizeOption.Large
      ? "text-xl"
      : appSize === SizeOption.ExtraLarge
      ? "text-3xl"
      : "text-base";

  return (
    <>
      {variant === "playButton" ? (
        <Pressable
          onPress={() => {
            onPress();
            Haptics.selectionAsync();
          }}
          className={cn(className)}
        >
          {isPlaying ? (
            <PauseIcon width={playButtonSize} height={playButtonSize} />
          ) : (
            <PlayIcon width={playButtonSize} height={playButtonSize} />
          )}
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
