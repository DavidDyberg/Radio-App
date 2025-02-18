import { Pressable } from "react-native";
import { Image } from "react-native";
import { cn } from "@/utils/classnames";

type ButtonProps = {
  isPlaying: boolean;
  onPress: () => void;
  size?: "md" | "lg";
  className?: string;
};

export const PlayButton: React.FC<ButtonProps> = ({
  isPlaying,
  onPress,
  size = "md",
  className,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        className={cn(size === "md" ? "w-10 h-10" : "w-12 h-12", className)}
        source={
          isPlaying
            ? require("../assets/images/stop-button.png")
            : require("../assets/images/play-button.png")
        }
      />
    </Pressable>
  );
};
