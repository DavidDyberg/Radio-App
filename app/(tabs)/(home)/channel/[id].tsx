import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Channel() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Channel ID: {id}</Text>
    </View>
  );
}
