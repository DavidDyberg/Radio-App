import { View, Text } from "react-native";
import { useSize, SizeOption } from "@/utils/SizeProvider";
import { CustomButton } from "@/components/button";
import { cn } from "@/utils/classnames";

export default function Settings() {
  const { appSize, selectSize } = useSize();

  return (
    <View className="p-4">
      <Text
        className={cn(
          appSize === SizeOption.Large
            ? "text-2xl"
            : appSize === SizeOption.ExtraLarge
            ? "text-3xl"
            : "text-lg",
          "font-bold mb-4"
        )}
      >
        Appstorlek
      </Text>

      <CustomButton
        variant="primary"
        onPress={() => selectSize(SizeOption.Default)}
        label="Standard"
        isActive={appSize === SizeOption.Default}
      />

      <CustomButton
        variant="primary"
        onPress={() => selectSize(SizeOption.Large)}
        label="Stor"
        isActive={appSize === SizeOption.Large}
      />

      <CustomButton
        variant="primary"
        onPress={() => selectSize(SizeOption.ExtraLarge)}
        label="Extra stor"
        isActive={appSize === SizeOption.ExtraLarge}
      />
    </View>
  );
}
