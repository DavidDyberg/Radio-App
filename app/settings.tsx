import { View, Text } from "react-native";
import { useSize, SizeOption } from "@/utils/SizeProvider";
import { CustomButton } from "@/components/button";

export default function Settings() {
  const { appSize, selectSize } = useSize(); // Get current size and function to update it

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-4">Textstorlek</Text>

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
